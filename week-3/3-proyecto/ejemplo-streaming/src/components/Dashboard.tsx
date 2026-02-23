// Componente Dashboard mejorado
import React from 'react';
import { ItemList } from './ItemList';
import { StatsCard } from './StatsCard';
import { RealTimeIndicator } from './RealTimeIndicator';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🎬 Dashboard Plataforma de Streaming</h1>
        <p>Monitor en tiempo real de tu contenido y usuarios</p>
      </header>

      <section className="dashboard-section">
        <StatsCard />
      </section>

      <section className="dashboard-section">
        <RealTimeIndicator />
      </section>

      <section className="dashboard-section">
        <ItemList />
      </section>
    </div>
  );
};
