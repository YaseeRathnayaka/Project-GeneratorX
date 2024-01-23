#define ACS712_PIN A0  

void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(ACS712_PIN);
  
  // Assuming 5V reference voltage for Arduino
  float voltage = sensorValue * (5.0 / 1023.0);

  // ACS712 sensitivity is 100mV/A for ACS712-05B, adjust if you have a different model
  float current = (voltage - 2.5) / 0.1;

  Serial.print("Sensor Value: ");
  Serial.print(sensorValue);
  Serial.print(", Voltage: ");
  Serial.print(voltage);
  Serial.print(" V, Current: ");
  Serial.print(current);
  Serial.println(" A");

  delay(1000); 
}
