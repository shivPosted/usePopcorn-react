import { average } from "./util";

export default function UserSummary({ watched }) {
  let avgImdbRating = 0;
  let avgUserRating = 0;
  let avgRunTime = 0;
  if (!(watched.length === 0)) {
    avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
    avgUserRating = average(watched?.map((movie) => movie.userRating));
    avgRunTime = average(watched?.map((movie) => movie.runtime));
  }
  return (
    <div className="user-movies-overview flex">
      <h3>Movies You Watched</h3>
      <div className="stats flex">
        <div className="stats-num">
          #️⃣ <span>{watched.length}</span> Movies
        </div>
        <div className="stats-imdb-avg-ratings">
          ⭐ <span>{+avgImdbRating.toFixed(1)}</span>
        </div>
        <div className="stats-your-avg-ratings">
          🌟 <span>{+avgUserRating.toFixed(1)}</span>
        </div>
        <div className="stats-watch-time">
          ⌛ <span>{+avgRunTime.toFixed(1)}</span> min
        </div>
      </div>
    </div>
  );
}
