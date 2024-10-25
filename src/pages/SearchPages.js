// src/pages/SearchPage.js
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovie } from '../api'; // Correct import
import MovieList from '../components/MovieList';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      searchMovie(query).then((data) => setMovies(data.results || []));
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default SearchPage;
