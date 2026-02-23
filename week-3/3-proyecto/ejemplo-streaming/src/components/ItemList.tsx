// Componente ItemList mejorado con búsqueda
import React, { useEffect, useState } from 'react';
import { Video } from '../types/index';
import { fetchVideos, searchVideos } from '../utils/api';
import './ItemList.css';

export const ItemList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch inicial de videos
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetchVideos(controller.signal)
      .then(setVideos)
      .catch((err) => {
        if (err.name !== 'AbortError') setError('Error al cargar videos');
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  // Búsqueda con debounce
  useEffect(() => {
    if (!searchTerm) {
      // Re-cargar todos los videos si borro la búsqueda
      const controller = new AbortController();
      fetchVideos(controller.signal).then(setVideos);
      return () => controller.abort();
    }

    setLoading(true);
    const debounceTimer = setTimeout(() => {
      searchVideos(searchTerm)
        .then(setVideos)
        .catch((err) => setError('Error en búsqueda'))
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="item-list">
      <h2>📺 Catálogo de Videos</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar videos por título o género..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="clear-btn">
            ✕ Limpiar
          </button>
        )}
      </div>

      {loading && <div className="loading">Cargando videos...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <ul className="video-list">
          {videos.map((video) => (
            <li key={video.id} className="video-item">
              <span className="thumbnail">{video.thumbnail}</span>
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>
                  {video.genre} • {video.duration} min • ⭐ {video.rating}
                </p>
                <p className="views">👁️ {video.views} visualizaciones</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
