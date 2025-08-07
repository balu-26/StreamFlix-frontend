// src/components/MovieCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const fallbackImage = `https://via.placeholder.com/300x400?text=${encodeURIComponent(movie.title || 'No+Image')}`;

  return (
    <div className="movie-card">
      <div className="movie-image">
        <img
          src={movie.thumbnailUrl || fallbackImage}
          alt={movie.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
      </div>
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <Link to={`/watch/${movie.imdbId}`} className="watch-link">Watch</Link>
    </div>
  );
};

export default MovieCard;
