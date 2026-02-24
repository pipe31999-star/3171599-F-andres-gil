// Funciones de API para el Dashboard del Gimnasio
import { Member, Stats, RealTimeData } from '../types/index';

// Datos mock de miembros del gimnasio
const MOCK_MEMBERS: Member[] = [
  {
    id: 1,
    name: 'Carlos López',
    email: 'carlos@example.com',
    membershipType: 'premium',
    joinDate: '2023-01-15',
    isActive: true,
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria@example.com',
    membershipType: 'vip',
    joinDate: '2022-06-20',
    isActive: true,
  },
  {
    id: 3,
    name: 'Juan Martínez',
    email: 'juan@example.com',
    membershipType: 'basic',
    joinDate: '2024-01-10',
    isActive: true,
  },
  {
    id: 4,
    name: 'Ana Rodríguez',
    email: 'ana@example.com',
    membershipType: 'premium',
    joinDate: '2023-05-08',
    isActive: false,
  },
  {
    id: 5,
    name: 'Pedro Sánchez',
    email: 'pedro@example.com',
    membershipType: 'basic',
    joinDate: '2024-02-01',
    isActive: true,
  },
];

// Simular latencia de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch de miembros del gimnasio
export const fetchMembers = async (signal?: AbortSignal): Promise<Member[]> => {
  await delay(1200);
  if (signal?.aborted) throw new Error('Solicitud cancelada');
  return MOCK_MEMBERS;
};

// Fetch de estadísticas del gimnasio
export const fetchStats = async (): Promise<Stats> => {
  await delay(800);
  return {
    totalMembers: MOCK_MEMBERS.length,
    attendanceToday: Math.floor(Math.random() * 30) + 15,
    activeNow: Math.floor(Math.random() * 25) + 5,
    totalRevenue: 12500 + Math.random() * 5000,
  };
};

// Fetch de datos en tiempo real (ocupación actual)
let currentOccupancy = 18;
export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  await delay(400);
  // Simular cambio de ocupación
  currentOccupancy += Math.floor(Math.random() * 5) - 2;
  currentOccupancy = Math.max(0, Math.min(50, currentOccupancy));
  
  const maxCapacity = 50;
  const occupancyPercentage = Math.round((currentOccupancy / maxCapacity) * 100);
  
  return {
    currentOccupancy,
    maxCapacity,
    occupancyPercentage,
    lastUpdated: new Date().toLocaleTimeString('es-ES'),
  };
};

// Búsqueda de miembros (opcional)
export const searchMembers = async (query: string): Promise<Member[]> => {
  await delay(600);
  return MOCK_MEMBERS.filter(
    (member) =>
      member.name.toLowerCase().includes(query.toLowerCase()) ||
      member.email.toLowerCase().includes(query.toLowerCase())
  );
};
