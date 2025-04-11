import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h2>Login to Smart Door Lock</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}

export default Login;