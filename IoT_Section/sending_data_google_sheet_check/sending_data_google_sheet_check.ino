void sendToGoogleSheets(int timestamp, float temperature, float humidity, float currentReading) {
  HTTPClient http;

  // Construct the URL
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
    Serial.print("Error: ");
    Serial.println(http.errorToString(httpResponseCode).c_str());
  }

  http.end();
}
