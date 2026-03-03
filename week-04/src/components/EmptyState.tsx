import React from 'react';

export const EmptyState: React.FC<{ mensaje?: string }> = ({ mensaje }) => (
  <div className="empty-state">
    <span>{mensaje || 'No hay resultados.'}</span>
  </div>
);
