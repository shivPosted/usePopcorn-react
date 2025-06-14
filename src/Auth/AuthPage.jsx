import GlobalLoader from "../components/GlobalLoader";
import Popup from "../ui/Popup";
import { useAuth } from "./AuthContext";
import AuthNav from "./AuthNav";
import styles from "./AuthPage.module.css";

import { Outlet, useNavigation } from "react-router-dom";

function AuthPage() {
  const navigation = useNavigation();
  const { error } = useAuth();

  const isSubmitting = navigation.state === "submitting";

  if (isSubmitting) return <GlobalLoader />;

  return (
    <div className={styles.wrapper}>
      {error && <Popup type="fail" message={error || "Please log in again"} />}
      <AuthNav />
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthPage;
