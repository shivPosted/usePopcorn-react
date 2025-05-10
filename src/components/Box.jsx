import { useState } from "react";
import { useMovieContext } from "../Contexts/MoviesContext";
import StartMessage from "./StartMessage";

export default function Box({ children, className, showStartMessage = false }) {
  const [isOpen, setIsOpen] = useState(true);
  const { movies, isLoading } = useMovieContext();

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
      {movies.length === 0 && showStartMessage && !isLoading ? (
        <StartMessage />
      ) : null}
    </section>
  );
}
