import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Buscar por título, director, actores..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    {value && <button onClick={onClear}>Limpiar</button>}
  </div>
);
