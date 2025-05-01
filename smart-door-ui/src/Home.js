import React, { useEffect, useState } from "react";
import { ref, onValue, set, push } from "firebase/database";
import { signOut } from "firebase/auth";
import { db, auth } from "./firebase";
import "./App.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [status, setStatus] = useState("loading...");
  const [countdown, setCountdown] = useState(0);
  const [timerOption, setTimerOption] = useState(15);
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    const statusRef = ref(db, "door/status");
    onValue(statusRef, (snapshot) => {
      const value = snapshot.val();
      setStatus(value || "unknown");
    });

    const logsRef = ref(db, "logs");
    onValue(logsRef, (snapshot) => {
      const logs = snapshot.val();
      const logList = logs
        ? Object.values(logs).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        : [];
      setLogData(logList);
    });
  }, []);

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            set(ref(db, "door/status"), "locked");
            logAction("locked");
            toast.info("Auto-locked after timeout");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const toggleDoor = () => {
    const newStatus = status === "locked" ? "unlocked" : "locked";
    set(ref(db, "door/status"), newStatus);
    logAction(newStatus);
    toast.success(`Door ${newStatus === "locked" ? "Locked" : "Unlocked"} Successfully!`);
    if (newStatus === "unlocked") {
      setCountdown(timerOption);
    } else {
      setCountdown(0);
    }
  };

  const logAction = (action) => {
    const timestamp = new Date().toISOString();
    push(ref(db, "logs"), { action, timestamp });
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="app">
      <h1>🔐 Smart Door Lock</h1>
      <p className="status-text">Current Status: <strong>{status.toUpperCase()}</strong></p>

      <div className="buttons">
        <button
          className={status === "locked" ? "unlock" : "lock"}
          onClick={toggleDoor}
        >
          {status === "locked" ? "🔓 Unlock" : "🔒 Lock"}
        </button>
      </div>

      {countdown > 0 && (
        <p className="countdown-text">Auto-lock in {countdown} seconds</p>
      )}

      <div className="timer-setting">
        <label>Auto-lock after: </label>
        <select
          value={timerOption}
          onChange={(e) => setTimerOption(Number(e.target.value))}
        >
          <option value={5}>5 sec</option>
          <option value={10}>10 sec</option>
          <option value={15}>15 sec</option>
          <option value={30}>30 sec</option>
        </select>
      </div>

      <button className="logout" onClick={handleLogout}>🚪 Logout</button>

      <hr style={{ width: "80%", marginTop: "40px" }} />

      <h2>📜 Lock/Unlock History</h2>
      <div className="log-table">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logData.map((log, index) => (
              <tr key={index}>
                <td>{log.action}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;