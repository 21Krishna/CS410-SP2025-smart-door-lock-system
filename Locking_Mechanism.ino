#include <ESP32Servo.h>

Servo myServo;
int servoPin = 18;
int touchKey = 4;
void setup() {
  // put your setup code here, to run once:
  myServo.attach(servoPin);
  pinMode(touchKey, INPUT);
  Serial.begin(115200);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(digitalRead(touchKey)==HIGH) {
    myServo.write(90);
  }
  else {
    myServo.write(0);
  }
  delay(20);
}
