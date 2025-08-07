// src/pages/Watch.js (Updated with validation against admin-added movies)
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovies } from "../services/movieService";

export default function Watch() {
  const { id } = useParams(); // IMDb ID from URL
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateMovie = async () => {
      try {
        const movies = await fetchMovies();
        const found = movies.find((m) => m.imdbId === id);
        if (found) {
          setAllowed(true);
        } else {
          navigate("/browse");
        }
      } catch (err) {
        console.error("Failed to fetch movie list", err);
      } finally {
        setLoading(false);
      }
    };

    validateMovie();
  }, [id, navigate]);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#fff" }}>
        Checking movie...
      </div>
    );
  }

  if (!allowed) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#e50914" }}>
        This movie is not authorized or does not exist in our library.
      </div>
    );
  }

  const embedUrl = `https://vidsrc.to/embed/movie/${id}`;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2 style={{ color: "#00ffd5", marginBottom: "1rem" }}>Now Playing</h2>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={embedUrl}
          title="Movie Player"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "12px",
          }}
        ></iframe>
      </div>
    </div>
  );
}
