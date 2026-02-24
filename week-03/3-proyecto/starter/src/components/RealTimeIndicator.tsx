// Componente RealTimeIndicator - Ocupación en tiempo real
import React, { useEffect, useState } from 'react';
import { RealTimeData } from '../types/index';
import { fetchRealTimeData } from '../utils/api';

export const RealTimeIndicator: React.FC = () => {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efecto principal: polling cada 5 segundos
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setError(null);
        const result = await fetchRealTimeData();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError('Error al obtener datos en tiempo real');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Llamada inicial inmediata
    fetchData();

    // Polling: actualizar cada 5 segundos
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup: detener el polling y marcar componente como desmontado
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  if (loading && !data) {
    return <div style={{ padding: '1rem' }}>⏳ Cargando datos en tiempo real...</div>;
  }

  if (error) {
    return <div style={{ padding: '1rem', color: 'red' }}>❌ {error}</div>;
  }

  if (!data) {
    return <div style={{ padding: '1rem' }}>Sin datos disponibles</div>;
  }

  // Determinar color según porcentaje de ocupación
  const getColor = (percentage: number): string => {
    if (percentage < 30) return '#4CAF50'; // Verde
    if (percentage < 70) return '#FF9800'; // Naranja
    return '#F44336'; // Rojo
  };

  const barColor = getColor(data.occupancyPercentage);

  return (
    <div
      style={{
        padding: '1.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #ddd',
        margin: '1rem 0',
      }}
    >
      <h2 style={{ margin: '0 0 1rem 0' }}>⏱️ Ocupación en Tiempo Real</h2>

      {/* Indicador principal */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            {data.currentOccupancy} / {data.maxCapacity} personas
          </span>
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: barColor,
            }}
          >
            {data.occupancyPercentage}%
          </span>
        </div>

        {/* Barra de progreso */}
        <div
          style={{
            width: '100%',
            height: '30px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${data.occupancyPercentage}%`,
              height: '100%',
              backgroundColor: barColor,
              transition: 'width 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.9rem',
            }}
          >
            {data.occupancyPercentage > 10 && `${data.occupancyPercentage}%`}
          </div>
        </div>
      </div>

      {/* Estado visual */}
      <div style={{ marginBottom: '1rem' }}>
        {data.occupancyPercentage < 30 && (
          <p style={{ margin: 0, color: '#4CAF50', fontWeight: 'bold' }}>
            ✅ Gimnasio con baja ocupación - Buen momento para entrenar
          </p>
        )}
        {data.occupancyPercentage >= 30 && data.occupancyPercentage < 70 && (
          <p style={{ margin: 0, color: '#FF9800', fontWeight: 'bold' }}>
            ⚠️ Ocupación moderada - Gimnasio funcional
          </p>
        )}
        {data.occupancyPercentage >= 70 && (
          <p style={{ margin: 0, color: '#F44336', fontWeight: 'bold' }}>
            🔴 Ocupación alta - Considere venir en otro momento
          </p>
        )}
      </div>

      {/* Timestamp */}
      <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
        🔄 Última actualización: {data.lastUpdated}
      </div>
    </div>
  );
};
