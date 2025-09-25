/**
 * Servicio para manejar uploads de archivos con expiración automática
 */

export interface UploadToken {
  id: string
  ticketId: string
  token: string
  expiresAt: string
  maxFiles: number
  maxFileSize: number // en MB
  allowedTypes: string[]
  createdAt: string
  isActive: boolean
}

export interface UploadedFile {
  id: string
  tokenId: string
  ticketId: string
  fileName: string
  fileSize: number
  fileType: string
  uploadedAt: string
  expiresAt: string
  downloadUrl: string
}

// Simulación de base de datos en memoria
const uploadTokens: UploadToken[] = []
let uploadedFiles: UploadedFile[] = []

/**
 * Genera un token único para upload
 */
function generateUploadToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Crea un token de upload para un ticket
 */
export const createUploadToken = async (ticketId: string): Promise<UploadToken> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const token: UploadToken = {
    id: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ticketId,
    token: generateUploadToken(),
    expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 días
    maxFiles: 10,
    maxFileSize: 50, // 50MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'application/pdf', 'application/zip'],
    createdAt: new Date().toISOString(),
    isActive: true
  }
  
  uploadTokens.push(token)
  
  console.log('Token de upload creado:', token)
  return token
}

/**
 * Genera un enlace de upload específico para un ticket
 */
export const generateUploadLink = async (ticketId: string): Promise<string> => {
  const uploadToken = await createUploadToken(ticketId)
  // En un sistema real, este enlace sería una URL específica del backend
  const uploadUrl = `${window.location.origin}/api/upload/${uploadToken.token}`
  return uploadUrl
}

/**
 * Valida un token de upload
 */
export const validateUploadToken = async (token: string): Promise<{ valid: boolean; token?: UploadToken; error?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const uploadToken = uploadTokens.find(t => t.token === token && t.isActive)
  
  if (!uploadToken) {
    return { valid: false, error: 'Token no válido o expirado' }
  }
  
  const now = new Date()
  const expiresAt = new Date(uploadToken.expiresAt)
  
  if (now > expiresAt) {
    uploadToken.isActive = false
    return { valid: false, error: 'Token expirado' }
  }
  
  return { valid: true, token: uploadToken }
}

/**
 * Sube un archivo usando un token
 */
export const uploadFile = async (
  token: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ success: boolean; file?: UploadedFile; error?: string }> => {
  try {
    // Validar token
    const validation = await validateUploadToken(token)
    if (!validation.valid || !validation.token) {
      return { success: false, error: validation.error }
    }
    
    const uploadToken = validation.token
    
    // Validar archivo
    if (file.size > uploadToken.maxFileSize * 1024 * 1024) {
      return { success: false, error: `El archivo es demasiado grande. Máximo ${uploadToken.maxFileSize}MB` }
    }
    
    if (!uploadToken.allowedTypes.includes(file.type)) {
      return { success: false, error: 'Tipo de archivo no permitido' }
    }
    
    // Contar archivos existentes para este token
    const existingFiles = uploadedFiles.filter(f => f.tokenId === uploadToken.id)
    if (existingFiles.length >= uploadToken.maxFiles) {
      return { success: false, error: `Máximo ${uploadToken.maxFiles} archivos permitidos` }
    }
    
    // Simular upload con progreso
    for (let progress = 0; progress <= 100; progress += 10) {
      onProgress?.(progress)
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    // Crear registro del archivo
    const uploadedFile: UploadedFile = {
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      tokenId: uploadToken.id,
      ticketId: uploadToken.ticketId,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadedAt: new Date().toISOString(),
      expiresAt: uploadToken.expiresAt,
      downloadUrl: `https://example.com/download/${Date.now()}_${file.name}` // URL simulada
    }
    
    uploadedFiles.push(uploadedFile)
    
    console.log('Archivo subido:', uploadedFile)
    return { success: true, file: uploadedFile }
    
  } catch (error) {
    console.error('Error subiendo archivo:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}

/**
 * Obtiene archivos subidos para un ticket
 */
export const getUploadedFiles = async (ticketId: string): Promise<UploadedFile[]> => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  return uploadedFiles.filter(file => 
    file.ticketId === ticketId && 
    new Date(file.expiresAt) > new Date()
  )
}

/**
 * Obtiene archivos subidos por token
 */
export const getFilesByToken = async (token: string): Promise<UploadedFile[]> => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const validation = await validateUploadToken(token)
  if (!validation.valid || !validation.token) {
    return []
  }
  
  return uploadedFiles.filter(file => 
    file.tokenId === validation.token!.id && 
    new Date(file.expiresAt) > new Date()
  )
}

/**
 * Elimina archivos expirados (función de limpieza)
 */
export const cleanupExpiredFiles = async (): Promise<{ deletedFiles: number; deletedTokens: number }> => {
  const now = new Date()
  
  // Marcar tokens expirados como inactivos
  const expiredTokens = uploadTokens.filter(token => 
    new Date(token.expiresAt) <= now && token.isActive
  )
  
  expiredTokens.forEach(token => {
    token.isActive = false
  })
  
  // Eliminar archivos expirados
  const expiredFiles = uploadedFiles.filter(file => 
    new Date(file.expiresAt) <= now
  )
  
  uploadedFiles = uploadedFiles.filter(file => 
    new Date(file.expiresAt) > now
  )
  
  console.log(`Limpieza completada: ${expiredFiles.length} archivos y ${expiredTokens.length} tokens eliminados`)
  
  return {
    deletedFiles: expiredFiles.length,
    deletedTokens: expiredTokens.length
  }
}

/**
 * Obtiene estadísticas de uploads
 */
export const getUploadStats = async (): Promise<{
  totalTokens: number
  activeTokens: number
  totalFiles: number
  totalSize: number
}> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const now = new Date()
  const activeTokens = uploadTokens.filter(token => 
    token.isActive && new Date(token.expiresAt) > now
  )
  
  const validFiles = uploadedFiles.filter(file => 
    new Date(file.expiresAt) > now
  )
  
  const totalSize = validFiles.reduce((sum, file) => sum + file.fileSize, 0)
  
  return {
    totalTokens: uploadTokens.length,
    activeTokens: activeTokens.length,
    totalFiles: validFiles.length,
    totalSize
  }
}

/**
 * Inicia el sistema de limpieza automática de archivos
 */
export const startFileCleanup = () => {
  console.log('🧹 Iniciando sistema de limpieza automática de archivos...')
  
  // Limpiar archivos expirados cada 5 segundos para testing
  // En producción sería cada 24 horas: 24 * 60 * 60 * 1000
  const cleanupInterval = setInterval(async () => {
    try {
      const result = await cleanupExpiredFiles()
      if (result.deletedFiles > 0 || result.deletedTokens > 0) {
        console.log(`✅ Limpieza automática: ${result.deletedFiles} archivos y ${result.deletedTokens} tokens eliminados`)
      }
    } catch (error) {
      console.error('❌ Error en limpieza automática:', error)
    }
  }, 5000) // Cada 5 segundos para testing
  
  console.log('✅ Sistema de limpieza automática iniciado')
  
  // Retornar función para detener la limpieza
  return () => {
    clearInterval(cleanupInterval)
    console.log('🛑 Sistema de limpieza automática detenido')
  }
}
