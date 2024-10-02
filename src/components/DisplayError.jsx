import { useMovieContext } from "../Contexts/MoviesContext";

export default function DisplayError({ message }) {
  const { error: contextError } = useMovieContext();
  return (
    <p className="error">
      🚨<span>{contextError ? contextError : message}</span>
    </p>
  );
}
