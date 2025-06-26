import { motion, AnimatePresence } from "framer-motion";
import styles from "./Popup.module.css";
import { useState } from "react";
import { useEffect } from "react";

function Popup({ type = "success", message = "popup" }) {
  const [showPopup, setShowpopup] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowpopup(false), 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          <div className={styles["loading-backdrop"]}></div>
          <motion.div
            className={`${styles.container} ${styles[type]}`}
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
export default Popup;
