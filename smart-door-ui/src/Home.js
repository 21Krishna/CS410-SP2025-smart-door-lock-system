import React, { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { signOut } from "firebase/auth";
import { db, auth } from "./firebase";
import "./App.css";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    const statusRef = ref(db, "door/status");
    onValue(statusRef, (snapshot) => {
      const value = snapshot.val();
      setStatus(value || "unknown");
    });
  }, []);

  const toggleDoor = () => {
    if (status === "locked") {
      set(ref(db, "door/status"), "unlocked");
      toast.success("Door Unlocked Successfully!");
    } else {
      set(ref(db, "door/status"), "locked");
      toast.success("Door Locked Successfully!");
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="app">
      <h1>🔐 Smart Door Lock</h1>
      <p>Current Status: <strong>{status.toUpperCase()}</strong></p>

      <div className="buttons">
        <button
          className={status === "locked" ? "unlock" : "lock"}
          onClick={toggleDoor}
        >
          {status === "locked" ? "🔓 Unlock" : "🔒 Lock"}
        </button>
      </div>

      <br/>

      <button className="logout" onClick={handleLogout}>🚪 Logout</button>

      <ToastContainer />
    </div>
  );
}

export default Home;

 