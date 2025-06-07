import AuthNav from "./AuthNav";
import styles from "./AuthPage.module.css";

import { Outlet } from "react-router-dom";

function AuthPage() {
  return (
    <div className={styles.wrapper}>
      <AuthNav />
      <main className={styles.container}>
        <h1 className={styles.heading}>Sign Up</h1>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthPage;
