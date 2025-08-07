// src/pages/Browse.js

import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';

const Browse = ({ searchTerm }) => {
  const [genre, setGenre] = useState('All');
  const [groupedMovies, setGroupedMovies] = useState({});

  useEffect(() => {
    const loadMovies = async () => {
      const movies = await fetchMovies();

      const filtered = searchTerm
        ? movies.filter(movie =>
            movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : movies;

      const genreFiltered = genre === 'All'
        ? filtered
        : filtered.filter(movie => movie.genre === genre);

      const grouped = genreFiltered.reduce((acc, movie) => {
        if (!acc[movie.genre]) acc[movie.genre] = [];
        acc[movie.genre].push(movie);
        return acc;
      }, {});

      setGroupedMovies(grouped);
    };

    loadMovies();
  }, [searchTerm, genre]);

  const allGenres = ['All', ...new Set(Object.values(groupedMovies).flat().map(m => m.genre))];

  return (
    <>
      <div className="filter-search-bar" style={{ padding: '1rem' }}>
        <select
          className="genre-select"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px', backgroundColor: '#222', color: '#fff' }}
        >
          {allGenres.map((g, idx) => (
            <option key={idx} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {Object.entries(groupedMovies).map(([genre, movies]) => (
        <div key={genre} style={{ padding: '1rem 2rem' }}>
          <h2 className="genre-title" style={{ color: '#00ffd5' }}>{genre} Movies</h2>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Browse;
