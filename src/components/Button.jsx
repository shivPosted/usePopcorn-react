import styles from "./Button.module.css";

function Button({ handleClick = () => {}, children, type }) {
  return (
    <button
      className={`${styles.button} ${styles["not-global"]} ${styles[type]}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
export default Button;
