import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Movie.css"; // Assuming you have a CSS file

function Movie({ id, medium_cover_image, title, genres }) {
  return (
    <div className="movie-container">
      <Link to={`/movie/${id}`}>
        <img src={medium_cover_image} alt={title} />
      </Link>
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  medium_cover_image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
