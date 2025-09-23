/**
 * =====================================================
 * CONSTANTES DEL SISTEMA
 * =====================================================
 * 
 * Constantes globales utilizadas en toda la aplicación
 */

import { SERVICIOS, APPS, EXTRAS_VIDEOLLAMADAS, EXTRAS_CUSTOM } from '@/types/models'

// =====================================================
// CONFIGURACIÓN DE LA APLICACIÓN
// =====================================================

export const APP_CONFIG = {
  name: 'Sistema de Precios Modelos',
  version: '2.0.0',
  description: 'Sistema profesional para gestión de precios de modelos',
  author: 'Sistema de Precios Modelos',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
} as const

// =====================================================
// SERVICIOS Y PRECIOS
// =====================================================

/**
 * Servicios disponibles en el sistema
 */
export { SERVICIOS, APPS, EXTRAS_VIDEOLLAMADAS, EXTRAS_CUSTOM }

/**
 * Precios sugeridos para servicios
 */
export const PRECIOS_SUGERIDOS: Record<string, number> = {
  'VIDEOCALL 5MIN': 70,
  'VIDEOCALL 10MIN': 100,
  'VIDEOCALL 15MIN': 150,
  'CUSTOM VIDEO PERSONALIZADO 5 M': 70,
  'CUSTOM VIDEO PERSONALIZADO 10 M': 100,
  'CUSTOM VIDEO PERSONALIZADO 15 M': 150,
  'FOTOS PERSONALIZADAS 1': 50,
  'FOTOS PERSONALIZADAS 3': 120,
  'BG PERSONALIZADO': 30,
  'PANTIES': 80,
  'SOLA VAGINAL': 100,
  'SOLA ANAL': 120,
  'SOLA SQUIRT': 90,
  'B/G BOY GIRL': 200,
  'B/G BOY GIRL ANAL': 250,
  'LESBIAN': 150,
  'ORGIA': 300,
  'BBC': 180,
  'TRIO 2 CHICOS 1 CHICA': 400,
  'LIVES': 60,
  'Estrenos': 80
}

/**
 * Categorías de servicios
 */
export const CATEGORIAS_SERVICIOS = {
  videollamadas: [
    'VIDEOCALL 5MIN',
    'VIDEOCALL 10MIN',
    'VIDEOCALL 15MIN'
  ],
  customs: [
    'CUSTOM VIDEO PERSONALIZADO 5 M',
    'CUSTOM VIDEO PERSONALIZADO 10 M',
    'CUSTOM VIDEO PERSONALIZADO 15 M'
  ],
  extras: [
    'FOTOS PERSONALIZADAS 1',
    'FOTOS PERSONALIZADAS 3',
    'BG PERSONALIZADO',
    'PANTIES'
  ],
  xxx: [
    'SOLA VAGINAL',
    'SOLA ANAL',
    'SOLA SQUIRT',
    'B/G BOY GIRL',
    'B/G BOY GIRL ANAL',
    'LESBIAN',
    'ORGIA',
    'BBC',
    'TRIO 2 CHICOS 1 CHICA',
    'LIVES',
    'Estrenos'
  ]
} as const

// =====================================================
// CONFIGURACIÓN DE FORMULARIOS
// =====================================================

/**
 * Validaciones de formularios
 */
export const VALIDACIONES = {
  modelo: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\s\-_]+$/
  },
  contacto: {
    minLength: 3,
    maxLength: 100
  },
  precio: {
    min: 0,
    max: 9999.99,
    step: 0.01
  },
  password: {
    minLength: 8,
    maxLength: 50
  },
  username: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_]+$/
  }
} as const

// =====================================================
// CONFIGURACIÓN DE UI
// =====================================================

/**
 * Configuración de temas
 */
export const THEME_CONFIG = {
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#000000',
    surface: '#0b0b0b',
    text: '#e5e7eb',
    muted: '#9aa3af'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  }
} as const

// =====================================================
// CONFIGURACIÓN DE PAGINACIÓN
// =====================================================

export const PAGINATION = {
  defaultPageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
  maxPageSize: 100
} as const

// =====================================================
// CONFIGURACIÓN DE ARCHIVOS
// =====================================================

export const FILE_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxFiles: 5
} as const

// =====================================================
// CONFIGURACIÓN DE NOTIFICACIONES
// =====================================================

export const NOTIFICATION_CONFIG = {
  duration: 5000,
  position: 'top-right'
} as const

// =====================================================
// CONFIGURACIÓN DE CACHE
// =====================================================

export const CACHE_CONFIG = {
  models: 5 * 60 * 1000, // 5 minutos
  chatters: 10 * 60 * 1000, // 10 minutos
  tickets: 2 * 60 * 1000, // 2 minutos
  etiquetas: 30 * 60 * 1000 // 30 minutos
} as const
