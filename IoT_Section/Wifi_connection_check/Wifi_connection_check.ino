#include <WiFi.h>
 
const char* ssid = "slt_fiber_downstaires";
const char* password = "VeZeL150";
 
void setup(){
 
    Serial.begin(115200);
 
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    Serial.println("\nConnecting to WiFi Network ..");
 
    while(WiFi.status() != WL_CONNECTED){
        Serial.print(".");
        delay(100);
    }
 
    Serial.println("\nConnected to the WiFi network");
    Serial.print("Local ESP32 IP: ");
    Serial.println(WiFi.localIP());
}
 
void loop(){
    
}