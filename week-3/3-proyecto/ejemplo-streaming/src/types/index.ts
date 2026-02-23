// Tipos completos para la plataforma de streaming
export interface Video {
  id: number;
  title: string;
  genre: string;
  duration: number;
  views: number;
  rating: number;
  thumbnail: string;
}

export interface Stats {
  totalVideos: number;
  activeUsers: number;
  occupancyPercentage: number;
  todayRevenue: number;
}

export interface RealTimeData {
  currentViews: number;
  activeStreams: number;
  lastUpdated: string;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
