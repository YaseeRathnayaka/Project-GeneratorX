#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>

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
String voltagePath = "/voltage";
String timePath = "/timestamp";
String parentPath;

int timestamp;
FirebaseJson json;

const char *ntpServer = "pool.ntp.org";

#define DHT_PIN 2
DHT dht(DHT_PIN, DHT22);

#define ACS712_PIN 34
#define ACS712_ZERO_CURRENT_READING 512 // Adjust this based on your module
#define ACS712_SENSITIVITY 1            // Adjust this based on your module

#define VOLTAGE_SENSOR_PIN 32

#define TRIGGER_PIN 3
#define ECHO_PIN 4

float readACS712() {
  int sensorValue = analogRead(ACS712_PIN);
  float current = sensorValue;
  return current;
}

void initSensor() {
  dht.begin();
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
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

void loop() {
  if (Firebase.ready()) {
    timestamp = getTime();
    parentPath = databasePath + "/" + String(timestamp);

    // Read DHT22 sensor data
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    // Read Ultrasonic sensor data
    digitalWrite(TRIGGER_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIGGER_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIGGER_PIN, LOW);
    unsigned long duration = pulseIn(ECHO_PIN, HIGH);
    unsigned int distance = duration * 0.034 / 2;

    // Generate dummy fuel level data
    int fuelLevel = random(80, 100);

    // Read ACS712 sensor data
    float currentReading = readACS712();

    // Read voltage sensor data
    int voltageSensorValue = analogRead(VOLTAGE_SENSOR_PIN);
    float voltage = (voltageSensorValue)*3.3 / 4095; // Assuming the voltage sensor module outputs 0-25V

    // Check if the readings are valid
    if (!isnan(temperature) && !isnan(humidity) && !isnan(currentReading)) {
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
      Serial.print("Voltage: ");
      Serial.print(voltage);
      Serial.println(" V");
      Serial.print("Timestamp: ");
      Serial.println(timestamp);

      json.set(tempPath.c_str(), String(temperature, 2)); // Assuming 2 decimal places for temperature
      json.set(humPath.c_str(), String(humidity, 2));    // Assuming 2 decimal places for humidity
      json.set(currentPath.c_str(), String(currentReading, 4)); // Assuming 4 decimal places for current
      json.set(distancePath.c_str(), String(distance, 2)); // Assuming 2 decimal places for distance
      json.set("fuelLevel", String(fuelLevel));
      json.set(voltagePath.c_str(), String(voltage, 2)); // Assuming 2 decimal places for voltage
      json.set(timePath.c_str(), String(timestamp));

      Serial.printf("Set JSON... %s\n", Firebase.RTDB.setJSON(&fbdo, parentPath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());
    } else {
      // Failed to read from the sensors
      Serial.println("Failed to read sensor data");
    }

    delay(2000); // Delay for 5 seconds before sending the next set of data
  }
}
