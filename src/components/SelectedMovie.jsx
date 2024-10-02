import { useEffect, useState } from "react";
import { API_key } from "./util";
import Loader from "./Loader";
import DisplayError from "./DisplayError";
import StarComponent from "./StarComponent";
import { useMovieContext } from "../Contexts/MoviesContext";

export default function SelectedMovie() {
  // let showAddBtn = false;
  const {
    dispatch,
    selectedId,
    handleAddToWathedList,
    watched: watchlist,
  } = useMovieContext();

  const iswatched = watchlist.find((movie) => movie.imdbID === selectedId);

  // function defaultRatingHandle() {
  //   // if (!movieInList) return;

  //   const defaultRating = iswatched ? iswatched.userRating : 0;
  //   setUserRating(defaultRating);
  //   // showAddBtn = true;
  // }

  // const defaultRating =
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);

  const {
    Poster: poster,
    Title: title,
    Released: released,
    Plot: plot,
    Genre: genre,
    Actors: actors,
    Director: director,
    Runtime: runtime,
    imdbRating,
  } = selectedMovie;

  function handleOnBackClick() {
    dispatch({ type: "selectedID/null" });
  }

  function handleAddOnClick() {
    const newMovie = {
      runtime: isFinite(parseInt(runtime)) ? parseInt(runtime) : 0,
      title,
      imdbRating: parseInt(imdbRating),
      userRating,
      poster,
      imdbID: selectedId,
    };

    handleAddToWathedList(newMovie);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchMovieData() {
      setError("");
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=${API_key}`,

          { signal },
        );
        if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);

        const data = await res.json();

        if (data.Response === "False") throw new Error(data.Error);

        setSelectedMovie(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieData(selectedId);

    return () => controller.abort();
    // defaultRatingHandle();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => (document.title = "usePopcorn"); //cleanup function
  }, [title]);

  useEffect(() => {
    const keydownEvent = function (e) {
      if (e.key === "Escape") handleOnBackClick();
    };

    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
  }, [handleOnBackClick]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <DisplayError message={error} />
  ) : (
    <>
      <div className="selected-movie">
        <section className="movie-overview">
          <img
            className="movie-overview-image"
            src={poster}
            alt={`${title}-poster`}
          />
          <div className="movie-overview-details">
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p>⭐ {imdbRating} IMDB rating</p>
          </div>
        </section>
        <section>
          <div className="rate-movie">
            {!iswatched ? (
              <>
                <StarComponent
                  maxLength={10}
                  size={24}
                  onSetRating={setUserRating}
                  defaultRating={userRating}
                />
                {userRating > 0 ? (
                  <button
                    className="add-watchlist-btn"
                    onClick={handleAddOnClick}
                  >
                    + Add To Watchlist
                  </button>
                ) : (
                  ""
                )}
              </>
            ) : (
              <p>
                You gave this movie <strong>{iswatched.userRating}</strong>⭐
                rating
              </p>
            )}
          </div>
          <p>{plot}</p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
        <button className="back-btn" onClick={handleOnBackClick}>
          &larr;
        </button>
      </div>
    </>
  );
}
