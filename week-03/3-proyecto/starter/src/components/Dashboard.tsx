// Componente principal Dashboard
import React from 'react';
import { ItemList } from './ItemList';
import { StatsCard } from './StatsCard';
import { RealTimeIndicator } from './RealTimeIndicator';

export const Dashboard: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fafafa',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
          🎬 Dashboard de Streaming
        </h1>
        <p style={{ margin: 0, color: '#666' }}>
          Plataforma de streaming de video | Entretenimiento y Medios
        </p>
      </header>

      {/* Indicador en tiempo real (destacado) */}
      <div style={{ marginBottom: '2rem' }}>
        <RealTimeIndicator />
      </div>

      {/* Estadísticas */}
      <div style={{ marginBottom: '2rem' }}>
        <StatsCard />
      </div>

      {/* Lista de miembros */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1rem' }}>
        <ItemList />
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: '3rem',
          paddingTop: '1rem',
          borderTop: '1px solid #ddd',
          textAlign: 'center',
          color: '#999',
          fontSize: '0.9rem',
        }}
      >
        <p>Dashboard del Gimnasio © 2025 - Desarrollado con React y TypeScript</p>
      </footer>
    </div>
  );
};
