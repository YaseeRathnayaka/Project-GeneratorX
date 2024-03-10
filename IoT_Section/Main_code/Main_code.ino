#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <Ultrasonic.h>

#define WIFI_SSID "SLT-Fiber-4G"
#define WIFI_PASSWORD "LandCruiserV8"
#define API_KEY "AIzaSyAWfhB2BnxeTKNjOBnXxQ6KupNcWvq5wUE"
#define USER_EMAIL "yasiiirathnayaka@gmail.com"
#define USER_PASSWORD "123456"
#define DATABASE_URL "https://genx-119ab-default-rtdb.asia-southeast1.firebasedatabase.app/"

WiFiClientSecure client;
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

String uid;
String databasePath;
String tempPath = "/temperature";
String humPath = "/humidity";
String currentPath = "/current";
String distancePath = "/distance";
String timePath = "/timestamp";
String parentPath;

int timestamp;
FirebaseJson json;

const char *ntpServer = "pool.ntp.org";

#define DHT_PIN 2
DHT dht(DHT_PIN, DHT22);

#define ACS712_PIN 5

float readACS712() {
  int sensorValue = analogRead(ACS712_PIN);
  float voltage = sensorValue * (5.0 / 1023.0);
  float current = (voltage - 2.5) / 0.066;
  return current;
}

void initSensor() {
  dht.begin();
}

void initWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  Serial.println();
}

unsigned long getTime() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    return 0;
  }
  time(&now);
  return now;
}

void setup() {
  Serial.begin(115200);
  initSensor();
  initWiFi();
  configTime(0, 0, ntpServer);
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(4096);
  config.max_token_generation_retry = 5;
  Firebase.begin(&config, &auth);
  Serial.println("Getting User UID");
  while (auth.token.uid == "") {
    Serial.print('.');
    delay(1000);
  }
  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.println(uid);
  databasePath = "/UsersData/" + uid + "/readings";
}

unsigned long sendDataPrevMillis = 0;
unsigned long timerDelay = 300000; // 5 minutes delay

#define TRIGGER_PIN 3
#define ECHO_PIN 4
Ultrasonic ultrasonic(TRIGGER_PIN, ECHO_PIN);

void loop() {
  if (Firebase.ready()) {
    timestamp = getTime();
    parentPath = databasePath + "/" + String(timestamp);

    // Read DHT22 sensor data
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    // Read Ultrasonic sensor data
    float distance = ultrasonic.read();

    // Calculate fuel level based on distance
    int fuelLevel = 0;
    if (distance >= 10.0) {
      fuelLevel = 100; // Full
    } else if (distance >= 7.5) {
      fuelLevel = 75; // 75%
    } else if (distance >= 5.0) {
      fuelLevel = 50; // 50%
    } else if (distance >= 2.5) {
      fuelLevel = 25; // 25%
    } else {
      fuelLevel = 0; // Empty
    }

    // Check if the readings are valid
    if (!isnan(temperature) && !isnan(humidity)) {
      float currentReading = readACS712();

      Serial.println("Sensor Readings:");
      Serial.print("Temperature: ");
      Serial.print(temperature);
      Serial.println(" °C");
      Serial.print("Humidity: ");
      Serial.print(humidity);
      Serial.println(" %");
      Serial.print("Current: ");
      Serial.print(currentReading);
      Serial.println(" A");
      Serial.print("Distance: ");
      Serial.print(distance);
      Serial.println(" cm");
      Serial.print("Fuel Level: ");
      Serial.print(fuelLevel);
      Serial.println("%");
      Serial.print("Timestamp: ");
      Serial.println(timestamp);

      json.set(tempPath.c_str(), String(temperature));
      json.set(humPath.c_str(), String(humidity));
      json.set(currentPath.c_str(), String(currentReading));
      json.set(distancePath.c_str(), String(distance));
      json.set("fuelLevel", String(fuelLevel)); // Add fuel level to JSON
      json.set(timePath.c_str(), String(timestamp));

      Serial.printf("Set JSON... %s\n", Firebase.RTDB.setJSON(&fbdo, parentPath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());
    } else {
      // Failed to read from the DHT22 sensor
      Serial.println("Failed to read from DHT22 sensor");
    }

    delay(1000); // Delay for 1 second before sending the next set of data
  }
}