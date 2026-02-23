// Componente ItemList para videos
import React, { useEffect, useState } from 'react';
import { Video } from '../types/index';
import { fetchVideos } from '../utils/api';

export const ItemList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Cargando videos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Lista de Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <strong>{video.title}</strong> ({video.genre}) - {video.duration} min - {video.views} views
          </li>
        ))}
      </ul>
    </div>
  );
};
