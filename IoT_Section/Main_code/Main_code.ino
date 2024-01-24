#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <HTTPClient.h>

// ... Other includes and definitions

#define WIFI_SSID "RNP 10"
#define WIFI_PASSWORD "shashindu"
#define API_KEY "AIzaSyAeiujYXemMaJFi4CIdR9YLLTMB50Oocn0"
#define USER_EMAIL "yasiiirathnayaka@gmail.com"
#define USER_PASSWORD "123456"
#define DATABASE_URL "https://generatorx-aa683-default-rtdb.firebaseio.com/"
#define GOOGLE_SHEET_ID "1tdqNnkhz89KTbWQeozvdzIfCQVQPbVx197JhvzpeVzA"

WiFiClientSecure client;
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

String uid;
String databasePath;
String tempPath = "/temperature";
String humPath = "/humidity";
String currentPath = "/current";
String timePath = "/timestamp";
String parentPath;

int timestamp;
FirebaseJson json;

const char* ntpServer = "pool.ntp.org";

#define DHT_PIN 21
DHT dht(DHT_PIN, DHT22);

#define ACS712_PIN A0

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
  // config.token_status_callback = tokenStatusCallback; // Commented out as it was not defined
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
unsigned long timerDelay = 10000;  // 10 minutes delay

void loop() {
  if (Firebase.ready()) {
    timestamp = getTime();
    parentPath = databasePath + "/" + String(timestamp);
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
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
    Serial.print("Timestamp: ");
    Serial.println(timestamp);

    json.set(tempPath.c_str(), String(temperature));
    json.set(humPath.c_str(), String(humidity));
    json.set(currentPath.c_str(), String(currentReading));
    json.set(timePath.c_str(), String(timestamp));

    Serial.printf("Set JSON... %s\n", Firebase.RTDB.setJSON(&fbdo, parentPath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());

    // Store data in Google Sheets every 10 minutes
    if ((millis() - sendDataPrevMillis > timerDelay) || sendDataPrevMillis == 0) {
      sendDataPrevMillis = millis();

      // Send data to Google Sheets
      sendToGoogleSheets(timestamp, temperature, humidity, currentReading);

      Serial.println("Data sent to Google Sheets");
    }

    delay(10000);  // Delay for 10 seconds before sending the next set of data
  }
}

void sendToGoogleSheets(int timestamp, float temperature, float humidity, float currentReading) {
  HTTPClient http;

  // Break down URL concatenation
  String url = "https://script.google.com/macros/s/AKfycbz4uul3xXoS2r-TEwvCufq68l8ZCi8FvsSTcPBSEZNuLnnOyoj-DwR48H7o2NDOhmWR/exec";
  url += GOOGLE_SHEET_ID;
  url += "/exec?timestamp=";
  url += String(timestamp);
  url += "&temperature=";
  url += String(temperature);
  url += "&humidity=";
  url += String(humidity);
  url += "&current=";
  url += String(currentReading);

  Serial.print("Sending data to Google Sheets... ");
  int httpResponseCode = http.begin(url);  // Use begin() directly with the URL
  if (httpResponseCode > 0) {
    Serial.println("Success");
  } else {
    Serial.print("Failed, HTTP response code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}
