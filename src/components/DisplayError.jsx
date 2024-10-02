export default function DisplayError({ message }) {
  return (
    <p className="error">
      🚨<span>{message}</span>
    </p>
  );
}
