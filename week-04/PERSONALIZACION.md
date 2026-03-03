# Guía de Personalización del Catálogo

Este documento te guía sobre cómo personalizar y extender el catálogo de videos.

## 📝 Agregar Nuevos Videos

Para agregar nuevos videos al catálogo, edita el archivo `src/data/items.ts`:

```typescript
{
  id: '11',
  titulo: 'Tu Película',
  tipo: 'película',        // 'película' | 'serie' | 'documental'
  genero: 'Tu Género',     // Ej: Acción, Drama, etc.
  año: 2024,
  director: 'Nombre Director',
  actores: ['Actor 1', 'Actor 2', 'Actor 3'],
  disponible: true,        // true o false
  popularidad: 85,         // 1-100
  imagen: 'URL_de_imagen', // Reemplaza con URL real
}
```

### Géneros Disponibles (Actualiza según necesites)
- Acción
- Drama
- Ciencia
- Aventura
- Comedia
- Historia

Para agregar un nuevo género:
1. Añade la película en `src/data/items.ts` con el nuevo género
2. Actualiza `src/components/FilterPanel.tsx` agregando una nueva opción en el select:
```typescript
<option value="Tu Género">Tu Género</option>
```

## 🎨 Personalizar Estilos

### Colores Principales
Edita `src/index.css` para cambiar los colores del tema:

```css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Color primario */
background: #667eea;

/* Color peligro */
background: #ff6b6b;
```

### Tipografía
Cambia la familia de fuentes en `src/index.css`:
```css
font-family: 'Tu Fuente', sans-serif;
```

## 🔧 Modificar Componentes

### Cambiar el Título Principal
Edita `src/components/Catalog.tsx`:
```typescript
<h2>Tu Título aquí</h2>
```

### Agregar Más Opciones de Ordenamiento
Edita `src/components/SortSelector.tsx`:
```typescript
<option value="tu-criterio">Tu Criterio</option>
```

Y en `src/components/Catalog.tsx`, actualiza la lógica de ordenamiento:
```typescript
} else if (criterio === 'tu-criterio') {
  cmp = a.tuPropiedad - b.tuPropiedad;
}
```

## 🔄 Cambiar el Tiempo de Debounce

Por defecto, la búsqueda tiene un debounce de 300ms. Para cambiarlo, edita `src/components/Catalog.tsx`:

```typescript
const debouncedSearch = useDebounce(search, 500); // Cambiar 300 a 500
```

Valores recomendados:
- 200ms: Búsqueda rápida (requiere más recursos)
- 300ms: Equilibrio (recomendado)
- 500ms: Búsqueda lenta (menos recursos)

## 📱 Responsive Design

El proyecto ya es responsive. Puntos de ruptura (breakpoints):
- Móvil: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Para agregar nuevos breakpoints, edita `src/index.css` y añade:
```css
@media (max-width: 480px) {
  /* Estilos para móviles pequeños */
}
```

## 🧪 Testing (Opcional)

Para agregar tests, instala dependencias:
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

Crea archivos `.test.tsx` en los componentes.

## 🚀 Deploy

### Construir para Producción
```bash
pnpm build
```

Esto crea una carpeta `dist/` lista para publicar.

### Opciones de Deploy
- **Vercel**: `vercel deploy`
- **Netlify**: Conecta tu repo directo
- **GitHub Pages**: Usa `gh-pages`

## 🐛 Troubleshooting

### La app no carga
- Asegúrate de tener `index.html` en la raíz del proyecto
- Verifica que `src/main.tsx` exista
- Reinicia el servidor: `pnpm dev`

### Los estilos no se aplican
- Comprueba que `src/index.css` esté importado en `src/main.tsx`
- Limpia caché del navegador (Ctrl+Shift+Delete)

### Errores de TypeScript
- Ejecuta: `pnpm tsc --noEmit` para verificar tipos
- Asegúrate de que todos los imports sean correctos

## 📚 Estructura de Carpetas Explicada

```
src/
├── components/     # Componentes React reutilizables
│   ├── Catalog.tsx - Componente principal con lógica
│   └── Item*.tsx   - Componentes específicos
├── types/          # Definiciones TypeScript (interfaces)
├── data/           # Datos estáticos (mock)
├── hooks/          # Custom React hooks
├── App.tsx         # Componente raíz
└── main.tsx        # Punto de entrada (ReactDOM.render)
```

## ✨ Ideas para Extender

1. **Agregar backend**: Conectar con API para datos reales
2. **Autenticación**: Login/logout de usuarios
3. **Favoritos**: Sistema de guardado de videos
4. **Calificaciones**: Dejar reviews de videos
5. **Recomendaciones**: Sugerir videos basados en historial
6. **Carrito**: Agregar videos a lista de reproducción
7. **Dark Mode**: Tema oscuro/claro

---

¡Diviértete personalizando tu catálogo!
