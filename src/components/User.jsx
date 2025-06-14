import styles from "./User.module.css";
import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import DropDownIcon from "./DropDownIcon";
import { logOutUser } from "../Auth/authutil";
import { useNavigate } from "react-router-dom";

function User() {
  const [showUser, setShowUser] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    setShowUser((cur) => !cur);
  }

  async function handleLogOut() {
    const message = await logOutUser();
    if (message) navigate("/auth");
  }

  return (
    <>
      <div className={styles.container} onClick={handleClick}>
        <p className={styles.name}>{user.userName}</p>
        <DropDownIcon />
        {showUser && (
          <div className={styles["container-grid"]}>
            <div className={styles["container-user-info"]}>
              <div className={styles["img-container"]}>
                <img src={user.avatar} alt="user-image" />
              </div>
              <h2 className={styles.fullName}>{user.fullName}</h2>
              <h3 className={styles.email}>{user.email}</h3>
            </div>
            <div className={styles.action}>
              <button className={` ${styles.button} user-profile-btn`}>
                Manage your Account
              </button>
              <button
                onClick={handleLogOut}
                className={` ${styles.button} user-profile-btn`}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default User;
