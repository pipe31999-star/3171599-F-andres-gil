// Componente ItemList - Lista de miembros del gimnasio
import React, { useEffect, useState } from 'react';
import { Member } from '../types/index';
import { fetchMembers, searchMembers } from '../utils/api';

export const ItemList: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch inicial de miembros
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchMembers(controller.signal)
      .then(setMembers)
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Error al cargar miembros del gimnasio');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  // Efecto de búsqueda/filtrado
  useEffect(() => {
    if (!searchTerm) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const performSearch = async () => {
      try {
        const results = await searchMembers(searchTerm);
        setMembers(results);
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          setError('Error en la búsqueda');
        }
      } finally {
        setLoading(false);
      }
    };

    // Debounce: esperar 500ms después de dejar de escribir
    const timeoutId = setTimeout(performSearch, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (loading && members.length === 0) {
    return <div style={{ padding: '1rem' }}>⏳ Cargando miembros...</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>👥 Miembros del Gimnasio</h2>

      {/* Barra de búsqueda */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem',
            width: '100%',
            maxWidth: '400px',
            marginRight: '0.5rem',
          }}
        />
        {searchTerm && (
          <button onClick={handleClearSearch} style={{ padding: '0.5rem 1rem' }}>
            Limpiar
          </button>
        )}
      </div>

      {error && <div style={{ color: 'red' }}>❌ {error}</div>}

      {loading && members.length > 0 && (
        <div style={{ color: 'gray' }}>Actualizando...</div>
      )}

      {members.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Nombre</th>
              <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Membresía</th>
              <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  {member.name}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  {member.email}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  {member.membershipType.charAt(0).toUpperCase() +
                    member.membershipType.slice(1)}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                  {member.isActive ? '✅ Activo' : '❌ Inactivo'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ color: 'gray' }}>No hay miembros para mostrar</div>
      )}
    </div>
  );
};
