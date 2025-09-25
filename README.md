# 📰 Sistema de Precios Modelos v2.1

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.57.4-green?style=for-the-badge&logo=supabase)](https://supabase.com/)

Sistema profesional completo para gestión de precios de modelos con panel administrativo avanzado, sistema de noticias inteligente y auditoría completa. Desarrollado con las últimas tecnologías web.

## 🆕 **Nuevas Funcionalidades v2.1**

### 📰 **Sistema de Noticias Inteligente**
- ✅ **Panel de Administración**: Crear, editar y gestionar noticias
- ✅ **Targeting Avanzado**: Noticias dirigidas por modelos específicas
- ✅ **Priorización**: Sistema de prioridades (urgent, high, medium, low)
- ✅ **Pin/Unpin**: Noticias fijadas en la parte superior
- ✅ **Expiración Automática**: Noticias con fecha de vencimiento
- ✅ **Analytics**: Seguimiento de visualizaciones y lecturas
- ✅ **Almacenamiento Local**: Persistencia de datos sin backend

### 📊 **Bitácora de Auditoría de Tickets**
- ✅ **Historial Completo**: Registro de todos los cambios en tickets
- ✅ **Visualización Detallada**: Comparación de valores antiguos vs nuevos
- ✅ **Trazabilidad**: Seguimiento de quién y cuándo hizo cambios
- ✅ **Acciones Registradas**: Creación, edición, cambio de estado, eliminación
- ✅ **Interfaz Intuitiva**: Modal con información clara y organizada

### 🎨 **Optimizaciones de UI/UX**
- ✅ **Modales Sin Parpadeos**: Optimización completa con useCallback y useEffect
- ✅ **Iconos Mejorados**: Iconografía consistente en botones y acciones
- ✅ **Mejor Organización**: Componentes más limpios y eficientes
- ✅ **Corrección de Errores**: Eliminación de warnings de linting y TypeScript
- ✅ **Rendimiento**: Optimización de re-renders y dependencias

## 🚀 **Características Principales**

### 📝 **Formulario Multi-paso Avanzado**
- **Paso 1**: Datos básicos (nombre, contacto)
- **Paso 2**: Apps de comunicación (WhatsApp, Telegram, Teams, Instagram, Snapchat)
- **Paso 3**: Servicios adicionales y extras
- **Paso 4**: Precios personalizables para 22 servicios
- **Paso 5**: Revisión final con validación completa

### 🎯 **Gestión de Servicios**
#### **Videollamadas**
- VIDEOCALL 5MIN, 10MIN, 15MIN

#### **Videos Personalizados**
- CUSTOM VIDEO 5M, 10M, 15M

#### **Fotos y Extras**
- FOTOS PERSONALIZADAS, BG PERSONALIZADO, PANTIES

#### **Contenido Adulto**
- SOLA VAGINAL, SOLA ANAL, B/G BOY GIRL, LESBIAN, etc.

### 👥 **Sistema de Chatters**
- **Registro y Login**: Autenticación segura
- **Dashboard Personalizado**: Estadísticas y resumen
- **Gestión de Tickets**: Crear, editar, cancelar, completar
- **Visualizador de Modelos**: Explorar modelos disponibles
- **Sistema de Solicitudes**: Solicitar asignación de modelos
- **Perfil Completo**: Gestión de datos personales
- **Exportación de Datos**: Descargar información personal

### 🔧 **Panel de Administración**
- **Dashboard Ejecutivo**: Estadísticas en tiempo real
- **Gestión de Modelos**: Aprobar, activar, editar, eliminar
- **Gestión de Chatters**: Administrar usuarios y permisos
- **Sistema de Tickets**: Monitoreo y gestión completa
- **Sistema de Etiquetas**: Organización y categorización
- **Configuraciones**: Ajustes del sistema
- **Bitácora de Auditoría**: Historial completo de cambios

## 🛠️ **Stack Tecnológico**

### **Frontend**
- **Next.js 15.5.4** - Framework React con App Router
- **React 19.1.0** - Biblioteca de UI con Hooks avanzados
- **TypeScript 5.0** - Tipado estático y mejor DX
- **Tailwind CSS 4.0** - Framework de CSS utility-first
- **Framer Motion** - Animaciones fluidas y transiciones

### **Backend & Base de Datos**
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Base de datos relacional
- **Row Level Security** - Seguridad a nivel de fila
- **Realtime** - Actualizaciones en tiempo real

### **Herramientas de Desarrollo**
- **ESLint** - Linting y calidad de código
- **Zod** - Validación de esquemas
- **React Hook Form** - Gestión de formularios
- **Lucide React** - Iconografía moderna
- **React Hot Toast** - Notificaciones elegantes

## 📁 **Estructura del Proyecto**

```
sistema-precios-modelos-v2/
├── 📁 frontend/                    # Aplicación Next.js
│   ├── 📁 src/
│   │   ├── 📁 app/                 # App Router (Next.js 15)
│   │   │   ├── 📁 admin/           # Panel de administración
│   │   │   ├── 📁 chatter/         # Panel de chatter
│   │   │   └── 📁 upload/          # Sistema de subida de archivos
│   │   ├── 📁 components/          # Componentes reutilizables
│   │   │   ├── 📁 admin/           # Componentes del admin
│   │   │   ├── 📁 chatter/         # Componentes del chatter
│   │   │   ├── 📁 forms/           # Formularios especializados
│   │   │   └── 📁 ui/              # Componentes UI base
│   │   ├── 📁 lib/                 # Utilidades y servicios
│   │   │   ├── dataService.ts      # Servicio de datos con localStorage
│   │   │   ├── uploadService.ts    # Servicio de subida de archivos
│   │   │   └── utils.ts            # Utilidades generales
│   │   └── 📁 types/               # Definiciones TypeScript
│   │       ├── database.ts         # Tipos de base de datos
│   │       ├── models.ts           # Tipos de modelos
│   │       └── news.ts             # Tipos del sistema de noticias
│   ├── 📄 package.json
│   └── 📄 README.md
├── 📄 database.sql                 # Esquema de base de datos
├── 📄 vercel.json                  # Configuración de Vercel
└── 📄 README.md                    # Este archivo
```

## 🚀 **Instalación y Desarrollo**

### **Prerrequisitos**
- **Node.js 18+** 
- **npm** o **yarn**
- **Cuenta de Supabase**
- **Cuenta de Vercel** (para despliegue)

### **1. Clonar el repositorio**

```bash
git clone <tu-repositorio>
cd sistema-precios-modelos-v2
```

### **2. Instalar dependencias**

```bash
cd frontend
npm install
```

### **3. Configurar variables de entorno**

Copia el archivo `env.example` a `.env.local`:

```bash
cp env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **4. Configurar Supabase**

1. **Crear proyecto** en [Supabase](https://supabase.com)
2. **Ejecutar migraciones** SQL del archivo `database.sql`
3. **Configurar políticas** de Row Level Security
4. **Configurar autenticación** y permisos

### **5. Ejecutar en desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🗄️ **Base de Datos**

### **Tablas Principales**

| Tabla | Descripción |
|-------|-------------|
| **modelos** | Perfiles de modelos con datos completos |
| **servicios_precios** | Precios personalizables por modelo |
| **chatters** | Usuarios del sistema con permisos |
| **tickets** | Sistema de tickets con estados |
| **etiquetas** | Sistema de categorización |
| **modelo_etiquetas** | Relación muchos a muchos |
| **ticket_audit** | 🆕 Bitácora de auditoría completa |

### **Funcionalidades de Base de Datos**

- **Triggers automáticos** para actualización de timestamps
- **Índices optimizados** para consultas rápidas
- **Vistas materializadas** para reportes
- **Row Level Security** para seguridad de datos
- **Auditoría completa** de todos los cambios

## 🚀 **Despliegue en Vercel**

### **1. Conectar con GitHub**

1. Sube tu código a GitHub
2. Conecta tu repositorio con Vercel
3. Configura las variables de entorno en Vercel

### **2. Variables de entorno en Vercel**

```
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

### **3. Deploy automático**

Vercel desplegará automáticamente cada vez que hagas push a la rama principal.

## 📱 **Funcionalidades Detalladas**

### **🏠 Página Principal**
- Formulario multi-paso para registro de modelos
- Validación en tiempo real
- Preview de datos antes del envío
- Manejo de errores elegante

### **👨‍💼 Panel de Administración**
- **Dashboard**: Estadísticas en tiempo real
- **Modelos**: Gestión completa de perfiles
- **Chatters**: Administración de usuarios
- **Tickets**: Monitoreo y gestión
- **Etiquetas**: Sistema de categorización
- **Noticias**: 🆕 Sistema de noticias inteligente
- **Configuraciones**: Ajustes del sistema

### **👤 Panel de Chatter**
- **Dashboard**: Resumen personalizado
- **Modelos**: Visualización de modelos asignados
- **Tickets**: Gestión de tickets personales
- **Perfil**: Configuración de cuenta
- **Historial**: Registro de actividades
- **Visualizador**: Explorar todos los modelos
- **Solicitudes**: Solicitar nuevos modelos
- **Noticias**: 🆕 Centro de noticias personalizado

### **📰 Sistema de Noticias**
- **Creación**: Formulario completo para admins
- **Targeting**: Noticias dirigidas por modelos específicas
- **Priorización**: Sistema de prioridades
- **Pin/Unpin**: Noticias fijadas
- **Expiración**: Fechas de vencimiento automáticas
- **Analytics**: Métricas de visualización

### **📊 Bitácora de Auditoría**
- **Registro completo** de cambios en tickets
- **Comparación visual** de valores antiguos vs nuevos
- **Trazabilidad** de usuarios y timestamps
- **Acciones registradas**: Crear, editar, cambiar estado, eliminar
- **Interfaz intuitiva** con modal detallado

## 🔧 **Scripts Disponibles**

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con Turbopack
npm run build        # Construcción optimizada para producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint

# Utilidades
npm run type-check   # Verificación de tipos TypeScript
npm run test         # Ejecutar tests (si están configurados)
```

## 📊 **Estadísticas del Proyecto**

- **📁 Componentes**: 50+ componentes React reutilizables
- **📝 Tipos**: 100+ interfaces TypeScript
- **🎨 Páginas**: 8 páginas principales
- **🔧 Utilidades**: 30+ funciones helper
- **📱 Responsive**: 100% optimizado para móvil y desktop
- **⚡ Performance**: Optimizado con Next.js 15 y Turbopack

## 🎯 **Casos de Uso**

### **Para Administradores**
- Gestionar modelos y precios
- Administrar usuarios chatters
- Monitorear tickets y actividad
- Crear noticias dirigidas
- Revisar bitácoras de auditoría
- Configurar el sistema

### **Para Chatters**
- Explorar modelos disponibles
- Crear y gestionar tickets
- Recibir noticias personalizadas
- Gestionar perfil personal
- Exportar datos personales
- Solicitar nuevos modelos

### **Para Modelos**
- Registrarse en el sistema
- Configurar precios y servicios
- Gestionar información de contacto
- Actualizar disponibilidad

## 🔒 **Seguridad**

- **Autenticación** con Supabase Auth
- **Autorización** con Row Level Security
- **Validación** de datos con Zod
- **Sanitización** de inputs
- **Auditoría** completa de acciones
- **HTTPS** obligatorio en producción

## 🤝 **Contribución**

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### **Estándares de Código**
- **TypeScript** estricto
- **ESLint** para calidad de código
- **Prettier** para formato consistente
- **Conventional Commits** para mensajes
- **Testing** obligatorio para nuevas funcionalidades

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 **Soporte y Contacto**

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/tu-repo/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/tu-usuario/tu-repo/discussions)
- **Email**: [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)

## 🙏 **Agradecimientos**

- **Next.js Team** por el increíble framework
- **Supabase** por el backend-as-a-service
- **Vercel** por el despliegue sin configuración
- **Tailwind CSS** por el sistema de diseño
- **React Community** por las mejores prácticas

---

<div align="center">

**Desarrollado con ❤️ usando Next.js, Supabase y Vercel**

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Powered by Supabase](https://img.shields.io/badge/Powered%20by-Supabase-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>