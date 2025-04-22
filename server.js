const { SerialPort } = require('serialport');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Download your firebase admin SDK key

// Connect to Arduino Serial Port (Check your port with ls /dev/tty.*)
const port = new SerialPort({ path: '/dev/tty.usbmodem1101', baudRate: 9600 });

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smartdoorlock-1d821-default-rtdb.firebaseio.com/"
});

const db = admin.database();
const statusRef = db.ref("door/status");

statusRef.on('value', (snapshot) => {
  const status = snapshot.val();
  console.log("Door status changed to:", status);

  if (status === "locked") {
    port.write("lock\n");    // Send "lock" to Arduino
  } else if (status === "unlocked") {
    port.write("unlock\n");  // Send "unlock" to Arduino
  }
});
