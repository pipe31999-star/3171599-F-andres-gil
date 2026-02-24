# 💪 Dashboard del Gimnasio - Proyecto React con useEffect

## Descripción General

Este proyecto implementa un dashboard interactivo para gestionar un gimnasio, utilizando React y TypeScript. Demuestra el dominio de `useEffect` para gestionar múltiples fuentes de datos, actualización en tiempo real y manejo de efectos secundarios complejos.

**Dominio Asignado:** 🏋️ Gimnasio
**Duración del Taller:** 2-2.5 horas

---

## 🎯 Objetivos de Aprendizaje Alcanzados

✅ **Uso de useEffect para fetch de datos iniciales**
- Implementado en `ItemList.tsx` para cargar miembros al montar

✅ **Polling con setInterval y cleanup**
- Implementado en `RealTimeIndicator.tsx` (actualización cada 5 segundos)
- Cleanup apropiado para evitar memory leaks

✅ **Múltiples efectos en un componente**
- `StatsCard.tsx` tiene 2 efectos: uno para cargar, otro para refrescar cada 30s
- `ItemList.tsx` tiene 2 efectos: uno para cargar, otro para búsqueda

✅ **Gestión de estados (loading, error, data)**
- Implementado en todos los componentes
- Mensajes personalizados para cada estado

✅ **AbortController para cancelar peticiones**
- Usado en `ItemList.tsx` y custom hook `useFetch`
- Evita actualizar estado de componentes desmontados

✅ **Custom hook reutilizable**
- `useFetch.ts`: Hook genérico que retorna `{ data, loading, error, refetch }`

✅ **Limpieza de event listeners y timers**
- Return cleanup functions en todos los useEffect
- clearInterval() en RealTimeIndicator
- controller.abort() en ItemList

---

## 📐 Arquitectura del Proyecto

```
starter/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          ✅ Componente principal
│   │   ├── ItemList.tsx           ✅ Lista de miembros
│   │   ├── StatsCard.tsx          ✅ Estadísticas
│   │   └── RealTimeIndicator.tsx  ✅ Ocupación en tiempo real
│   ├── hooks/
│   │   └── useFetch.ts            ✅ Custom hook
│   ├── types/
│   │   └── index.ts               ✅ Interfaces TypeScript
│   ├── utils/
│   │   └── api.ts                 ✅ Funciones de API
│   ├── index.tsx
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md (este archivo)
```

---

## 🔧 Componentes Implementados

### 1. **Dashboard** (Componente Principal)
- Orquesta todos los componentes
- Layout responsivo
- Header y footer personalizados

### 2. **ItemList** (Lista de Miembros)
- Carga 5 miembros mock del gimnasio
- Barra de búsqueda con debounce
- Estados: loading, error, data
- Tabla responsiva con información detallada
- **useEffect #1:** Fetch inicial con AbortController
- **useEffect #2:** Búsqueda/filtrado con debounce

### 3. **StatsCard** (Estadísticas)
- Muestra 4 métricas clave:
  - Total de Miembros
  - Asistencias Hoy
  - Activos Ahora
  - Ingresos Totales
- Diseño en grid con cards coloreadas
- **useEffect #1:** Carga inicial
- **useEffect #2:** Refresco automático cada 30 segundos

### 4. **RealTimeIndicator** (Ocupación en Tiempo Real)
- Actualiza ocupación cada 5 segundos (polling)
- Barra de progreso visual
- Estados:
  - 🟢 Verde: < 30% (Baja ocupación)
  - 🟠 Naranja: 30-70% (Ocupación moderada)
  - 🔴 Rojo: > 70% (Alta ocupación)
- Timestamp de última actualización
- **useEffect:** Polling con cleanup

---

## 🔌 Funciones de API (Mock)

### `fetchMembers(signal?: AbortSignal): Promise<Member[]>`
- Retorna lista de 5 miembros
- Simula latencia de 1200ms
- Soporta AbortController

### `fetchStats(): Promise<Stats>`
- Retorna 4 estadísticas (números aleatorios)
- Simula latencia de 800ms

### `fetchRealTimeData(): Promise<RealTimeData>`
- Retorna ocupación actual (0-50 personas)
- Simula latencia de 400ms
- Incluye timestamp

### `searchMembers(query: string): Promise<Member[]>`
- Filtra miembros por nombre o email
- Simula latencia de 600ms

---

## 🎣 Custom Hook: `useFetch`

```typescript
export const useFetch = <T,>(fetchFn: (signal?: AbortSignal) => Promise<T>) => {
  // Retorna: { data, loading, error, refetch }
}
```

**Características:**
- Genérico con TypeScript
- Manejo automático de AbortController
- Cleanup de errores cuando se cancela
- Función refetch manual
- Uso en componentes: limpio y reutilizable

---

## 📊 Tipos TypeScript

```typescript
interface Member {
  id: number;
  name: string;
  email: string;
  membershipType: 'basic' | 'premium' | 'vip';
  joinDate: string;
  isActive: boolean;
}

interface Stats {
  totalMembers: number;
  attendanceToday: number;
  activeNow: number;
  totalRevenue: number;
}

interface RealTimeData {
  currentOccupancy: number;
  maxCapacity: number;
  occupancyPercentage: number;
  lastUpdated: string;
}
```

---

## 🚀 Cómo Ejecutar

### Instalación
```bash
cd starter
npm install
```

### Desarrollo
```bash
npm start
```
Abre http://localhost:3000 en tu navegador

### Build para producción
```bash
npm build
```

---

## ✨ Características Implementadas

### Fetch Inicial ✅
- ItemList carga 5 miembros al montar
- Muestra "Cargando..." mientras se obtiene el dato
- Manejo de errores con mensajes claros

### Polling ✅
- RealTimeIndicator actualiza cada 5 segundos
- Inicio inmediato (no espera 5s)
- Cleanup apropiado al desmontar

### Múltiples Efectos ✅
- StatsCard: 2 efectos independientes
- ItemList: 2 efectos independientes (load + search)

### Búsqueda/Filtrado ✅
- Input de búsqueda en ItemList
- Debounce de 500ms
- Clear button para resetear
- Re-fetch automático al cambiar término

### Cancelación con AbortController ✅
- Implementado en ItemList
- Implementado en custom hook useFetch
- Evita race conditions

### Estilos ✅
- CSS limpio y moderno
- Grid responsivo
- Colores significativos
- Indicadores visuales claros

---

## 🧪 Pruebas Manuales

1. **Montaje:** Abre el dashboard y confirma que los datos se cargan
2. **Polling:** Observa que la ocupación cambia cada 5 segundos
3. **Búsqueda:** Escribe en el input de búsqueda, refrescable con debounce
4. **Desmontaje:** Navega fuera (no hay warnings de React)
5. **Cancelación:** Cambia entre búsquedas rápidamente (solo se muestra el último resultado)
6. **Errores:** Simula errores de red (componentes muestran mensajes apropiados)

---

## 📝 Decisiones Técnicas

### 1. Uso de Dates Mock en lugar de API real
- Mayor control y predicibilidad para testing
- Sin dependencias externas
- Simula latencias realistas

### 2. Debounce en búsqueda
- Evita múltiples peticiones mientras el usuario escribe
- Mejora performance y UX

### 3. Polling en lugar de WebSocket
- Más simple de implementar para demostración
- Suficiente para actualización cada 5 segundos

### 4. Custom Hook genérico
- Reutilizable en otros proyectos
- Encapsula lógica común de fetch

### 5. Colores y emojis
- Mejoran UX con indicadores visuales claros
- Contexto del dominio (gimnasio)

---

## ⚠️ Errores Comunes (Evitados)

✅ **Memory leaks:** Cleanup de timers y listeners
```javascript
return () => {
  clearInterval(intervalId);  // ← Cleanup
};
```

✅ **Race conditions:** AbortController
```javascript
const controller = new AbortController();
return () => controller.abort();  // ← Cancelación
```

✅ **Actualizar estado en componente desmontado:**
```javascript
let isMounted = true;
return () => { isMounted = false; };  // ← Validación
```

✅ **Array de dependencias incorrecto:**
```javascript
useEffect(() => { }, [deps]);  // ← Siempre especificar
```

---

## 📚 Referencias Utilizadas

- [React Docs: useEffect](https://react.dev/reference/react/useEffect)
- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎓 Lo que Aprendemos con Este Proyecto

1. **useEffect es poderoso:** Fetch, polling, cleanup, múltiples efectos
2. **Limpieza es crítica:** Evita memory leaks y actualizaciones innecesarias
3. **AbortController es esencial:** Cancela peticiones obsoletas
4. **Custom hooks reutilizan lógica:** Código más limpio y mantenible
5. **TypeScript mejora la confianza:** Tipos previenen errores en tiempo de compile

---

## 📄 Licencia

Este proyecto es educativo y forma parte del taller de React (Week 03).

---

**Autor:** [Tu nombre]
**Fecha:** Febrero 2025
**Tecnologías:** React 18, TypeScript, CSS3
