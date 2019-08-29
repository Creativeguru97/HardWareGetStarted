int redPin = 13;
int yellowPin = 12;

int redWaitTimeOn = 1000;
int redWaitTimeOff = 500;

int yellowWaitTimeOn = 1000;
int yellowWaitTimeOff = 500;

void setup() {
  Serial.begin(9600);//Open channel between usb port
  //9600 is pretty typical number.
  
  //If we gonna be reading from pins, it's an INPUT
  //If we gonna be writing and sending to pins, it's an OUTPUT
  pinMode(redPin, OUTPUT);
  pinMode(yellowPin, OUTPUT);
}

void loop() {
  //Set LOW to turn voltage 0v, HIGH to turn on to certain voltage.

  for(int i = 0; i < 4; i++){
    Serial.println(i);
    digitalWrite(redPin, HIGH);
    delay(redWaitTimeOn);
    digitalWrite(redPin, LOW);
    delay(redWaitTimeOff);
  }
  
  Serial.println(" ");

  digitalWrite(yellowPin, HIGH);
  delay(yellowWaitTimeOn);
  digitalWrite(yellowPin, LOW);
  delay(yellowWaitTimeOff);
    
}
