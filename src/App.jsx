import "./style.css";
import NavBar from "./components/Navbar";
import Logo from "./components/Logo";
import SearchBox from "./components/SearchBox";
import NumResult from "./components/NumResult";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import MovieList from "./components/MovieList";
import DisplayError from "./components/DisplayError";
import SelectedMovie from "./components/SelectedMovie";
import UserSummary from "./components/UserSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import { useMovieContext } from "./Contexts/MoviesContext";

function App() {
  const { isLoading, error, selectedId } = useMovieContext();
  // const [movies, setMovies] = useState([]);
  //
  // const [watched, setWatched] = useState(() => {
  //   const list = localStorage.getItem("watchedList");
  //   if (list) return JSON.parse(list);
  //   return [];
  // });

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [query, setQuery] = useState("");
  // const [selectedMovie, setSelectedMovie] = useState(null);
  // const [selectedId, setSelectedId] = useState(null);

  // const search = 'interstellar';

  // async function fetchMovieData(id) {
  //   if (selectedMovie?.imdbID === id) {
  //     setSelectedMovie(null);
  //     return;
  //   }
  //   try {
  //     const res = await fetch(
  //       `https://www.omdbapi.com/?i=${id}&apikey=${API_key}`
  //     );
  //     if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);

  //     const data = await res.json();

  //     if (data.Response === 'False') throw new Error(data.Error);
  //     setSelectedMovie(data);
  //   } catch (err) {
  //   }
  // }

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBox />
        <NumResult />
      </NavBar>
      <Main>
        <Box className="result-display-section">
          {!error ? isLoading ? <Loader /> : <MovieList /> : <DisplayError />}
        </Box>
        <Box className="watch-list-section">
          {selectedId ? (
            <SelectedMovie />
          ) : (
            <>
              <UserSummary />
              <WatchedMovieList />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// function WatchedMovieBox({children}) {
//   const [isOpen2, setIsOpen2] = useState(false);
//   return (
//     <section className="user-interaction-section">
//       <button
//         onClick={() => {
//           setIsOpen2(cur => !cur);
//         }}
//       >
//         {isOpen2 ? '-' : '+'}
//       </button>

//       {isOpen2 && (
//         <>
//           <UserSummary watched={watched} />
//           {children}
//         </>
//       )}
//     </section>
//   );
// }

export default App;
