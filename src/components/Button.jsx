import styles from "./Button.module.css";
function Button({ handleClick = () => {}, children, type }) {
  return <button onClick={handleClick}>{children}</button>;
}
export default Button;
