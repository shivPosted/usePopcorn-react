import { useEffect, useRef } from "react";

export default function SearchBox({ setQuery, query }) {
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
        setQuery("");
      }
    };
    document.addEventListener("keydown", callBack);

    return () => document.removeEventListener("keydown", callBack);
  }, [setQuery]);

  return (
    <input
      type="text"
      className="input-field"
      placeholder="Search movies..."
      value={query}
      ref={inputEl}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
}
