// the following codes needed to be added to sketch.js for Part 3
var serial;
var rightSlider; // add a slider component
var outData = 0; // for data output
var portName = '/dev/tty.usbmodem14401';  // fill in your serial port name here

function setup() {
  createCanvas(700, 400);
  // add the following to setup the slider
  rightSlider = createSlider(0, 255, 0); // indicate the value range for slider
  rightSlider.position(width/2 + (width/2-300)/2 , height-100);
  rightSlider.style('width', '300px');
  serial = new p5.SerialPort();

  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function draw() {
  background(100);
  // The following changes are for the right side to control Arduino

  // right side: read the value from browser
  var rightBrightness = map(rightSlider.value(), 0, 255, 0, 255); // convert slider input to brightness

  fill(rightBrightness); // change the visualization in p5
  rect(width/2,0,width/2,height);
  console.log(rightBrightness);

  outData = rightBrightness;  // setup the serial output
  serial.write(outData); // write to serial for Arduino to pickup

  var textRColor = map(rightBrightness, 0, 255, 255,0); // draw the text
  fill(textRColor);
  textSize(16);
  text("ME", width - 70, 30);
  textSize(12);
  text("BRIGHTNESS LEVEL: " + rightBrightness, width - 170, 50);
}

function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  inData = Number(serial.read());
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}
