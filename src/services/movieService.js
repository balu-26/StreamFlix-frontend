// src/services/movieService.js

const API_URL = 'http://localhost:5178/api/movies';

// Get all movies
export const fetchMovies = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch movies');
    return await res.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// Add a new movie
export const addMovie = async (movie) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });
    if (!res.ok) throw new Error('Failed to add movie');
    return await res.json();
  } catch (error) {
    console.error('Error adding movie:', error);
    return null;
  }
};

// Delete a movie by ID
export const deleteMovie = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete movie');
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
};

// Optional: Get a movie by DB ID (not IMDb ID)
export const getMovieById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch movie');
    return await res.json();
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    return null;
  }
};
