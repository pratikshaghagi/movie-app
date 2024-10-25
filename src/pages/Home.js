// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../api';
import MovieList from '../components/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      
      try {
        const data = await getPopularMovies();
        if (data && data.results) {
          setMovies(data.results);
        } else {
          throw new Error('No data found');
        }
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; // Display error message

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieList movies={movies} />
      <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(prev => prev + 1)}>Next</button>
    </div>
  );
};

export default Home;
