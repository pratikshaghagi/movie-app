// src/pages/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, IMAGE_BASE_URL } from '../api';
 // Add custom CSS for movie details

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieData = await getMovieDetails(id);
      const castData = await getMovieCredits(id);
      setMovie(movieData);
      setCast(castData.cast.slice(0, 6)); // Get the first 6 cast members
    };
    fetchMovieData();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details-container">
      <div className="movie-main-info">
        <div className="movie-poster">
          <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <h3 id="rating"><strong>Rating:</strong> {movie.vote_average} / 10</h3>
          <p><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Duration:</strong> {movie.runtime} minutes</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Overview:</strong></p>
          <p> {movie.overview}</p>
        </div>
      </div>

      <h2>Cast</h2>
      <div className="cast-list">
        {cast.map(actor => (
          <div key={actor.cast_id} className="cast-member">
            <img src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : '/path/to/placeholder-image.jpg'} alt={actor.name} />
            <p>{actor.name}<br></br>{actor.castData}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
