# Sistema de Precios Modelos v2.0

Sistema profesional para gestión de precios de modelos, desarrollado con Next.js 14, TypeScript, Supabase y Vercel.

## 🚀 Características

- **Formulario Multi-paso**: Registro completo de modelos con validación en tiempo real
- **Gestión de Precios**: 22 servicios predefinidos con precios personalizables
- **Apps de Comunicación**: Soporte para WhatsApp, Telegram, Teams, Instagram, Snapchat y más
- **Servicios Adicionales**: Extras para videollamadas y videos personalizados
- **Panel de Administración**: Gestión completa de modelos, chatters y tickets
- **Panel de Chatter**: Dashboard personalizado para chatters
- **Visualizador Público**: Lista pública de modelos aprobados
- **Tema Oscuro**: Interfaz moderna y elegante
- **Responsive Design**: Optimizado para móviles y desktop

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Despliegue**: Vercel
- **Validación**: Zod, React Hook Form
- **UI**: Componentes personalizados con shadcn/ui

## 📁 Estructura del Proyecto

```
sistema-precios-modelos-v2/
├── frontend/                 # Aplicación Next.js
│   ├── src/
│   │   ├── app/             # App Router (Next.js 14)
│   │   ├── components/      # Componentes reutilizables
│   │   │   ├── forms/       # Formularios
│   │   │   ├── ui/          # Componentes UI base
│   │   │   └── admin/       # Componentes de administración
│   │   ├── lib/             # Utilidades y configuración
│   │   └── types/           # Tipos TypeScript
│   └── package.json
└── README.md
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase
- Cuenta de Vercel

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd sistema-precios-modelos-v2
```

### 2. Instalar dependencias

```bash
cd frontend
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `env.example` a `.env.local` y configura las variables:

```bash
cp env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key
```

### 4. Configurar Supabase

1. Crea un nuevo proyecto en [Supabase](https://supabase.com)
2. Ejecuta las migraciones SQL (ver sección Base de Datos)
3. Configura las políticas de Row Level Security

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🗄️ Base de Datos

### Tablas Principales

- **modelos**: Perfiles de modelos
- **servicios_precios**: Precios por modelo
- **chatters**: Usuarios chatter
- **tickets**: Sistema de tickets
- **etiquetas**: Sistema de etiquetas
- **modelo_etiquetas**: Relación muchos a muchos
- **ticket_audit**: Bitácora de cambios

### Migraciones

Las migraciones SQL están en el archivo `database.sql`. Ejecuta estas migraciones en tu proyecto de Supabase.

## 🚀 Despliegue en Vercel

### 1. Conectar con GitHub

1. Sube tu código a GitHub
2. Conecta tu repositorio con Vercel
3. Configura las variables de entorno en Vercel

### 2. Variables de entorno en Vercel

```
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

### 3. Deploy automático

Vercel desplegará automáticamente cada vez que hagas push a la rama principal.

## 📱 Funcionalidades

### Formulario Principal

- **Paso 1**: Datos básicos (nombre, contacto)
- **Paso 2**: Apps de comunicación
- **Paso 3**: Servicios adicionales
- **Paso 4**: Precios de servicios
- **Paso 5**: Revisión final

### Servicios Disponibles

#### Videollamadas
- VIDEOCALL 5MIN, 10MIN, 15MIN

#### Videos Personalizados
- CUSTOM VIDEO 5M, 10M, 15M

#### Extras
- FOTOS PERSONALIZADAS, BG PERSONALIZADO, PANTIES

#### Contenido Adulto
- SOLA VAGINAL, SOLA ANAL, B/G BOY GIRL, LESBIAN, etc.

### Apps Soportadas

- WhatsApp, Telegram, Teams, Instagram, Snapchat, Otra

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte, contacta a [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)

---

Desarrollado con ❤️ usando Next.js, Supabase y Vercel
