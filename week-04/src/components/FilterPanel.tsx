import React from 'react';

interface FilterPanelProps {
  genero: string;
  setGenero: (g: string) => void;
  tipo: string;
  setTipo: (t: string) => void;
  disponible: boolean;
  setDisponible: (d: boolean) => void;
  añoMin: number;
  añoMax: number;
  setAñoMin: (n: number) => void;
  setAñoMax: (n: number) => void;
  limpiarFiltros: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  genero, setGenero, tipo, setTipo, disponible, setDisponible, añoMin, añoMax, setAñoMin, setAñoMax, limpiarFiltros
}) => (
  <div className="filter-panel">
    <select value={genero} onChange={e => setGenero(e.target.value)}>
      <option value="">Todos los géneros</option>
      <option value="Acción">Acción</option>
      <option value="Drama">Drama</option>
      <option value="Ciencia">Ciencia</option>
      <option value="Aventura">Aventura</option>
      <option value="Comedia">Comedia</option>
      <option value="Historia">Historia</option>
    </select>
    <select value={tipo} onChange={e => setTipo(e.target.value)}>
      <option value="">Todos los tipos</option>
      <option value="película">Película</option>
      <option value="serie">Serie</option>
      <option value="documental">Documental</option>
    </select>
    <label>
      <input type="checkbox" checked={disponible} onChange={e => setDisponible(e.target.checked)} />
      Solo disponibles
    </label>
    <label>
      Año mínimo:
      <input type="number" value={añoMin} onChange={e => setAñoMin(Number(e.target.value))} />
    </label>
    <label>
      Año máximo:
      <input type="number" value={añoMax} onChange={e => setAñoMax(Number(e.target.value))} />
    </label>
    <button onClick={limpiarFiltros}>Limpiar filtros</button>
  </div>
);
