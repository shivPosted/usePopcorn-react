import { useState } from "react";
import { useMovieContext } from "../Contexts/MoviesContext";

export default function Box({ children, className }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <section className={className}>
      <button
        className="collapse-show-btn"
        onClick={() => {
          setIsOpen((cur) => !cur);
        }}
      >
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </section>
  );
}
