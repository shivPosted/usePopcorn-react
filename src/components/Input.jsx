import styles from "./Input.module.css";

function Input({
  inputType = "text",
  htmlFor,
  labelName,
  inputName,
  inputPlaceholder,
  setValue,
  value,
  setAvatarPreview = () => {},
}) {
  function handlePreview(e) {
    const file = e.target.files?.[0];
    const url = URL.createObjectURL(file) || "";
    setAvatarPreview(url);
  }

  return (
    <div className={styles.container}>
      <label
        htmlFor={htmlFor}
        className={`${styles[inputType !== "text" ? "file" : ""]} ${styles.label}`}
      >
        {labelName}
      </label>
      {inputType === "file" ? (
        <input
          type="file"
          id={htmlFor}
          name={inputName}
          className={`${styles.input} ${styles.file}`}
          onChange={handlePreview}
        />
      ) : (
        <input
          type={inputType}
          name={inputName}
          id={htmlFor}
          className={styles.input}
          placeholder={inputPlaceholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
}
export default Input;
