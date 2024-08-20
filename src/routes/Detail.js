import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css"; // Import the CSS file

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [showFullSummary, setShowFullSummary] = useState(false); // State to manage summary display

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }

  // Get the background image URL
  const backgroundImage = movie.background_image_original;

  // Get the torrent URLs from the movie object
  const torrentLinks =
    movie.torrents && movie.torrents.length > 0
      ? movie.torrents.map((torrent, index) => (
          <a
            key={index}
            href={torrent.url}
            className="download-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Torrent {torrent.quality} - {torrent.type}
          </a>
        ))
      : null;

  const summary = movie.description_full;
  const shortSummary =
    summary && summary.length > 300 ? summary.slice(0, 300) + "..." : summary;

  const toggleSummary = () => {
    setShowFullSummary(!showFullSummary);
  };

  // Within the return block of the Detail.js component
  return (
    <div>
      <div
        className="movie-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="movie-detail">
          <img
            src={movie.large_cover_image}
            alt={movie.title}
            className="cover-image"
          />
        </div>
      </div>
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{showFullSummary ? summary : shortSummary}</p>
        {summary && summary.length > 300 && (
          <button onClick={toggleSummary} className="toggle-summary-button">
            {showFullSummary ? "Show Less" : "Load Details"}
          </button>
        )}
        <hr className="separator" /> {/* Add a horizontal line */}
        <ul>
          <li>
            <strong>Year:</strong> {movie.year}
          </li>
          <li>
            <strong>Rating:</strong> {movie.rating}
          </li>
          <li>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </li>
        </ul>
        <div className="torrent-links">{torrentLinks}</div>
      </div>
    </div>
  );
}

export default Detail;
