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
import { useAuth } from "./Auth/AuthContext";
import User from "./components/User";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./ui/Popup";

function App() {
  const { isLoading, error, selectedId, isLoadingWatchList, errorWatched } =
    useMovieContext();
  const { getUserOnRefreshIfAuthorized, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getUserOnRefreshIfAuthorized().catch(() => navigate("/auth"));
  }, [getUserOnRefreshIfAuthorized, navigate]);

  return (
    <>
      {authLoading && <Popup type="loading" message="Loading..." />}
      <NavBar>
        <Logo />
        <SearchBox />
        <NumResult />
        <User />
      </NavBar>
      <Main>
        <Box className="result-display-section" showStartMessage={true}>
          {error && <DisplayError message={error} />}
          {isLoading ? <Loader /> : <MovieList />}
        </Box>
        <Box className="watch-list-section">
          {selectedId ? (
            <SelectedMovie />
          ) : (
            <>
              <UserSummary />
              {errorWatched && <DisplayError message={errorWatched} />}
              {isLoadingWatchList ? <Loader /> : <WatchedMovieList />}
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
