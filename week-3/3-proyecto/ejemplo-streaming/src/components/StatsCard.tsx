// Componente StatsCard mejorado
import React, { useEffect, useState } from 'react';
import { Stats } from '../types/index';
import { fetchStats } from '../utils/api';
import './StatsCard.css';

export const StatsCard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar estadísticas
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchStats()
      .then((data) => setStats(data))
      .catch(() => setError('Error al cargar estadísticas'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Cargando estadísticas...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stats) return <div className="error">No hay datos disponibles</div>;

  return (
    <div className="stats-container">
      <h2>📊 Estadísticas Generales</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📹</div>
          <h3>Total Videos</h3>
          <p className="stat-value">{stats.totalVideos}</p>
          <p className="stat-label">videos en plataforma</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <h3>Usuarios Activos</h3>
          <p className="stat-value">{stats.activeUsers}</p>
          <p className="stat-label">usuarios conectados</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <h3>Ocupación</h3>
          <p className="stat-value">{stats.occupancyPercentage}%</p>
          <p className="stat-label">capacidad utilizada</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <h3>Ingresos Hoy</h3>
          <p className="stat-value">${stats.todayRevenue}</p>
          <p className="stat-label">USD generados</p>
        </div>
      </div>
    </div>
  );
};
