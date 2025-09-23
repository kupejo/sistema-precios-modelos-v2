/**
 * =====================================================
 * UTILIDADES GENERALES
 * =====================================================
 * 
 * Funciones de utilidad reutilizables en toda la aplicación
 */

import { type ClassValue, clsx } from 'clsx'
import { SERVICIOS, PRECIOS_SUGERIDOS } from './constants'

// =====================================================
// UTILIDADES DE CLASES CSS
// =====================================================

/**
 * Combina clases CSS de forma condicional
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// =====================================================
// UTILIDADES DE FORMATEO
// =====================================================

/**
 * Formatea un precio como moneda
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

/**
 * Formatea una fecha
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

/**
 * Formatea una fecha relativa (hace X tiempo)
 */
export function formatRelativeTime(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'hace un momento'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`
  }

  return formatDate(d)
}

// =====================================================
// UTILIDADES DE VALIDACIÓN
// =====================================================

/**
 * Valida un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida un teléfono
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Valida un username
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/
  return usernameRegex.test(username)
}

/**
 * Valida un precio
 */
export function isValidPrice(price: number): boolean {
  return price >= 0 && price <= 9999.99
}

// =====================================================
// UTILIDADES DE STRING
// =====================================================

/**
 * Capitaliza la primera letra de una cadena
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Genera un slug a partir de una cadena
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Trunca una cadena a una longitud específica
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

// =====================================================
// UTILIDADES DE ARRAY
// =====================================================

/**
 * Elimina duplicados de un array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Agrupa elementos de un array por una clave
 */
export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

/**
 * Ordena un array por una clave
 */
export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

// =====================================================
// UTILIDADES DE SERVICIOS
// =====================================================

/**
 * Obtiene el precio sugerido para un servicio
 */
export function getPrecioSugerido(servicio: string): number {
  return PRECIOS_SUGERIDOS[servicio] || 0
}

/**
 * Clasifica un servicio en su categoría
 */
export function getCategoriaServicio(servicio: string): 'videollamadas' | 'customs' | 'extras' | 'xxx' {
  const s = servicio.toLowerCase()
  
  if (s.includes('videocall')) return 'videollamadas'
  if (s.includes('custom video')) return 'customs'
  if (s.includes('foto') || s.includes('bg ') || s.includes('panties')) return 'extras'
  return 'xxx'
}

/**
 * Obtiene el icono para un servicio
 */
export function getIconoServicio(servicio: string): string {
  const s = servicio.toLowerCase()
  
  if (s.includes('videocall')) return '📹'
  if (s.includes('custom video')) return '🎬'
  if (s.includes('foto')) return '📸'
  if (s.includes('bg')) return '🎨'
  if (s.includes('panties')) return '👙'
  if (s.includes('sola')) return '💋'
  if (s.includes('b/g')) return '👫'
  if (s.includes('lesbian')) return '👭'
  if (s.includes('orgia')) return '👥'
  if (s.includes('bbc')) return '🍆'
  if (s.includes('trio')) return '👨‍👩‍👧'
  if (s.includes('lives')) return '🔴'
  if (s.includes('estrenos')) return '🆕'
  
  return '💰'
}

// =====================================================
// UTILIDADES DE ID
// =====================================================

/**
 * Genera un ID corto único
 */
export function generateShortId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Genera un ID de ticket
 */
export function generateTicketId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `TKT-${timestamp}-${random}`.toUpperCase()
}

// =====================================================
// UTILIDADES DE DEBOUNCE
// =====================================================

/**
 * Debounce para funciones
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// =====================================================
// UTILIDADES DE STORAGE
// =====================================================

/**
 * Guarda datos en localStorage de forma segura
 */
export function saveToStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

/**
 * Lee datos de localStorage de forma segura
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}

// =====================================================
// UTILIDADES DE ERROR
// =====================================================

/**
 * Maneja errores de forma consistente
 */
export function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'Ha ocurrido un error inesperado'
}

/**
 * Crea un error personalizado
 */
export function createError(message: string, code?: string): Error {
  const error = new Error(message)
  if (code) {
    ;(error as any).code = code
  }
  return error
}
