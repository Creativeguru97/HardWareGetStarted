
// set up pins for LEDs and potentiometer
const int led2Pin = 10;   // analog pin 10

int led2brightness = 0;   // how bright the second LED is
int incomingByte;   // variable for holding the data from p5.js

void setup() {
  // initialize the serial port for communication
  Serial.begin(9600);
}

void loop() {

  // read the input from p5.js and use that data to controle the second LED light
  if (Serial.available() > 0) {   // see if there's incoming serial data
   incomingByte = Serial.read();  // read it and store it in the variable
   led2brightness = map(incomingByte, 0, 255, 0, 255);  // map the incoming value to brightness
   } else { }

   // write the input brightness value to the second LED
   analogWrite(led2Pin, led2brightness);
}
