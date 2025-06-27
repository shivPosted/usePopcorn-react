

const backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT;

export const average = (arr) =>
  arr.reduce((accum, cur) => accum + cur) / arr.length;

export async function fetchMovies(query, dispatch, controller, API_key) {
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

export async function fetchWatchListData(dispatch) {
  dispatch({ type: "loading/watched" });
  const res = await fetch(`${backendEndpoint}/movies/getMovies`, {
    method: "get",
    credentials: "include",
  });
  const { data } = await res.json();
  if (!res.ok) throw new Error(`${res.statusText}: ${data.error}`);
  return data.map((movie) => movie);
}

export async function fetchWatchList(dispatch) {
  try {
    const data = await fetchWatchListData(dispatch);
    dispatch({ type: "watched/set", payload: data });
  } catch (error) {
    dispatch({ type: "error/watched", payload: error.message });
  }
}

export async function deleteMovie(id, dispatch) {
  try {
    const res = await fetch(`${backendEndpoint}/movies/delete?imdbId=${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const { data } = await res.json();
    if (!res.ok) throw new Error(`${res.statusText}: ${data.error}`);
    const newWatchList = await fetchWatchListData(dispatch);
    dispatch({ type: "watched/set", payload: newWatchList });
  } catch (err) {
    dispatch({ type: "error/watched", payload: err.message });
  }
}

export async function addMovie(dispatch, newMovie) {
  console.log(JSON.stringify(newMovie));
  dispatch({ type: "loading/watched" });
  try {
    const res = await fetch(`${backendEndpoint}/movies/addMovie`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      credentials: "include",
      body: JSON.stringify(newMovie),
    });
    const { data } = await res.json();
    if (!res.ok) throw new Error(`${res.statusText}: ${data.error}`);
    const newWatchList = await fetchWatchListData(dispatch);
    dispatch({ type: "watched/set", payload: newWatchList });
  } catch (err) {
    dispatch({ type: "error/watched", payload: err.message });
  }
}
