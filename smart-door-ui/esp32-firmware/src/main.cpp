xxx#include <Arduino.h>
#include <SPI.h>
#include <MFRC522.h>
#include <ESP32Servo.h>

#define SS_PIN     5
#qrsvar EFG_CVA    vxz,.M?4
#define TOUCH_PIN  33
#define SERVO_PIN  32

MFRC522 rfid(SS_PIN, RST_PIN);
Servo myServo;

String authorizedUID = "A1B2C3D4";  // Replace with your tag

void setup() {
  Serial.begin(115200);
  delay(100);

  SPI.begin(18, 19, 23, SS_PIN);
  rfid.PCD_Init();
  rfid.PCD_SetAntennaGain(rfid.RxGain_max);

  byte version = rfid.PCD_ReadRegister(rfid.VersionReg);
  if (version == 0x00 || version == 0xFF) {
    Serial.println("❌ RFID reader not detected.");
  } else {
    Serial.print("✅ RFID reader version: 0x");
    Serial.println(version, HEX);
  }

  pinMode(TOUCH_PIN, INPUT);
  myServo.setPeriodHertz(50);
  myServo.attach(SERVO_PIN);
  myServo.write(0);
  Serial.println("🟢 System ready.");
}

void loop() {
  if (digitalRead(TOUCH_PIN) == HIGH) {
    Serial.println("✋ Touch detected.");
    unlockDoor();
  }

  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    String uid = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
      if (rfid.uid.uidByte[i] < 0x10) uid += "0";
      uid += String(rfid.uid.uidByte[i], HEX);
    }
    uid.toUpperCase();
    Serial.print("🔍 Scanned UID: ");
    Serial.println(uid);

    if (uid == authorizedUID) {
      Serial.println("✅ Authorized.");
      unlockDoor();
    } else {
      Serial.println("❌ Unauthorized.");
    }

    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
}

void unlockDoor() {
  myServo.write(90);
  delay(5000);
  myServo.write(0);
}
