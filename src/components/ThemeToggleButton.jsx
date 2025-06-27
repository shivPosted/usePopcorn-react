import { useTheme } from "../Contexts/ThemeContext";
import Button from "./Button";

function ThemeToggleButton() {
  const { theme, handleTheme } = useTheme();
  return (
    <Button type="user-profile-btn" handleClick={handleTheme}>
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
}

export default ThemeToggleButton;
