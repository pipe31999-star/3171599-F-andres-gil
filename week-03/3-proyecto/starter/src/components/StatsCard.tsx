// Componente StatsCard - Estadísticas del Gimnasio
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
      <h2>📊 Estadísticas del Gimnasio</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {/* Card 1: Total de Miembros */}
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Total Miembros</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#2196F3' }}>
            {stats.totalMembers}
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#999' }}>
            miembros registrados
          </p>
        </div>

        {/* Card 2: Asistencias Hoy */}
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Asistencias Hoy</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#4CAF50' }}>
            {stats.attendanceToday}
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#999' }}>
            personas asistieron hoy
          </p>
        </div>

        {/* Card 3: Activos Ahora */}
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Activos Ahora</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#FF9800' }}>
            {stats.activeNow}
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#999' }}>
            usuarios en el gimnasio
          </p>
        </div>

        {/* Card 4: Ingresos Totales */}
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Ingresos</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#9C27B0' }}>
            ${stats.totalRevenue.toFixed(0)}
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#999' }}>
            ingresos hoy
          </p>
        </div>
      </div>
    </div>
  );
};
