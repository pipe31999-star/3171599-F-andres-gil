// Componente RealTimeIndicator mejorado
import React, { useEffect, useState } from 'react';
import { RealTimeData } from '../types/index';
import { fetchRealTimeData } from '../utils/api';
import './RealTimeIndicator.css';

export const RealTimeIndicator: React.FC = () => {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchRealTimeData();
        if (isMounted) setData(res);
      } catch (err) {
        if (isMounted) setError('Error en tiempo real');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Llamada inicial
    fetchData();

    // Polling cada 5 segundos
    const intervalId = setInterval(fetchData, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  if (loading) return <div className="loading">Cargando datos en tiempo real...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="realtime-indicator">
      <h2>⚡ Actividad en Tiempo Real</h2>
      <div className="realtime-grid">
        <div className="realtime-card">
          <div className="realtime-value">{data?.currentViews}</div>
          <div className="realtime-label">Visualizaciones activas</div>
          <div className="pulse"></div>
        </div>

        <div className="realtime-card">
          <div className="realtime-value">{data?.activeStreams}</div>
          <div className="realtime-label">Streams activos</div>
          <div className="pulse"></div>
        </div>
      </div>
      <div className="last-updated">
        🕐 Última actualización: {data?.lastUpdated}
      </div>
    </div>
  );
};
