import Button from "../components/Button";
import Input from "../components/Input";
import { Form, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import { useAuth } from "./AuthContext";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login({ userName, password });
      navigate("/user");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.heading}>Login</h1>
      <Input
        htmlFor="username/email"
        labelName="Username"
        inputName="userName"
        inputPlaceholder="Enter user name"
        setValue={setUserName}
        value={userName}
      />
      <Input
        htmlFor="password"
        labelName="password"
        inputName="password"
        inputPlaceholder="Enter password"
        setValue={setPassword}
        value={password}
      />
      <Button type="submit">Login</Button>
    </Form>
  );
}

export default Login;
