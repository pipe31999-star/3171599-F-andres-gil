import React from 'react';
import { Video } from '../types';

interface ItemCardProps {
  video: Video;
  onViewDetails: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ video, onViewDetails, onDelete }) => (
  <div className="item-card">
    <img src={video.imagen} alt={video.titulo} />
    <h3>{video.titulo}</h3>
    <p><strong>{video.tipo}</strong> | {video.genero} | {video.año}</p>
    <p><strong>Director:</strong> {video.director}</p>
    <p><strong>Actores:</strong> {video.actores.join(', ')}</p>
    <div className="badges">
      <span className={`badge ${video.disponible ? 'disponible' : 'agotado'}`}>
        {video.disponible ? '✓ Disponible' : '✗ No disponible'}
      </span>
      <span className="badge popularidad">⭐ {video.popularidad}/100</span>
    </div>
    <div className="actions">
      <button onClick={() => onViewDetails(video.id)}>Ver detalles</button>
      <button onClick={() => onDelete(video.id)}>Eliminar</button>
    </div>
  </div>
);
