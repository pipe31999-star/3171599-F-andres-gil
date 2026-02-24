// Tipos para plataforma de streaming

export interface Video {
  id: number;
  title: string;
  genre: string;
  duration: number; // minutos
  views: number;
  // Puedes agregar más propiedades relevantes
}

export interface Stats {
  totalVideos: number;
  activeUsers: number;
  occupancyPercentage: number;
}

export interface RealTimeData {
  currentViews: number;
  lastUpdated: string;
}
