# 🚀 Inicio Rápido - 5 Minutos

## ⚡ Pasos Básicos

### 1. Abre Terminal y Navega
```bash
cd c:\3171599-F-andres-gil\proyecto-catalogo
```

### 2. Instala Dependencias (si no lo hiciste)
```bash
pnpm install
```

### 3. Inicia Servidor
```bash
pnpm dev
```

### 4. Abre Navegador
```
http://localhost:5173/
```

✅ **¡Listo! Tu catálogo está en vivo**

---

## 🎯 Prueba Estos Casos de Uso

### Caso 1: Buscar "Acción"
1. Escribe en la barra de búsqueda
2. Verás: "El Gran Escape" y "Acción Extrema"
3. Click "Limpiar" para resetear

### Caso 2: Filtrar por Serie
1. Selecciona "Serie" en tipo
2. Verás: 3 series
3. Ordena por Año descendente
4. Verás: "Amores Urbanos" primero

### Caso 3: Solo Disponibles
1. Activa checkbox "Solo disponibles"
2. Verás: 8 videos (excluye 2 agotados)

### Caso 4: Rango de Año
1. Cambia "Año máximo" a 2022
2. Verás: solo videos hasta 2022

---

## 📁 Archivos Importantes

```
Activos Ahora:
├── ✅ src/              (Código React)
├── ✅ index.html        (HTML principal)
├── ✅ package.json      (Dependencias)
└── ✅ 🟢 Servidor en http://localhost:5173/

Documentación:
├── 📖 README.md         (Comienza aquí)
├── 🎨 VISUAL.md         (Imágenes/diagramas)
├── ⚙️ COMPONENTES.md    (Código detallado)
├── 🛠️ PERSONALIZACION.md (Cómo extender)
├── ✅ CHECKLIST.md      (Verificación)
└── 📦 ENTREGA.md        (Resumen)
```

---

## 🔧 Cambios Comunes

### Agregar un video
📄 Archivo: `src/data/items.ts`
```typescript
{
  id: '11',
  titulo: 'Mi Video',
  tipo: 'película',
  genero: 'Drama',
  año: 2024,
  director: 'Tu Nombre',
  actores: ['Actor 1', 'Actor 2'],
  disponible: true,
  popularidad: 80,
  imagen: 'URL_aqui'
}
```

### Cambiar colores
📄 Archivo: `src/index.css`
```css
/* Línea 8: Gradiente de fondo */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Línea 59: Color primario */
background: #667eea;

/* Línea 95: Color peligro */
background: #ff6b6b;
```

### Agregar un género
📄 Archivo: `src/components/FilterPanel.tsx`
```typescript
<option value="Tu Género">Tu Género</option>
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| App no carga | Asegúrate que `pnpm dev` está corriendo |
| Estilos no se ven | Recarga: Ctrl+Shift+R (caché) |
| Error TypeScript | Verifica imports en componentes |
| Búsqueda lenta | El debounce es normal (300ms) |
| Botones no funcionan | Abre DevTools (F12) y mira console |

---

## 💡 Tips Útiles

✅ **Línea de búsqueda** busca en 3 campos:
   - Título
   - Director  
   - Actores

✅ **Filtros se combinan** (Género + Tipo + Año, etc)

✅ **Ordenamiento no muta** el array original

✅ **Hot Reload** - Los cambios aparecen automáticamente

✅ **Responsive** - Adapta a móvil/tablet/desktop

---

## 🎓 Conceptos React Clave

- `useState` - Para estados
- `useMemo` - Para optimizar cálculos
- `useEffect` - Para efectos secundarios
- `.map()` - Para listas
- Condicionales `&&` / `? :` - Para renderizado condicional
- Props tipadas - Con TypeScript

---

## 📊 Datos Mock

10 videos incluidos:
- 5 películas
- 3 series
- 2 documentales

Géneros: Acción, Drama, Ciencia, Aventura, Comedia, Historia

---

## 🚀 Siguiente Paso

Abre uno de estos archivos para aprender más:

1. **Quiero entender el código**
   → Lee `COMPONENTES.md`

2. **Quiero personalizar**
   → Lee `PERSONALIZACION.md`

3. **Quiero ver cómo se ve**
   → Lee `VISUAL.md`

4. **Quiero todo de una vez**
   → Lee `README.md`

---

## ✨ ¡Diversión Garantizada!

Tu catálogo está listo. Ahora:
- Explora los videos
- Juega con los filtros
- Modifica los datos
- Extiende la funcionalidad

¿Preguntas? Revisa la documentación en cada archivo. ¡Feliz coding! 🎬

---

**Estado:** 🟢 Servidor en ejecución  
**URL:** http://localhost:5173/  
**Tiempo de configuración:** ~2 minutos  
**Tiempo para estar productivo:** ~5 minutos
