const { SerialPort } = require('serialport');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const port = new SerialPort({ path: '/dev/tty.usbmodem1101', baudRate: 9600 });

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
    port.write("lock\n");
  } else if (status === "unlocked") {
    port.write("unlock\n");
  }
});
