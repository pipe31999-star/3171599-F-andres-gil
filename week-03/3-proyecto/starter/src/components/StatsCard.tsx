// Componente StatsCard para métricas
import React, { useEffect, useState } from 'react';
import { Stats } from '../types/index';
import { fetchStats } from '../utils/api';

export const StatsCard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchStats()
      .then((data) => setStats(data))
      .catch((err) => setError('Error al cargar estadísticas'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando estadísticas...</div>;
  if (error) return <div>{error}</div>;
  if (!stats) return <div>No hay datos disponibles</div>;

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div className="card">
        <h3>Total Videos</h3>
        <p>{stats.totalVideos} videos</p>
      </div>
      <div className="card">
        <h3>Usuarios Activos</h3>
        <p>{stats.activeUsers} usuarios</p>
      </div>
      <div className="card">
        <h3>Ocupación</h3>
        <p>{stats.occupancyPercentage}%</p>
      </div>
    </div>
  );
};
