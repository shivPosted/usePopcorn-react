export default function MovieList({ movies, setSelectedId }) {
  return (
    <ul>
      {movies?.map((movie) => (
        <li
          className="search-list-row"
          key={movie.imdbID}
          onClick={() => {
            setSelectedId((cur) =>
              cur === movie.imdbID ? null : movie.imdbID,
            );
          }}
        >
          <div className="img-container">
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
          </div>
          <h3>{movie.Title}</h3>
          <h4>📅 {movie.Year}</h4>
        </li>
      ))}
    </ul>
  );
}
