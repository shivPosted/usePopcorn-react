import styles from "./Signup.module.css";
import Input from "../components/Input";
import { Form, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import { useAuth } from "./AuthContext";

function Signup() {
  const [fullName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await signup(formData);
      navigate("/user");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
      <h1 className={styles.heading}>Sign Up</h1>
      <Input
        htmlFor="first-name"
        labelName="First Name"
        inputName="fullName"
        value={fullName}
        setValue={setFirstName}
      />
      <Input
        htmlFor="user-name"
        labelName="User Name"
        inputName="userName"
        value={userName}
        setValue={setUserName}
      />
      <Input
        htmlFor="password"
        labelName="Password"
        inputName="password"
        value={password}
        setValue={setPassword}
      />
      <Input
        htmlFor="email"
        labelName="Email"
        inputName="email"
        value={email}
        setValue={setEmail}
      />
      <div className={styles["img-selector-container"]}>
        <img src={avatarPreview} alt="uploaded-avatar" className={styles.img} />
        <Input
          htmlFor="avatar-image"
          labelName="User Avatar"
          inputName="avatar"
          inputType="file"
          setAvatarPreview={setAvatarPreview}
        />
      </div>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
}

export default Signup;
