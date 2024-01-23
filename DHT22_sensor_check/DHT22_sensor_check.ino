#include <DHT.h>

// Pin to which the DHT22 sensor data pin is connected
#define DHT_PIN 2

// Uncomment one of the following lines based on your DHT sensor model
//#define DHT_TYPE DHT11   // For DHT11
#define DHT_TYPE DHT22   // For DHT22
//#define DHT_TYPE DHT21   // For DHT21

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  delay(2000);  // Wait for 2 seconds between readings

  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" °C, Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");
  }
}
