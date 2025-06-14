import Button from "../components/Button";
import Input from "../components/Input";
import { Form, useActionData, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { loginUser } from "./authutil";
import { useState } from "react";
import Popup from "../ui/Popup";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { fetchUserInfo } = useAuth();
  const navigate = useNavigate();
  const data = useActionData();
  const success = data?.message;
  let error = data?.error;
  console.log(error);

  useEffect(() => {
    if (!success) return;
    fetchUserInfo().then(() => navigate("/user"));
  }, [navigate, fetchUserInfo, success]);

  return (
    <Form method="POST" className={styles.form}>
      <h1 className={styles.heading}>Login</h1>
      {data && (
        <Popup
          type={error ? "fail" : "success"}
          message={error ? error : data?.message}
        />
      )}
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

async function action({ request }) {
  const res = await request.formData();
  const formData = Object.fromEntries(res);
  const data = await loginUser(formData);
  return data;
}
export default Login;
export { action };
