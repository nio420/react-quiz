import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { Login } = useAuth();
  const navigate = useNavigate();

  //signup function
  async function handleSubmit(e) {
    e.preventDefault();

    // try handle errors
    try {
      setError("");
      setLoading(true);
      await Login(email, password);
      console.log("Email:", email);
      console.log("Pass:", password);
      navigate("/"); // redirect to home
    } catch (err) {
      console.log(err);
      setError("failed to create an login");
      setLoading(false);
    }
  }
  return (
    <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
      <TextInput
        type="email"
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={loading} type="submit">
        <span> Login Now </span>
      </Button>

      {/* showing error msg */}
      {error && <p className="error">{error}</p>}

      <div class="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
