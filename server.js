const { SerialPort } = require('serialport');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const serviceAccount = require('./serviceAccountKey.json');

// Connect to Arduino Serial Port
const port = new SerialPort({ path: '/dev/tty.usbmodem101', baudRate: 9600 });

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smartdoorlock-1d821-default-rtdb.firebaseio.com/"
});

const db = admin.database();
const statusRef = db.ref("door/status");

// Set up email transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'leopatel3311@gmail.com',
    pass: 'tuxj sytw vclu mocf'  // Use an App Password if your account has 2FA
  }
});

function sendEmailNotification(status) {
  const mailOptions = {
    from: 'leopatel3311@gmail.com',
    to: 'krishnamshah04@gmail.com', // you can add others here too
    subject: "🔐 Door ${status.toUpperCase()} Notification",
    text: "Open the door cutieeee"
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("❌ Email Error:", error);
    }
    console.log("📧 Email sent:", info.response);
  });
}

statusRef.on('value', (snapshot) => {
  const status = snapshot.val();
  console.log("Door status changed to:", status);

  if (status === "locked") {
    port.write("lock\n");
    sendEmailNotification("locked");
  } else if (status === "unlocked") {
    port.write("unlock\n");
    sendEmailNotification("unlocked");
  }
});
