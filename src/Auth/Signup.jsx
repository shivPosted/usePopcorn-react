import styles from "./Signup.module.css";
import Input from "../components/Input";
import { Form } from "react-router-dom";

function Signup() {
  return (
    <Form action="post" className={styles.form}>
      <Input
        htmlFor="first-name"
        labelName="First Name"
        inputName="firstName"
      />
      <Input htmlFor="user-name" labelName="User Name" inputName="userName" />
      <Input htmlFor="password" labelName="Password" inputName="password" />
      <div className={styles["img-selector-container"]}>
        <img src="" alt="uploaded-avatar" className={styles.img} />
        <Input
          htmlFor="avatar-image"
          labelName="User Avatar"
          inputName="avatar"
          inputType="file"
        />
      </div>
      <div className={styles["img-selector-container"]}>
        <img src="" alt="uploaded cover image" className={styles.img} />
        <Input
          htmlFor="cover-image"
          labelName="Cover Image"
          inputName="coverImage"
          inputType="file"
        />
      </div>
    </Form>
  );
}

function action({ request }) {
  console.log(request);
}

export default Signup;

export { action };
