import Button from "../components/Button";

function AuthNav() {
  return (
    <div className="nav">
      <Button type="auth">sign up</Button>
      <Button type="auth">login</Button>
    </div>
  );
}
export default AuthNav;
