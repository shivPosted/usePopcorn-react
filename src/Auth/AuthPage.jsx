import Popup from "../ui/Popup";
import { useAuth } from "./AuthContext";
import AuthNav from "./AuthNav";
import styles from "./AuthPage.module.css";

import { Outlet } from "react-router-dom";

function AuthPage() {
  const { error, isLoading } = useAuth();

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoLabel}>
        <span>ℹ️</span> Backend may take a moment to load (free tier).
      </div>
      {error && <Popup type="fail" message={error || "Please log in again"} />}
      {isLoading && <Popup type="loading" message="Loading..." />}
      <AuthNav />
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthPage;
