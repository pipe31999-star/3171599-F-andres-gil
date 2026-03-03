import React, { useState, useMemo } from 'react';
import { items } from '../data/items';
import { ItemList } from './ItemList';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { SortSelector } from './SortSelector';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';
import { useDebounce } from '../hooks/useDebounce';

export const Catalog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [genero, setGenero] = useState('');
  const [tipo, setTipo] = useState('');
  const [disponible, setDisponible] = useState(false);
  const [añoMin, setAñoMin] = useState(2000);
  const [añoMax, setAñoMax] = useState(2026);
  const [criterio, setCriterio] = useState('titulo');
  const [ascendente, setAscendente] = useState(true);

  const debouncedSearch = useDebounce(search, 300);

  // Filtrado, búsqueda y ordenamiento
  const filtered = useMemo(() => {
    let result = [...items];
    if (genero) result = result.filter(v => v.genero === genero);
    if (tipo) result = result.filter(v => v.tipo === tipo);
    if (disponible) result = result.filter(v => v.disponible);
    result = result.filter(v => v.año >= añoMin && v.año <= añoMax);
    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase();
      result = result.filter(v =>
        v.titulo.toLowerCase().includes(s) ||
        v.director.toLowerCase().includes(s) ||
        v.actores.some(a => a.toLowerCase().includes(s))
      );
    }
    // Ordenamiento
    result = result.sort((a, b) => {
      let cmp = 0;
      if (criterio === 'titulo') cmp = a.titulo.localeCompare(b.titulo);
      else if (criterio === 'año') cmp = a.año - b.año;
      else if (criterio === 'popularidad') cmp = a.popularidad - b.popularidad;
      return ascendente ? cmp : -cmp;
    });
    return result;
  }, [genero, tipo, disponible, añoMin, añoMax, debouncedSearch, criterio, ascendente]);

  const limpiarFiltros = () => {
    setGenero('');
    setTipo('');
    setDisponible(false);
    setAñoMin(2000);
    setAñoMax(2026);
  };

  const limpiarBusqueda = () => setSearch('');

  const onViewDetails = (id: string) => {
    alert('Ver detalles de ' + id);
  };
  const onDelete = (id: string) => {
    alert('Eliminar ' + id);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <EmptyState mensaje={error} />;

  return (
    <div className="catalog">
      <h2>Catálogo de Videos</h2>
      <SearchBar value={search} onChange={setSearch} onClear={limpiarBusqueda} />
      <FilterPanel
        genero={genero} setGenero={setGenero}
        tipo={tipo} setTipo={setTipo}
        disponible={disponible} setDisponible={setDisponible}
        añoMin={añoMin} añoMax={añoMax} setAñoMin={setAñoMin} setAñoMax={setAñoMax}
        limpiarFiltros={limpiarFiltros}
      />
      <SortSelector criterio={criterio} setCriterio={setCriterio} ascendente={ascendente} setAscendente={setAscendente} />
      <div className="result-count">Resultados: {filtered.length}</div>
      {filtered.length === 0 ? <EmptyState /> : <ItemList videos={filtered} onViewDetails={onViewDetails} onDelete={onDelete} />}
    </div>
  );
};
