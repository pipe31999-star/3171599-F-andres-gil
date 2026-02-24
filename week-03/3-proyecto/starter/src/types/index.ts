// Tipos para el Dashboard de Streaming de Video
// Dominio: 🎬 Plataforma de Streaming de Video

export interface Video {
  id: number;
  title: string;
  genre: string;
  duration: number;
  views: number;
  rating: number;
  releaseDate: string;
  isNew: boolean;
}

export interface Stats {
  totalVideos: number;
  activeUsers: number;
  viewsToday: number;
  totalRevenue: number;
}

export interface RealTimeData {
  currentViews: number;
  activeStreams: number;
  peakViewersPercentage: number;
  lastUpdated: string;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
