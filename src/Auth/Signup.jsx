import styles from "./Signup.module.css";
import Input from "../components/Input";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../components/Button";
import { createUser } from "./authutil";
import { useState } from "react";

function Signup() {
  const [fullName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  return (
    <Form method="post" className={styles.form} encType="multipart/form-data">
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

async function action({ request }) {
  const formData = await request.formData(); //formData is iterable
  const newFormData = new FormData();

  for (const [key, value] of formData.entries()) {
    if (!(value instanceof File)) newFormData.append(key, value);
  }

  const avatar = formData.get("avatar");
  const coverImage = formData.get("coverImage");

  if (avatar) newFormData.append("avatar", avatar);
  if (coverImage) newFormData.append("coverImage", coverImage);
  await createUser(newFormData);
  return redirect(`/user`);
}

export default Signup;

export { action };
