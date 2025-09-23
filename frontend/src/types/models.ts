/**
 * =====================================================
 * TIPOS DE MODELOS
 * =====================================================
 * 
 * Tipos TypeScript para las entidades del sistema
 */

import { Database } from './database'

// Tipos base de la base de datos
export type Modelo = Database['public']['Tables']['modelos']['Row']
export type ServicioPrecio = Database['public']['Tables']['servicios_precios']['Row']
export type Chatter = Database['public']['Tables']['chatters']['Row']
export type Ticket = Database['public']['Tables']['tickets']['Row']
export type Etiqueta = Database['public']['Tables']['etiquetas']['Row']

// Tipos para inserción
export type ModeloInsert = Database['public']['Tables']['modelos']['Insert']
export type ServicioPrecioInsert = Database['public']['Tables']['servicios_precios']['Insert']
export type ChatterInsert = Database['public']['Tables']['chatters']['Insert']
export type TicketInsert = Database['public']['Tables']['tickets']['Insert']
export type EtiquetaInsert = Database['public']['Tables']['etiquetas']['Insert']

// Tipos para actualización
export type ModeloUpdate = Database['public']['Tables']['modelos']['Update']
export type ServicioPrecioUpdate = Database['public']['Tables']['servicios_precios']['Update']
export type ChatterUpdate = Database['public']['Tables']['chatters']['Update']
export type TicketUpdate = Database['public']['Tables']['tickets']['Update']
export type EtiquetaUpdate = Database['public']['Tables']['etiquetas']['Update']

// =====================================================
// TIPOS ESPECÍFICOS DEL SISTEMA
// =====================================================

/**
 * Servicios disponibles en el sistema
 */
export const SERVICIOS = [
  // VIDEOCALLS
  'VIDEOCALL 5MIN',
  'VIDEOCALL 10MIN', 
  'VIDEOCALL 15MIN',
  
  // CUSTOM VIDEOS
  'CUSTOM VIDEO PERSONALIZADO 5 M',
  'CUSTOM VIDEO PERSONALIZADO 10 M',
  'CUSTOM VIDEO PERSONALIZADO 15 M',
  
  // EXTRAS
  'FOTOS PERSONALIZADAS 1',
  'FOTOS PERSONALIZADAS 3',
  'BG PERSONALIZADO',
  'PANTIES',
  
  // CONTENIDO XXX
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
] as const

export type Servicio = typeof SERVICIOS[number]

/**
 * Apps de comunicación disponibles
 */
export const APPS = [
  'whatsapp',
  'telegram', 
  'teams',
  'instagram',
  'snapchat',
  'otra'
] as const

export type App = typeof APPS[number]

/**
 * Extras disponibles para videollamadas
 */
export const EXTRAS_VIDEOLLAMADAS = [
  'Dildo',
  'Squirt real',
  'Squirt falso',
  'Doble penetracion',
  'Pareja',
  'Lesbico',
  'Anal solo',
  'Multi camara'
] as const

export type ExtraVideollamada = typeof EXTRAS_VIDEOLLAMADAS[number]

/**
 * Extras disponibles para videos personalizados
 */
export const EXTRAS_CUSTOM = [
  'Dildo',
  'Squirt real',
  'Squirt falso',
  'Doble penetracion',
  'Pareja',
  'Lesbico',
  'Anal solo',
  'Multi camara'
] as const

export type ExtraCustom = typeof EXTRAS_CUSTOM[number]

/**
 * Estados de tickets
 */
export const TICKET_STATUS = [
  'pending',
  'in_progress',
  'completed',
  'cancelled'
] as const

export type TicketStatus = typeof TICKET_STATUS[number]

/**
 * Prioridades de tickets
 */
export const TICKET_PRIORITY = [
  'low',
  'medium',
  'high'
] as const

export type TicketPriority = typeof TICKET_PRIORITY[number]

/**
 * Datos del formulario principal
 */
export interface FormularioModelo {
  // Datos básicos
  modelo: string
  contacto: string
  
  // Apps seleccionadas
  apps_selected: App[]
  app_handle_whatsapp?: string
  app_handle_telegram?: string
  app_handle_teams?: string
  app_handle_instagram?: string
  app_handle_snapchat?: string
  app_handle_otra?: string
  app_otra_nombre?: string
  
  // Extras
  extras_videollamadas: ExtraVideollamada[]
  extras_custom: ExtraCustom[]
  extras_generales?: string
  
  // Precios de servicios
  precios: Record<Servicio, number>
}

/**
 * Respuesta de API estándar
 */
export interface ApiResponse<T = any> {
  ok: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * Datos de autenticación
 */
export interface AuthUser {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

/**
 * Configuración de la aplicación
 */
export interface AppConfig {
  name: string
  url: string
  version: string
  environment: 'development' | 'production' | 'test'
}
