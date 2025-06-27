import ThemeToggle from "./ThemeToggle";

export default function NavBar({ children }) {
  return (
    <nav className="flex">
      {children}
      <ThemeToggle />
    </nav>
  );
}
