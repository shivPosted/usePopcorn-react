import { useMovieContext } from "../Contexts/MoviesContext";

export default function NumResult() {
  const { searchLength } = useMovieContext();
  return (
    <h2 className="result-summary">
      Found <strong>{searchLength}</strong> results
    </h2>
  );
}
