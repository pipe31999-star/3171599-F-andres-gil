// Componente ItemList - Catálogo de Videos
import React, { useEffect, useState } from 'react';
import { Video } from '../types/index';
import { fetchVideos, searchVideos } from '../utils/api';

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
        if (err.name !== 'AbortError') {
          setError('Error al cargar videos de la plataforma');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  // Efecto de búsqueda/filtrado
  useEffect(() => {
    if (!searchTerm) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const performSearch = async () => {
      try {
        const results = await searchVideos(searchTerm);
        setVideos(results);
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          setError('Error en la búsqueda');
        }
      } finally {
        setLoading(false);
      }
    };

    // Debounce: esperar 500ms después de dejar de escribir
    const timeoutId = setTimeout(performSearch, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (loading && videos.length === 0) {
    return <div style={{ padding: '1rem' }}>⏳ Cargando catálogo de videos...</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>🎬 Catálogo de Videos</h2>

      {/* Barra de búsqueda */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar por título o género..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem',
            width: '100%',
            maxWidth: '400px',
            marginRight: '0.5rem',
          }}
        />
        {searchTerm && (
          <button onClick={handleClearSearch} style={{ padding: '0.5rem 1rem' }}>
            Limpiar
          </button>
        )}
      </div>

      {error && <div style={{ color: 'red' }}>❌ {error}</div>}

      {loading && videos.length > 0 && (
        <div style={{ color: 'gray' }}>Actualizando...</div>
      )}

      {videos.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Título</th>
              <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Género</th>
              <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Duración</th>
              <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Visitas</th>
              <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Rating</th>
              <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id}>
                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  {video.title}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  {video.genre}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  {video.duration} min
                </td>
                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  {video.views.toLocaleString()}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  ⭐ {video.rating.toFixed(1)}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  {video.isNew ? '🆕 Nuevo' : '✅ Disponible'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ color: 'gray' }}>No hay videos para mostrar</div>
      )}
    </div>
  );
};
