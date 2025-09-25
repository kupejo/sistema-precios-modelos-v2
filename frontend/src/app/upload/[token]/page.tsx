'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UploadPageProps {
  // Props para la página de upload
}

interface UploadToken {
  id: string
  ticketId: string
  token: string
  expiresAt: string
  maxFiles: number
  maxFileSize: number
  allowedTypes: string[]
  createdAt: string
  isActive: boolean
}

interface UploadedFile {
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

export default function UploadPage({}: UploadPageProps) {
  const params = useParams()
  const token = params.token as string
  
  const [tokenInfo, setTokenInfo] = useState<UploadToken | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const validateToken = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Simular validación del token
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simular token válido
      const mockToken: UploadToken = {
        id: `token_${Date.now()}`,
        ticketId: `ticket_${Date.now()}`,
        token: token,
        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 días
        maxFiles: 5,
        maxFileSize: 50, // 50MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'application/pdf'],
        createdAt: new Date().toISOString(),
        isActive: true
      }
      
      setTokenInfo(mockToken)
      console.log('🔍 UploadPage - Token validado:', mockToken)
      
    } catch (error) {
      console.error('Error validando token:', error)
      setError('Token inválido o expirado')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    validateToken()
  }, [token])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError('')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !tokenInfo) return

    try {
      setUploading(true)
      setError('')
      
      // Validar tamaño del archivo
      if (selectedFile.size > tokenInfo.maxFileSize * 1024 * 1024) {
        setError(`El archivo es demasiado grande. Máximo permitido: ${tokenInfo.maxFileSize}MB`)
        return
      }
      
      // Validar tipo de archivo
      if (!tokenInfo.allowedTypes.includes(selectedFile.type)) {
        setError(`Tipo de archivo no permitido. Tipos permitidos: ${tokenInfo.allowedTypes.join(', ')}`)
        return
      }
      
      // Simular subida de archivo
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Crear archivo simulado
      const uploadedFile: UploadedFile = {
        id: `file_${Date.now()}`,
        tokenId: tokenInfo.id,
        ticketId: tokenInfo.ticketId,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
        uploadedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        downloadUrl: `#download_${Date.now()}`
      }
      
      setUploadedFiles(prev => [...prev, uploadedFile])
      setSelectedFile(null)
      setSuccess(`Archivo "${selectedFile.name}" subido exitosamente`)
      
      // Limpiar input de archivo
      const fileInput = document.getElementById('file-input') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      
      console.log('🔍 UploadPage - Archivo subido:', uploadedFile)
      
    } catch (error) {
      console.error('Error subiendo archivo:', error)
      setError('Error al subir el archivo')
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('es-ES')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Validando token de subida...</p>
        </div>
      </div>
    )
  }

  if (error && !tokenInfo) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <ModernCard variant="elevated" className="max-w-md w-full">
          <ModernCardHeader>
            <ModernCardTitle icon={
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            }>
              Error de Acceso
            </ModernCardTitle>
          </ModernCardHeader>
          <ModernCardContent>
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                El token de subida no es válido o ha expirado.
              </p>
            </div>
          </ModernCardContent>
        </ModernCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Subida de Archivos</h1>
          <p className="text-gray-400">Token: {token}</p>
        </div>

        {/* Token Info */}
        {tokenInfo && (
          <ModernCard variant="elevated" className="mb-6">
            <ModernCardHeader>
              <ModernCardTitle icon={
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }>
                Información del Token
              </ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Ticket ID</label>
                  <p className="text-white font-mono">{tokenInfo.ticketId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Expira</label>
                  <p className="text-white">{formatDate(tokenInfo.expiresAt)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Máximo de archivos</label>
                  <p className="text-white">{tokenInfo.maxFiles}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Tamaño máximo</label>
                  <p className="text-white">{tokenInfo.maxFileSize}MB</p>
                </div>
              </div>
            </ModernCardContent>
          </ModernCard>
        )}

        {/* Upload Form */}
        <ModernCard variant="elevated" className="mb-6">
          <ModernCardHeader>
            <ModernCardTitle icon={
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            }>
              Subir Archivo
            </ModernCardTitle>
          </ModernCardHeader>
          <ModernCardContent>
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg mb-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg mb-4">
                <p className="text-sm text-green-400">{success}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Seleccionar Archivo
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  accept={tokenInfo?.allowedTypes.join(',')}
                />
              </div>

              {selectedFile && (
                <div className="p-3 bg-gray-700 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-2">Archivo Seleccionado:</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-300">Nombre: {selectedFile.name}</p>
                    <p className="text-sm text-gray-300">Tamaño: {formatFileSize(selectedFile.size)}</p>
                    <p className="text-sm text-gray-300">Tipo: {selectedFile.type}</p>
                  </div>
                </div>
              )}

              <ModernButton
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                loading={uploading}
                variant="primary"
                className="w-full"
              >
                {uploading ? 'Subiendo...' : 'Subir Archivo'}
              </ModernButton>
            </div>
          </ModernCardContent>
        </ModernCard>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <ModernCard variant="elevated">
            <ModernCardHeader>
              <ModernCardTitle icon={
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }>
                Archivos Subidos ({uploadedFiles.length})
              </ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent>
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">{file.fileName}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-400">{formatFileSize(file.fileSize)}</span>
                          <span className="text-xs text-gray-400">{file.fileType}</span>
                          <span className="text-xs text-gray-400">
                            Subido: {formatDate(file.uploadedAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                          Subido
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ModernCardContent>
          </ModernCard>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="text-sm font-medium text-blue-400 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Instrucciones
          </h4>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• Selecciona un archivo de tu dispositivo</p>
            <p>• El archivo se subirá automáticamente al ticket correspondiente</p>
            <p>• Los archivos se eliminarán automáticamente después de 10 días</p>
            <p>• Tipos de archivo permitidos: Imágenes, Videos, PDFs</p>
          </div>
        </div>
      </div>
    </div>
  )
}
