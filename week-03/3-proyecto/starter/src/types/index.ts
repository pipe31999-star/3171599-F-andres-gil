// Tipos para el Dashboard del Gimnasio
// Dominio: 🏋️ Gimnasio

export interface Member {
  id: number;
  name: string;
  email: string;
  membershipType: 'basic' | 'premium' | 'vip';
  joinDate: string;
  isActive: boolean;
}

export interface Stats {
  totalMembers: number;
  attendanceToday: number;
  activeNow: number;
  totalRevenue: number;
}

export interface RealTimeData {
  currentOccupancy: number;
  maxCapacity: number;
  occupancyPercentage: number;
  lastUpdated: string;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
