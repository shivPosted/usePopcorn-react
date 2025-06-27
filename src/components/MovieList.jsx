import { useMovieContext } from "../Contexts/MoviesContext";
import { motion } from "framer-motion";

export default function MovieList() {
  const { movies, dispatch } = useMovieContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {movies?.map((movie) => (
        <motion.li
          className="search-list-row"
          key={movie.imdbID}
          onClick={() => {
            dispatch({ type: "selectedID/set", payload: movie.imdbID });
          }}
          variants={itemVariants}
        >
          <div className="img-container">
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
          </div>
          <h3>{movie.Title}</h3>
          <h4>📅 {movie.Year}</h4>
        </motion.li>
      ))}
    </motion.ul>
  );
}

