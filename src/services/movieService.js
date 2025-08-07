// src/services/movieService.js

const API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://streamapi-d2a8adfjdphsb2dk.canadaeast-01.azurewebsites.net/api/movies'
    : 'http://localhost:5178/api/movies';

// ✅ Fetch all movies
export const fetchMovies = async () => {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('Failed to fetch movies');
    return await res.json();
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    return [];
  }
};

// ✅ Add a new movie
export const addMovie = async (movie) => {
  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || 'Failed to add movie');
    }

    return await res.json();
  } catch (error) {
    console.error('Error adding movie:', error.message);
    return null;
  }
};

// ✅ Delete movie by ID
export const deleteMovie = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || 'Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error.message);
  }
};

// ✅ Get movie by ID
export const getMovieById = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch movie');
    return await res.json();
  } catch (error) {
    console.error('Error fetching movie by ID:', error.message);
    return null;
  }
};
