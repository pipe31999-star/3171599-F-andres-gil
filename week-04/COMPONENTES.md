# Documentación Técnica de Componentes

## 📋 Tipos e Interfaces

### Video Interface
```typescript
interface Video {
  id: string;                    // ID único del video
  titulo: string;                // Título del video
  tipo: 'película' | 'serie' | 'documental';  // Tipo de contenido
  genero: string;                // Género (Acción, Drama, etc.)
  año: number;                   // Año de lanzamiento
  director: string;              // Nombre del director
  actores: string[];             // Lista de actores principales
  disponible: boolean;           // Disponibilidad para reproducción
  popularidad: number;           // Puntuación de popularidad (1-100)
  imagen: string;                // URL de la imagen de portada
}
```

## 🧩 Componentes

### Catalog.tsx (Componente Principal)
Maneja toda la lógica de filtrado, búsqueda, ordenamiento y renderizado.

**Estado Local:**
```typescript
const [loading, setLoading] = useState(false);      // Estado de carga
const [error, setError] = useState('');             // Mensajes de error
const [search, setSearch] = useState('');           // Texto de búsqueda
const [genero, setGenero] = useState('');           // Filtro de género
const [tipo, setTipo] = useState('');               // Filtro de tipo
const [disponible, setDisponible] = useState(false); // Filtro booleano
const [añoMin, setAñoMin] = useState(2000);        // Año mínimo
const [añoMax, setAñoMax] = useState(2026);        // Año máximo
const [criterio, setCriterio] = useState('titulo'); // Criterio de orden
const [ascendente, setAscendente] = useState(true); // Dirección de orden
```

**Métodos Principales:**
- `filtered`: useMemo que aplica todas las transformaciones (filtros, búsqueda, orden)
- `limpiarFiltros()`: Reinicia todos los filtros a valores por defecto
- `limpiarBusqueda()`: Limpia el input de búsqueda
- `onViewDetails()`: Handler para ver detalles de un video
- `onDelete()`: Handler para eliminar un video

**Render Condicional:**
- Muestra LoadingSpinner si `loading === true`
- Muestra EmptyState si `error` no está vacío
- Muestra EmptyState si `filtered.length === 0`
- Muestra ItemList si hay resultados

---

### ItemCard.tsx
Componente de presentación para una tarjeta individual de video.

**Props:**
```typescript
interface ItemCardProps {
  video: Video;                          // Objeto video a mostrar
  onViewDetails: (id: string) => void;  // Callback para ver detalles
  onDelete: (id: string) => void;       // Callback para eliminar
}
```

**Características:**
- Muestra imagen del video
- Badge condicional: "✓ Disponible" o "✗ No disponible"
- Indicador de popularidad: "⭐ 85/100"
- Botones de acciones (Ver detalles, Eliminar)
- Hover effect con sombra animada

---

### ItemList.tsx
Contenedor que renderiza múltiples ItemCards en un grid.

**Props:**
```typescript
interface ItemListProps {
  videos: Video[];                       // Array de videos
  onViewDetails: (id: string) => void;  // Callback de detalles
  onDelete: (id: string) => void;       // Callback de eliminar
}
```

**Características:**
- Usa `.map()` para iterar y renderizar ItemCards
- Usa `video.id` como key (no index)
- Layout CSS Grid responsive
- Se adapta a diferentes tamaños de pantalla

---

### SearchBar.tsx
Componente de entrada para búsqueda en tiempo real.

**Props:**
```typescript
interface SearchBarProps {
  value: string;                    // Valor actual del input
  onChange: (value: string) => void; // Handler de cambios
  onClear: () => void;              // Handler para limpiar
}
```

**Características:**
- Input de texto con placeholder
- Botón de limpiar (solo visible si hay texto)
- Busca en título, director y actores (case-insensitive)

---

### FilterPanel.tsx
Panel con múltiples opciones de filtrado.

**Props:**
```typescript
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
```

**Filtros Disponibles:**
1. **Género**: Select con géneros (Acción, Drama, Ciencia, etc.)
2. **Tipo**: Select con tipos (Película, Serie, Documental)
3. **Solo disponibles**: Checkbox booleano
4. **Rango de año**: Dos inputs numéricos (mín y máx)
5. **Limpiar filtros**: Button para resetear todo

---

### SortSelector.tsx
Componente para ordenamiento de resultados.

**Props:**
```typescript
interface SortSelectorProps {
  criterio: string;                    // Criterio actual
  setCriterio: (c: string) => void;    // Handler de cambio
  ascendente: boolean;                 // Dirección (true = ↑, false = ↓)
  setAscendente: (a: boolean) => void; // Handler de dirección
}
```

**Criterios Disponibles:**
- `titulo`: Ordena alfabéticamente por título
- `año`: Ordena numéricamente por año
- `popularidad`: Ordena numéricamente por popularidad (1-100)

**Dirección:**
- Ascendente (A-Z, 0-100)
- Descendente (Z-A, 100-0)

---

### LoadingSpinner.tsx
Componente simple para indicador de carga.

**Props:** Ninguno

**Renderizado:** Muestra "Cargando..." con spinner

---

### EmptyState.tsx
Componente para mostrar cuando no hay resultados.

**Props:**
```typescript
interface EmptyStateProps {
  mensaje?: string;  // Mensaje personalizado (opcional)
}
```

**Comportamiento:**
- Si `mensaje` es undefined, muestra "No hay resultados."
- Si `mensaje` tiene valor, lo muestra

---

## 🎣 Hooks Personalizados

### useDebounce
Hook que implementa debouncing para valores.

```typescript
function useDebounce<T>(value: T, delay: number): T
```

**Parámetros:**
- `value`: Valor a debounce
- `delay`: Tiempo en ms (recomendado: 300)

**Retorna:** Valor debouncido

**Uso en Catalog.tsx:**
```typescript
const debouncedSearch = useDebounce(search, 300);
```

**Por qué es importante:**
- Evita re-render en cada keystroke
- Reduce operaciones de filtrado innecesarias
- Mejora rendimiento general

---

## 🔍 Lógica de Filtrado y Búsqueda

### Pipeline de Transformación

```javascript
1. items (array original)
   ↓
2. Filtro por género (si está seleccionado)
   ↓
3. Filtro por tipo (si está seleccionado)
   ↓
4. Filtro por disponibilidad (si está activado)
   ↓
5. Filtro por rango de año
   ↓
6. Búsqueda (en título, director, actores) - case-insensitive
   ↓
7. Ordenamiento (sin mutar array original)
   ↓
8. Resultado final → render en ItemList
```

### Búsqueda Multicanal
```typescript
const search = debouncedSearch.toLowerCase();
result = result.filter(v =>
  v.titulo.toLowerCase().includes(search) ||                    // Título
  v.director.toLowerCase().includes(search) ||                  // Director
  v.actores.some(a => a.toLowerCase().includes(search))        // Actores
);
```

### Ordenamiento Sin Mutación
```typescript
result = result.sort((a, b) => {
  let cmp = 0;
  if (criterio === 'titulo') cmp = a.titulo.localeCompare(b.titulo);
  else if (criterio === 'año') cmp = a.año - b.año;
  else if (criterio === 'popularidad') cmp = a.popularidad - b.popularidad;
  return ascendente ? cmp : -cmp;  // Invierte si descendente
});
```

---

## 📊 Variables Derivadas (useMemo)

El componente Catalog usa `useMemo` para calcular la lista filtrada:

```typescript
const filtered = useMemo(() => {
  // ... lógica de filtrado ...
  return result;
}, [genero, tipo, disponible, añoMin, añoMax, debouncedSearch, criterio, ascendente]);
```

**Dependencias:**
Recalcula solo cuando cambia alguno de:
- Género, Tipo, Disponibilidad
- Rango de año
- Búsqueda (debouncida)
- Criterio o dirección de orden

---

## 🎯 Rendimiento

### Optimizaciones Implementadas

1. **useDebounce**: Reduce cálculos de búsqueda
2. **useMemo**: Evita recalcular filtros innecesariamente
3. **Keys únicas**: React puede trackear items correctamente
4. **Componentes pequeños**: Cada componente tiene una responsabilidad
5. **No mutamos arrays**: Usamos spread operator `[...items]`

### Complejidad

- **Búsqueda**: O(n) - itera el array una vez
- **Filtrado**: O(n) - itera el array una vez
- **Ordenamiento**: O(n log n) - algoritmo de sort
- **Total**: O(n log n) por cada cambio en las dependencias

---

## 🧪 Testing (Recomendaciones)

```typescript
// Test para ItemCard
test('muestra badges correctamente', () => {
  const video = { ...mockVideo, disponible: true };
  render(<ItemCard video={video} {...props} />);
  expect(screen.getByText('✓ Disponible')).toBeInTheDocument();
});

// Test para filtrado
test('filtra por género correctamente', () => {
  // Simula cambio de género y verifica resultado
});

// Test para búsqueda
test('búsqueda case-insensitive funciona', () => {
  // Busca "acción" y debe encontrar "Acción"
});
```

---

## 📱 Responsive Design

### Media Queries

```css
/* Desktop: default */
.item-list {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

/* Tablet/Mobile (< 768px) */
@media (max-width: 768px) {
  .item-list {
    grid-template-columns: 1fr;
  }
  /* Botones apilados */
  .item-card .actions {
    flex-direction: column;
  }
}
```

---

## 🔐 Tipado TypeScript

El proyecto utiliza tipado estricto (sin `any`):

```typescript
// ✓ Bien tipado
const items: Video[] = [...];
const filtered: Video[] = items.filter(...);

// ✗ Evitar
const items: any = [...];
```

---

¡Ahora ya conoces la estructura interna del catálogo!
