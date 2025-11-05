import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { useAuth } from "../Contexts/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { Signup } = useAuth();
  const navigate = useNavigate();

  //signup function
  async function handleSubmit(e) {
    e.preventDefault();
    setPasswordError("");

    //password validation check
    if (password !== confirmPassword) {
      return setError(" password don't match. try again !");
    }
    // password indication check
    const passwordIndication = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordIndication.test(password)) {
      return setPasswordError(
        "Password must contain at least 6 characters, one uppercase and one lowercase letter."
      );
    }
    // try handle errors
    try {
      setError("");
      setLoading(true);
      await Signup(email, password, username);
      console.log("Email:", email);
      console.log("Pass:", password);
      console.log("user:", username);
      navigate("/"); // redirect to home
    } catch (err) {
      console.log(err);
      setError("failed to create an account");
      setLoading(false);
    }
  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        required
        type="text"
        placeholder="Enter Name"
        icon="person"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextInput
        required
        type="email"
        placeholder="Enter email"
        icon="mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextInput
        required
        type="password"
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextInput
        required
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {/* showing password error msg */}
      {passwordError && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "-10px" }}>
          {passwordError}
        </p>
      )}

      <Checkbox
        required
        text="I agree to the Terms & Conditions"
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
      />
      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>

      {/* showing error msg */}
      {error && <p className="error">{error}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
