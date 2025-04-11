import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");  // Go to Lock/Unlock page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login to Smart Door Lock</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>

      <p style={{ color: 'red' }}>{error}</p>

      <p>Don't have an account? <Link to="/">Register here</Link></p>
    </div>
  );
}
