# Panel de Administración

## Descripción

El panel de administración es una interfaz completa para gestionar todos los aspectos del sistema de precios de modelos. Está construido con React, TypeScript y TailwindCSS, siguiendo el mismo tema visual "Midnight Black" del resto de la aplicación.

## Estructura

```
src/components/admin/
├── AdminLayout.tsx          # Layout principal del panel
├── AdminHeader.tsx          # Header con navegación y usuario
├── AdminSidebar.tsx         # Sidebar con navegación lateral
├── AdminDashboard.tsx       # Dashboard principal con estadísticas
├── ModelsManagement.tsx     # Gestión de modelos
├── ChattersManagement.tsx   # Gestión de chatters
├── TicketsManagement.tsx    # Gestión de tickets
├── TagsManagement.tsx       # Gestión de etiquetas
├── SettingsManagement.tsx   # Configuración del sistema
├── types.ts                 # Tipos TypeScript
└── README.md               # Esta documentación
```

## Características

### 🎨 Diseño
- **Tema Midnight Black**: Consistente con el resto de la aplicación
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Sidebar Colapsible**: Para optimizar el espacio
- **Animaciones Suaves**: Transiciones fluidas entre secciones

### 📊 Dashboard
- **Estadísticas en Tiempo Real**: Métricas clave del sistema
- **Tarjetas de Resumen**: Total de modelos, chatters, tickets, etc.
- **Actividad Reciente**: Últimas acciones del sistema
- **Estado del Sistema**: Monitoreo de servicios

### 👥 Gestión de Modelos
- **Lista Completa**: Todos los modelos registrados
- **Filtros Avanzados**: Por estado, apps, fecha, etc.
- **Acciones Rápidas**: Aprobar, activar, editar, eliminar
- **Búsqueda**: Encontrar modelos específicos

### 🔧 Configuración
- **Configuración General**: Nombre del sistema, descripción
- **Notificaciones**: Email y push notifications
- **Seguridad**: Tiempo de sesión, 2FA
- **Información del Sistema**: Versión, uptime, estado de BD

## Navegación

### Rutas
- `/admin` - Panel principal
- `/admin/dashboard` - Dashboard (por defecto)
- `/admin/models` - Gestión de modelos
- `/admin/chatters` - Gestión de chatters
- `/admin/tickets` - Gestión de tickets
- `/admin/tags` - Gestión de etiquetas
- `/admin/settings` - Configuración

### Secciones del Sidebar
1. **Dashboard** - Vista general del sistema
2. **Modelos** - Gestión de perfiles de modelos
3. **Chatters** - Gestión de cuentas de chatters
4. **Tickets** - Gestión de tickets del sistema
5. **Etiquetas** - Gestión de etiquetas
6. **Configuración** - Configuración del sistema

## Componentes

### AdminLayout
Componente principal que envuelve todo el panel de admin. Incluye:
- Header con navegación y perfil de usuario
- Sidebar colapsible
- Área de contenido principal

### AdminDashboard
Dashboard principal con:
- Tarjetas de estadísticas
- Gráficos de actividad
- Estado del sistema
- Actividad reciente

### ModelsManagement
Gestión completa de modelos con:
- Tabla de modelos con filtros
- Acciones de aprobación/activación
- Búsqueda y filtrado
- Exportación de datos

## Estados y Datos

### Tipos Principales
```typescript
interface AdminStats {
  totalModels: number
  activeModels: number
  pendingModels: number
  totalChatters: number
  activeChatters: number
  totalTickets: number
  pendingTickets: number
  completedTickets: number
}

interface Model {
  id: string
  profile_id: string
  modelo: string
  contacto: string
  apps_selected: string[]
  aprobado: boolean
  activo: boolean
  eliminado: boolean
  created_at: string
  updated_at: string
}
```

## Funcionalidades Futuras

### En Desarrollo
- [ ] Gestión completa de chatters
- [ ] Sistema de tickets avanzado
- [ ] Gestión de etiquetas
- [ ] Reportes y analytics
- [ ] Sistema de permisos
- [ ] Logs de auditoría

### Planificadas
- [ ] Dashboard con gráficos interactivos
- [ ] Notificaciones en tiempo real
- [ ] Exportación de datos
- [ ] Importación masiva
- [ ] API REST para integraciones

## Uso

1. **Acceso**: Navegar a `/admin` desde la página principal
2. **Navegación**: Usar el sidebar para cambiar entre secciones
3. **Gestión**: Cada sección tiene sus propias herramientas de gestión
4. **Configuración**: Usar la sección de Settings para configurar el sistema

## Tecnologías

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos y diseño
- **Next.js** - Framework de React
- **SVG Icons** - Iconografía

## Contribución

Para agregar nuevas funcionalidades al panel de admin:

1. Crear el componente en `src/components/admin/`
2. Agregar la ruta en `src/app/admin/page.tsx`
3. Actualizar los tipos en `types.ts`
4. Agregar la navegación en `AdminSidebar.tsx`
5. Documentar en este README
