// Componente principal Dashboard
import React from 'react';
import { ItemList } from './ItemList';
import { StatsCard } from './StatsCard';
import { RealTimeIndicator } from './RealTimeIndicator';

export const Dashboard: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>Dashboard Plataforma de Streaming</h1>
      <StatsCard />
      <RealTimeIndicator />
      <ItemList />
    </div>
  );
};
