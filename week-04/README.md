# Catálogo Interactivo de Plataforma Streaming de Video

## 🎯 Descripción del Proyecto

Este proyecto implementa un **catálogo interactivo de videos** para una plataforma de streaming, adaptado al dominio de **Entretenimiento y Medios**. El catálogo incluye funcionalidades avanzadas de filtrado, búsqueda en tiempo real, ordenamiento y renderizado condicional, todo construido con **React 18**, **TypeScript** y **Vite**.

### Dominio Asignado
- **Tipo**: Plataforma de streaming de video
- **Categoría**: Entretenimiento y Medios
- **Entidad Principal**: Video (películas, series, documentales)

## 📋 Características Implementadas

### 1. **Renderizado Condicional**
✓ Indicador de carga animado  
✓ Mensajes de error personalizados  
✓ Estado vacío cuando no hay resultados  
✓ Contador de resultados en tiempo real  
✓ Badges condicionales (Disponible/No disponible)  
✓ Indicador de popularidad visual  

### 2. **Listas con Keys Únique**
✓ Renderizado de listas con `.map()` usando **id único como key**  
✓ Componente `ItemCard` extraído y reutilizable  
✓ Componente `ItemList` que gestiona el renderizado de múltiples items  
✓ Acciones por ítem: Ver detalles, Eliminar  

### 3. **Filtrado Múltiple**
✓ Filtro por **género** (Acción, Drama, Ciencia, Aventura, Comedia, Historia)  
✓ Filtro por **tipo** (Película, Serie, Documental)  
✓ Filtro **booleano** (Solo disponibles)  
✓ Filtro por **rango de año** (mínimo y máximo)  
✓ Botón para **limpiar todos los filtros**  

### 4. **Ordenamiento Sin Mutación**
✓ Selector de criterios: Título, Año, Popularidad  
✓ Botón para alternar entre **ascendente/descendente**  
✓ El array original **nunca se muta** (uso de `[...items]`)  

### 5. **Búsqueda en Tiempo Real**
✓ Input de búsqueda **case-insensitive**  
✓ Búsqueda en múltiples campos: Título, Director, Actores  
✓ **Debounce de 300ms** para optimizar rendimiento  
✓ Botón para limpiar búsqueda  

### 6. **Adaptación al Dominio**
✓ Entidades con propiedades reales: título, tipo, género, año, director, actores, disponibilidad, popularidad  
✓ Datos mock con 10 videos variados (películas, series, documentales)  
✓ Diseño temático para plataforma de streaming  

## 📂 Estructura del Proyecto

```
proyecto-catalogo/
├── src/
│   ├── components/
│   │   ├── Catalog.tsx           # Componente principal (lógica)
│   │   ├── ItemCard.tsx          # Tarjeta individual de video
│   │   ├── ItemList.tsx          # Grid de videos
│   │   ├── SearchBar.tsx         # Barra de búsqueda
│   │   ├── FilterPanel.tsx       # Panel de filtros
│   │   ├── SortSelector.tsx      # Selector de ordenamiento
│   │   ├── EmptyState.tsx        # Mensaje de sin resultados
│   │   └── LoadingSpinner.tsx    # Indicador de carga
│   ├── types/
│   │   └── index.ts              # Interfaz Video y tipos
│   ├── data/
│   │   └── items.ts              # Datos mock (10 videos)
│   ├── hooks/
│   │   └── useDebounce.ts        # Hook con debounce
│   ├── App.tsx                   # Componente raíz
│   ├── main.tsx                  # Punto de entrada
│   └── index.css                 # Estilos globales
├── index.html                    # HTML principal
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| React | 18.3.1 | Framework UI |
| TypeScript | 4.9.5 | Tipado estático |
| Vite | 4.5.14 | Bundler y dev server |
| CSS | 3 | Estilos con Grid y Flexbox |

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js 16+ instalado
- pnpm instalado (`npm install -g pnpm`)

### Pasos de Instalación

```bash
# 1. Navegar al directorio del proyecto
cd proyecto-catalogo

# 2. Instalar dependencias
pnpm install

# 3. Iniciar servidor de desarrollo
pnpm dev

# 4. Abrir navegador
# El servidor estará disponible en http://localhost:5173/
```

### Comandos Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia servidor con hot reload

# Producción
pnpm build        # Construye para producción
pnpm preview      # Previsualiza build de producción
```

## 📊 Propiedades de la Entidad Video

```typescript
interface Video {
  id: string;              // Identificador único
  titulo: string;          // Nombre del video
  tipo: 'película' | 'serie' | 'documental';  // Tipo de contenido
  genero: string;          // Género (Acción, Drama, etc.)
  año: number;             // Año de lanzamiento
  director: string;        // Nombre del director
  actores: string[];       // Array de actores principales
  disponible: boolean;     // Si está disponible para ver
  popularidad: number;     // Puntuación 1-100
  imagen: string;          // URL de la imagen de portada
}
```

## 🎨 Características de Diseño

- **Responsive**: Adaptable a móvil, tablet y desktop
- **Tema Moderno**: Gradiente purpura/azul con colores vibrantes
- **Card-Based**: Layout de tarjetas con hover effects
- **Accesibilidad**: Inputs y botones bien estructurados
- **Animaciones**: Transiciones suaves en cards y botones

## ✅ Criterios de Evaluación Cumplidos

| Criterio | Puntaje | Estado |
|----------|---------|--------|
| Renderizado condicional | 15% | ✓ Cumplido |
| Keys únicas y componentes | 15% | ✓ Cumplido |
| Filtrado funcional | 20% | ✓ Cumplido |
| Ordenamiento sin mutación | 15% | ✓ Cumplido |
| Búsqueda en tiempo real | 15% | ✓ Cumplido |
| Adaptación al dominio | 10% | ✓ Cumplido |
| Calidad del código | 10% | ✓ Cumplido |

## 🔍 Ejemplo de Uso

### Buscar Video
1. Escribe en la barra de búsqueda "Acción" o el nombre de un director
2. Los resultados se filtran en tiempo real (con debounce)

### Filtrar Videos
1. Selecciona un género de la lista desplegable
2. Selecciona un tipo (Película, Serie, Documental)
3. Activa "Solo disponibles" para videos en stock
4. Ajusta el rango de años
5. El catálogo se actualiza automáticamente

### Ordenar Videos
1. Selecciona criterio: Título, Año o Popularidad
2. Haz clic en el botón para alternar orden (Ascendente ↑ / Descendente ↓)

### Acciones por Video
- **Ver detalles**: Muestra información adicional (alert)
- **Eliminar**: Elimina el video del catálogo (alert)

## 📝 Datos Mock Incluidos

El proyecto incluye 10 videos de ejemplo:
1. El Gran Escape (Acción, Película)
2. Misterios del Cosmos (Ciencia, Documental)
3. Amores Urbanos (Drama, Serie)
4. Acción Extrema (Acción, Película)
5. La Mente Brillante (Drama, Película)
6. Planeta Azul (Ciencia, Documental)
7. Stranger Things (Ciencia, Serie)
8. El Viaje Épico (Aventura, Película)
9. Comedia Nocturna (Comedia, Serie)
10. Historia Olvidada (Historia, Documental)

## 🐛 Sin Errores en Consola

✓ TypeScript con tipado completo (sin `any`)  
✓ Lint warnings mínimo  
✓ Console sin errores de React  
✓ Compilación exitosa  

## 👨‍💻 Autor

**Andrés Gil**  
Taller: Catálogo Interactivo con Filtros y Búsqueda  
Fecha: 2 de marzo de 2026

## 📚 Recursos Útiles

- [Documentación React](https://react.dev)
- [Documentación TypeScript](https://www.typescriptlang.org)
- [Documentación Vite](https://vitejs.dev)

---

**Nota**: Este proyecto utiliza Vite con hot module replacement (HMR) para desarrollo rápido. Todos los cambios se reflejan instantáneamente en el navegador.

