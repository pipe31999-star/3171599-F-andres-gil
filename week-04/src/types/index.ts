export interface Video {
  id: string;
  titulo: string;
  tipo: 'película' | 'serie' | 'documental';
  genero: string;
  año: number;
  director: string;
  actores: string[];
  disponible: boolean;
  popularidad: number; // 1-100
  imagen: string;
}
