// Componente StatsCard - Estadísticas de Streaming
import React, { useEffect, useState } from 'react';
import { Stats } from '../types/index';
import { fetchStats } from '../utils/api';

export const StatsCard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Primer efecto: cargar estadísticas
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchStats()
      .then((data) => setStats(data))
      .catch((err) => setError('Error al cargar estadísticas'))
      .finally(() => setLoading(false));
  }, []);

  // Segundo efecto: refrescar estadísticas cada 30 segundos
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        console.error('Error refrescando stats:', err);
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading && !stats) {
    return <div style={{ padding: '1rem' }}>⏳ Cargando estadísticas...</div>;
  }

  if (error) {
    return <div style={{ padding: '1rem', color: 'red' }}>❌ {error}</div>;
  }

  if (!stats) {
    return <div style={{ padding: '1rem' }}>Sin datos</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📊 Estadísticas de la Plataforma</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {/* Card 1: Total de Videos */}
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Total de Videos</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#FF6B6B' }}>
            {stats.totalVideos}
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#999' }}>
            videos en la plataforma
          </p>
        </div>

        {/* Card 2: Usuarios Activos */}
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Usuarios Activos</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#4ECDC4' }}>
            {stats.activeUsers.toLocaleString()}
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#999' }}>
            usuarios conectados
          </p>
        </div>

        {/* Card 3: Visualizaciones Hoy */}
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Visualizaciones Hoy</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#45B7D1' }}>
            {(stats.viewsToday / 1000).toFixed(0)}k
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#999' }}>
            vistas acumuladas
          </p>
        </div>

        {/* Card 4: Ingresos */}
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Ingresos Totales</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#95E1D3' }}>
            ${stats.totalRevenue.toFixed(0)}
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#999' }}>
            ingresos del período
          </p>
        </div>
      </div>
    </div>
  );
};
