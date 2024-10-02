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
