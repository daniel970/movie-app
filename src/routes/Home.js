import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import "./Home.css";

function Home({ selectedGenre }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genres.includes(selectedGenre))
    : movies;

  return (
    <div className="home-container">
      <h1>Movies Over 9.0 Ratings</h1>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <div className="movies">
          {filteredMovies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              medium_cover_image={movie.medium_cover_image}
              title={movie.title}
              genres={movie.genres}
              rating={movie.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
