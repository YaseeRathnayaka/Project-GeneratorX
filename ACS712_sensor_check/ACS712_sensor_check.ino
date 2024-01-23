#define ACS712_PIN A0  

void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(ACS712_PIN);
  
 
  float voltage = sensorValue * (5.0 / 1023.0);

 
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
