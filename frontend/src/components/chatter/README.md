# Panel de Chatter

Este módulo contiene todos los componentes necesarios para el panel de chatter del sistema de precios de modelos.

## Estructura de Componentes

### 1. **ChatterLogin** (`ChatterLogin.tsx`)
- **Propósito**: Pantalla de inicio de sesión para chatters
- **Características**:
  - Formulario de login con validación
  - Credenciales de prueba incluidas (usuario: `test`, contraseña: `123`)
  - Manejo de errores y estados de carga
  - Diseño responsive con tema Midnight Black

### 2. **ChatterLayout** (`ChatterLayout.tsx`)
- **Propósito**: Layout principal que envuelve todo el panel de chatter
- **Características**:
  - Header con información del usuario
  - Sidebar colapsible
  - Navegación entre secciones
  - Responsive design

### 3. **ChatterHeader** (`ChatterHeader.tsx`)
- **Propósito**: Barra superior del panel con información del usuario
- **Características**:
  - Toggle del sidebar
  - Información del chatter logueado
  - Menú de usuario con opciones
  - Notificaciones (placeholder)

### 4. **ChatterSidebar** (`ChatterSidebar.tsx`)
- **Propósito**: Navegación lateral del panel
- **Características**:
  - Navegación entre secciones (Dashboard, Modelos, Tickets, Perfil)
  - Sidebar colapsible
  - Resumen rápido de estadísticas
  - Iconos descriptivos

### 5. **ChatterDashboard** (`ChatterDashboard.tsx`)
- **Propósito**: Pantalla principal con resumen de actividad
- **Características**:
  - Tarjetas de estadísticas (Total tickets, Activos, Completados, Total gastado)
  - Lista de tickets recientes
  - Acciones rápidas
  - Estados de carga

### 6. **ChatterModels** (`ChatterModels.tsx`)
- **Propósito**: Visualización de modelos asignados al chatter
- **Características**:
  - Grid de modelos asignados
  - Información de contacto y apps disponibles
  - Botón para crear tickets con cada modelo
  - Estado cuando no hay modelos asignados

### 7. **ChatterTickets** (`ChatterTickets.tsx`)
- **Propósito**: Gestión de tickets del chatter
- **Características**:
  - Lista de todos los tickets del chatter
  - Filtros por estado (Todos, Pendientes, En Progreso, Completados, Cancelados)
  - Información detallada de cada ticket
  - Acciones por ticket (Ver detalles, Cancelar)

### 8. **ChatterProfile** (`ChatterProfile.tsx`)
- **Propósito**: Gestión del perfil personal del chatter
- **Características**:
  - Edición de información personal
  - Estadísticas de cuenta
  - Acciones rápidas (Cambiar contraseña, Exportar datos, Contactar soporte)
  - Zona de peligro (Cerrar sesión)

## Funcionalidades Implementadas

### ✅ **Autenticación**
- Login con credenciales simuladas
- Persistencia de sesión en localStorage
- Logout seguro

### ✅ **Navegación**
- Sidebar colapsible
- Navegación entre secciones
- Breadcrumbs visuales

### ✅ **Dashboard**
- Estadísticas en tiempo real
- Tickets recientes
- Acciones rápidas

### ✅ **Gestión de Modelos**
- Visualización de modelos asignados
- Información de contacto
- Apps disponibles por modelo

### ✅ **Gestión de Tickets**
- Lista completa de tickets
- Filtros por estado
- Información detallada
- Acciones contextuales

### ✅ **Perfil de Usuario**
- Edición de información personal
- Estadísticas de cuenta
- Configuraciones de seguridad

## Datos de Prueba

Para probar el panel de chatter, usa estas credenciales:

- **Usuario**: `test`
- **Contraseña**: `123`

## Integración con Backend

El panel está preparado para integrarse con el backend real. Las funciones que actualmente usan datos simulados incluyen:

- `getTickets()` - Obtener tickets del chatter
- `getModels()` - Obtener modelos asignados
- Login de chatter
- Actualización de perfil

## Próximas Funcionalidades

### 🔄 **Pendientes de Implementar**
- Modal para crear nuevos tickets
- Modal de detalles de tickets
- Sistema de notificaciones en tiempo real
- Cambio de contraseña
- Exportación de datos
- Contacto con soporte
- Integración completa con API backend

### 🎨 **Mejoras de UI/UX**
- Animaciones de transición
- Modo oscuro/claro
- Personalización de tema
- Notificaciones push
- Chat en tiempo real

## Tecnologías Utilizadas

- **React 18** con TypeScript
- **TailwindCSS** para estilos
- **Componentes Modernos** (ModernCard, ModernButton, etc.)
- **LocalStorage** para persistencia de sesión
- **Responsive Design** para móviles y desktop

## Estructura de Archivos

```
src/components/chatter/
├── ChatterLogin.tsx          # Pantalla de login
├── ChatterLayout.tsx         # Layout principal
├── ChatterHeader.tsx         # Header con navegación
├── ChatterSidebar.tsx        # Sidebar de navegación
├── ChatterDashboard.tsx      # Dashboard principal
├── ChatterModels.tsx         # Gestión de modelos
├── ChatterTickets.tsx        # Gestión de tickets
├── ChatterProfile.tsx        # Perfil del usuario
└── README.md                 # Esta documentación
```

## Uso

1. Navega a `/chatter` en la aplicación
2. Usa las credenciales de prueba para iniciar sesión
3. Explora las diferentes secciones del panel
4. Prueba las funcionalidades de filtrado y navegación

El panel está completamente funcional para pruebas locales y listo para integración con el backend real.
