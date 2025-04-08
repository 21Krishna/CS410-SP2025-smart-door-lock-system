// src/App.js
import React, { useEffect, useState } from "react";
import db from "./firebase";
import { db, ref, onValue, set  } from "firebase/database";
import "./App.css";

function App() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    const statusRef = ref(db, "door/status");
    onValue(statusRef, (snapshot) => {
      const value = snapshot.val();
      setStatus(value || "unknown");
    });
  }, []);

  const lockDoor = () => set(ref(db, "door/status"), "locked");
  const unlockDoor = () => set(ref(db, "door/status"), "unlocked");

  return (
    <div className="app">
      <h1>🔐 Smart Door Lock</h1>
      <p>Current Status: <strong>{status.toUpperCase()}</strong></p>
      <div className="buttons">
        <button className="lock" onClick={lockDoor}>🔒 Lock</button>
        <button className="unlock" onClick={unlockDoor}>🔓 Unlock</button>
      </div>
    </div>
  );
}

export default App;
