// Funciones de API simuladas para plataforma de streaming
import { Video, Stats, RealTimeData } from '../types/index';

const MOCK_VIDEOS: Video[] = [
  { id: 1, title: 'La Gran Aventura', genre: 'Acción', duration: 120, views: 1500 },
  { id: 2, title: 'Comedia Familiar', genre: 'Comedia', duration: 90, views: 800 },
  { id: 3, title: 'Documental Naturaleza', genre: 'Documental', duration: 60, views: 500 },
];

const MOCK_STATS: Stats = {
  totalVideos: MOCK_VIDEOS.length,
  activeUsers: 320,
  occupancyPercentage: 85,
};

let currentViews = 1600;

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchVideos = async (signal?: AbortSignal): Promise<Video[]> => {
  await delay(1000);
  if (signal?.aborted) throw new Error('Aborted');
  return MOCK_VIDEOS;
};

export const fetchStats = async (): Promise<Stats> => {
  await delay(800);
  return MOCK_STATS;
};

export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  await delay(500);
  currentViews += Math.floor(Math.random() * 10); // Simula incremento
  return {
    currentViews,
    lastUpdated: new Date().toLocaleTimeString(),
  };
};
