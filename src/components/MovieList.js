// src/components/MovieList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../api'; // Make sure this is correctly imported

const MovieList = ({ movies = [] }) => {
  if (!movies.length) {
    return <p>No movies available</p>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie">
          <Link to={`/movie/${movie.id}`}>
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
          </Link>
          <h3>{movie.title}</h3>
          <p>Rating: {movie.vote_average} / 10</p> {/* Display the rating here */}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
