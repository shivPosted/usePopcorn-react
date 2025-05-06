import supabase from "../supabse";

export const API_key = import.meta.env.VITE_API_key;

export const average = (arr) =>
  arr.reduce((accum, cur) => accum + cur) / arr.length;

export async function fetchMovies(query, dispatch, controller) {
  dispatch({ type: "loading" });

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${API_key}&s=${query}`,
      { signal: controller.signal },
    );
    if (!res.ok) throw new Error(`Failed: ${res.status + res.statusText}`);

    const data = await res.json();

    if (data.Response === "False") throw new Error(data.Error);
    dispatch({ type: "movies/set", payload: data.Search });
  } catch (err) {
    if (err.name !== "AbortError") {
      dispatch({ type: "error", payload: err.message });
    }
  }
}

export async function fetchWatchListData() {
  const { data, error } = await supabase
    .from("usePopcorn_react_movies")
    .select("*");
  if (!data) throw new Error(error);
  const newData = [...data].map((movie) => {
    return {
      imdbID: movie.id,
      userRating: movie.user_rating,
      title: movie.movie_name,
      runtime: movie.movie_length,
      poster: movie.movie_poster,
      imdbRating: movie.imdb_rating,
    };
  });
  return newData;
}

export async function fetchWatchList(dispatch) {
  dispatch({ type: "loading" });
  try {
    const data = await fetchWatchListData();
    dispatch({ type: "watched/set", payload: data });
  } catch (error) {
    dispatch({ type: "error", payload: error.message });
  }
}

export async function deleteMovie(id, dispatch) {
  try {
    const { error } = await supabase
      .from("usePopcorn_react_movies")
      .delete()
      .eq("id", id);
    const data = await fetchWatchListData();
    if (!data) throw new Error(error);
    dispatch({ type: "watched/set", payload: data });
  } catch (err) {
    dispatch({ type: "error", payload: err.message });
  }
}

export async function addMovies(dispatch, newMovie) {
  try {
    const { error } = await supabase
      .from("usePopcorn_react_movies")
      .insert([newMovie]);
    const data = await fetchWatchListData();
    if (!data) throw new Error(error);
    dispatch({ type: "watched/set", payload: data });
  } catch (err) {
    dispatch({ type: "error", payload: err.message });
  }
}
