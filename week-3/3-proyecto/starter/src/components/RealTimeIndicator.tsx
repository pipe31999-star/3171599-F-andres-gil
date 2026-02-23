// Componente RealTimeIndicator para visualizaciones en tiempo real
import React, { useEffect, useState } from 'react';
import { fetchRealTimeData } from '../utils/api';
import { RealTimeData } from '../types/index';

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
        setError('Error en tiempo real');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  if (loading) return <div>Cargando datos en tiempo real...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Visualizaciones en Tiempo Real</h3>
      <p>{data?.currentViews} views</p>
      <small>Última actualización: {data?.lastUpdated}</small>
    </div>
  );
};
