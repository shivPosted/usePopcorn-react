import { useEffect, useRef } from "react";
import { useMovieContext } from "../Contexts/MoviesContext";

export default function SearchBox() {
  const { dispatch, query } = useMovieContext();

  // const [search, setSearch] = useState('');

  //NOTE: -- how not to select elements in dom👇
  //
  // useEffect(() => {
  //   const input = document.querySelector(".input-field");
  //   input.focus();
  // }, []);

  //HACK: -- how to select dom element in react using refs

  const inputEl = useRef(null);

  useEffect(() => {
    const callBack = function (e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        dispatch({ type: "query/set", payload: "" });
      }
    };
    document.addEventListener("keydown", callBack);

    return () => document.removeEventListener("keydown", callBack);
  }, [dispatch]);

  return (
    <input
      type="text"
      className="input-field"
      placeholder="Search movies..."
      value={query}
      ref={inputEl}
      onChange={(e) => {
        dispatch({ type: "query/set", payload: e.target.value });
      }}
    />
  );
}
