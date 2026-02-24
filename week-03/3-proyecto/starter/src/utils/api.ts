// Funciones de API para el Dashboard de Streaming de Video
import { Video, Stats, RealTimeData } from '../types/index';

// Datos mock de videos en la plataforma
const MOCK_VIDEOS: Video[] = [
  {
    id: 1,
    title: 'La Gran Aventura',
    genre: 'Acción',
    duration: 120,
    views: 15420,
    rating: 8.5,
    releaseDate: '2024-01-15',
    isNew: false,
  },
  {
    id: 2,
    title: 'Comedia Familiar',
    genre: 'Comedia',
    duration: 95,
    views: 8900,
    rating: 7.2,
    releaseDate: '2024-02-10',
    isNew: true,
  },
  {
    id: 3,
    title: 'Documental Naturaleza',
    genre: 'Documental',
    duration: 60,
    views: 12350,
    rating: 9.1,
    releaseDate: '2024-01-20',
    isNew: false,
  },
  {
    id: 4,
    title: 'Drama Histórico',
    genre: 'Drama',
    duration: 150,
    views: 21500,
    rating: 8.8,
    releaseDate: '2023-12-01',
    isNew: false,
  },
  {
    id: 5,
    title: 'Thriller Psicológico',
    genre: 'Thriller',
    duration: 110,
    views: 18900,
    rating: 8.3,
    releaseDate: '2024-02-05',
    isNew: true,
  },
];

// Simular latencia de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch de videos de la plataforma
export const fetchVideos = async (signal?: AbortSignal): Promise<Video[]> => {
  await delay(1200);
  if (signal?.aborted) throw new Error('Solicitud cancelada');
  return MOCK_VIDEOS;
};

// Fetch de estadísticas de streaming
export const fetchStats = async (): Promise<Stats> => {
  await delay(800);
  return {
    totalVideos: MOCK_VIDEOS.length,
    activeUsers: Math.floor(Math.random() * 5000) + 1000,
    viewsToday: Math.floor(Math.random() * 100000) + 50000,
    totalRevenue: 28500 + Math.random() * 12000,
  };
};

// Fetch de datos en tiempo real (visualizaciones activas)
let currentViews = 3200;
export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  await delay(400);
  // Simular cambio de visualizaciones
  currentViews += Math.floor(Math.random() * 50) - 10;
  currentViews = Math.max(0, currentViews);
  
  const maxViewers = 5000;
  const peakViewersPercentage = Math.round((currentViews / maxViewers) * 100);
  
  return {
    currentViews,
    activeStreams: Math.floor(Math.random() * 15) + 3,
    peakViewersPercentage,
    lastUpdated: new Date().toLocaleTimeString('es-ES'),
  };
};

// Búsqueda de videos (opcional)
export const searchVideos = async (query: string): Promise<Video[]> => {
  await delay(600);
  return MOCK_VIDEOS.filter(
    (video) =>
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.genre.toLowerCase().includes(query.toLowerCase())
  );
};
