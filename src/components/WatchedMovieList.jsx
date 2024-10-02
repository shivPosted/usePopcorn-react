import { useState } from "react";
import DeleteButton from "./DeleteButton";

export default function WatchedMovieList({ movies, setWathList }) {
  const [hoverId, setHoverId] = useState(null);

  function handleDelete() {
    setWathList((list) => list.filter((item) => item.imdbID !== hoverId));
  }
  return (
    <ul>
      {movies?.map((movie) => (
        <li
          key={movie.imdbID}
          onMouseEnter={() => setHoverId(movie.imdbID)}
          onMouseLeave={() => setHoverId(null)}
          className="watch-list-row"
        >
          <div className="img-container">
            <img src={movie.poster} alt={`${movie.title} Poster`} />
          </div>
          <h3>{movie.title}</h3>
          <div className="user-reviewed-list-stats flex">
            <div className="imdb-ratings">
              ⭐ <span>{movie.imdbRating}</span>
            </div>
            <div className="user-ratings">
              🌟 <span>{movie.userRating}</span>
            </div>
            <div className="movie-length">
              ⌛ <span>{movie.runtime}</span>
            </div>
          </div>
          {movie.imdbID === hoverId ? (
            <DeleteButton handleClick={handleDelete} />
          ) : (
            ""
          )}
        </li>
      ))}
    </ul>
  );
}
