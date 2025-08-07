// ✅ AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchMovies, addMovie, deleteMovie } from '../services/movieService';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    thumbnailUrl: '',
    imdbId: ''
  });

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await fetchMovies();
    setMovies(data);
  };

  const handleAddMovie = async () => {
    const { title, genre, thumbnailUrl, imdbId } = newMovie;
    if (!title || !genre || !thumbnailUrl || !imdbId) return;
    await addMovie(newMovie);
    setNewMovie({ title: '', genre: '', thumbnailUrl: '', imdbId: '' });
    loadMovies();
  };

  const handleDelete = async (id) => {
    await deleteMovie(id);
    loadMovies();
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#141414', color: '#fff' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Title" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Genre" value={newMovie.genre} onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Thumbnail URL" value={newMovie.thumbnailUrl} onChange={(e) => setNewMovie({ ...newMovie, thumbnailUrl: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="IMDb ID" value={newMovie.imdbId} onChange={(e) => setNewMovie({ ...newMovie, imdbId: e.target.value })} style={inputStyle} />
        <button onClick={handleAddMovie} style={addButtonStyle}>Add</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Genre</th>
            <th style={thStyle}>Thumbnail</th>
            <th style={thStyle}>IMDb ID</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td style={tdStyle}>{movie.id}</td>
              <td style={tdStyle}>{movie.title}</td>
              <td style={tdStyle}>{movie.genre}</td>
              <td style={tdStyle}><img src={movie.thumbnailUrl} alt={movie.title} style={{ width: '60px' }} /></td>
              <td style={tdStyle}>{movie.imdbId}</td>
              <td style={tdStyle}><button onClick={() => handleDelete(movie.id)} style={deleteButtonStyle}>🗑️</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const inputStyle = {
  padding: '0.5rem',
  borderRadius: '6px',
  border: '1px solid #555',
  backgroundColor: '#1f1f1f',
  color: '#fff',
  width: '180px',
};

const addButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#e50914',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  padding: '0.4rem 0.8rem',
  backgroundColor: '#c40812',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const thStyle = {
  padding: '0.75rem',
  borderBottom: '1px solid #444',
  backgroundColor: '#222',
};

const tdStyle = {
  padding: '0.75rem',
  borderBottom: '1px solid #333',
};

export default AdminDashboard;
