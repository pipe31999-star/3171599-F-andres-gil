// API simulada mejorada con más datos
import { Video, Stats, RealTimeData } from '../types/index';

const MOCK_VIDEOS: Video[] = [
  {
    id: 1,
    title: 'La Gran Aventura',
    genre: 'Acción',
    duration: 120,
    views: 1500,
    rating: 8.5,
    thumbnail: '🎬',
  },
  {
    id: 2,
    title: 'Comedia Familiar',
    genre: 'Comedia',
    duration: 90,
    views: 800,
    rating: 7.2,
    thumbnail: '😂',
  },
  {
    id: 3,
    title: 'Documental Naturaleza',
    genre: 'Documental',
    duration: 60,
    views: 500,
    rating: 9.1,
    thumbnail: '🌿',
  },
  {
    id: 4,
    title: 'Drama Histórico',
    genre: 'Drama',
    duration: 150,
    views: 2100,
    rating: 8.8,
    thumbnail: '🎭',
  },
];

let currentViews = 1600;
let activeStreams = 42;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchVideos = async (signal?: AbortSignal): Promise<Video[]> => {
  await delay(1000);
  if (signal?.aborted) throw new Error('Aborted');
  return MOCK_VIDEOS;
};

export const fetchStats = async (): Promise<Stats> => {
  await delay(800);
  return {
    totalVideos: MOCK_VIDEOS.length,
    activeUsers: 320 + Math.floor(Math.random() * 50),
    occupancyPercentage: 85 + Math.floor(Math.random() * 10),
    todayRevenue: 12450,
  };
};

export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  await delay(500);
  currentViews += Math.floor(Math.random() * 15);
  activeStreams += Math.floor(Math.random() * 3) - 1;
  return {
    currentViews,
    activeStreams: Math.max(0, activeStreams),
    lastUpdated: new Date().toLocaleTimeString('es-ES'),
  };
};

export const searchVideos = async (query: string): Promise<Video[]> => {
  await delay(500);
  return MOCK_VIDEOS.filter((v) =>
    v.title.toLowerCase().includes(query.toLowerCase()) ||
    v.genre.toLowerCase().includes(query.toLowerCase())
  );
};
