import React from 'react';

interface SortSelectorProps {
  criterio: string;
  setCriterio: (c: string) => void;
  ascendente: boolean;
  setAscendente: (a: boolean) => void;
}

export const SortSelector: React.FC<SortSelectorProps> = ({ criterio, setCriterio, ascendente, setAscendente }) => (
  <div className="sort-selector">
    <select value={criterio} onChange={e => setCriterio(e.target.value)}>
      <option value="titulo">Título</option>
      <option value="año">Año</option>
      <option value="popularidad">Popularidad</option>
    </select>
    <button onClick={() => setAscendente(!ascendente)}>
      {ascendente ? 'Ascendente' : 'Descendente'}
    </button>
  </div>
);
