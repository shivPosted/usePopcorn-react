import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "./AuthNav.module.css";

function AuthNav() {
  const navigate = useNavigate();
  return (
    <div className={styles.nav}>
      <Button type="auth" handleClick={() => navigate("signup")}>
        sign up
      </Button>
      <Button type="auth" handleClick={() => navigate("login")}>
        login
      </Button>
    </div>
  );
}
export default AuthNav;
