import styles from "./Input.module.css";

function Input({
  inputType = "text",
  htmlFor,
  labelName,
  inputName,
  inputPlaceholder,
}) {
  return (
    <div className={styles.container}>
      <label
        htmlFor={htmlFor}
        className={`${styles[inputType !== "text" ? "file" : ""]} ${styles.label}`}
      >
        {labelName}
      </label>
      <input
        type={inputType}
        name={inputName}
        id={htmlFor}
        className={`${styles.input} ${styles[inputType === "file" ? "file" : ""]} `}
        placeholder={inputPlaceholder}
      />
    </div>
  );
}
export default Input;
