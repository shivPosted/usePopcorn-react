import { useMovieContext } from "../Contexts/MoviesContext";

export default function DisplayError() {
  const { error: contextError, errorWatched } = useMovieContext();
  return (
    <p className="error">
      🚨<span>{contextError ? contextError : errorWatched}</span>
    </p>
  );
}
