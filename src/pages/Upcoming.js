// src/pages/TopRated.js
import React, { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../api';
import MovieList from '../components/MovieList';

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getUpcomingMovies(page).then(data => setMovies(data.results));
  }, [page]);

  return (
    <div>
      <h1>Top Rated Movies</h1>
      <MovieList movies={movies} />
      <button  onClick={() => setPage(prev => prev - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(prev => prev + 1)}>Next</button>
    </div>
  );
};

export default TopRated;
