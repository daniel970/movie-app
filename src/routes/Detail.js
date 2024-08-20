import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css"; // Import the CSS file

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

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
    return <h1>Loading...</h1>;
  }

  return (
    <div className="movie-detail">
      <img src={movie.large_cover_image} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description_full}</p>
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
      <ul className="genres">
        {movie.genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}

export default Detail;
