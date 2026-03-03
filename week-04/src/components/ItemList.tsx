import React from 'react';
import { Video } from '../types';
import { ItemCard } from './ItemCard';

interface ItemListProps {
  videos: Video[];
  onViewDetails: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ItemList: React.FC<ItemListProps> = ({ videos, onViewDetails, onDelete }) => (
  <div className="item-list">
    {videos.map(video => (
      <ItemCard key={video.id} video={video} onViewDetails={onViewDetails} onDelete={onDelete} />
    ))}
  </div>
);
