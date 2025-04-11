import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registered Successfully! Now you can Login.");
      navigate("/login"); // Send to login page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Register for Smart Door Lock</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>

      <p style={{ color: 'red' }}>{error}</p>

      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}