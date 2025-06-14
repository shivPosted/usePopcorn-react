import styles from "./GlobalLoader.module.css";
import Loader from "./Loader";

function GlobalLoader() {
  return (
    <div className={styles.wrapper}>
      <Loader />
    </div>
  );
}
export default GlobalLoader;
