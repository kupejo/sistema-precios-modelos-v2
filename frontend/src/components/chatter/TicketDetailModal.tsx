'use client'

import { ModernButton } from '@/components/ui/ModernButton'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { Ticket, getUploadLink } from '@/lib/dataService'

interface TicketDetailModalProps {
  ticket: Ticket | null
  onClose: () => void
  onEdit?: () => void
  onCancel?: () => void
}

export function TicketDetailModal({ ticket, onClose, onEdit, onCancel }: TicketDetailModalProps) {
  if (!ticket) return null

  const handleGetUploadLink = async () => {
    try {
      const uploadUrl = await getUploadLink(ticket.ticket_id)
      // Copiar al portapapeles
      await navigator.clipboard.writeText(uploadUrl)
      alert('Enlace de subida copiado al portapapeles!')
    } catch (error) {
      console.error('Error obteniendo enlace de subida:', error)
      alert('Error al obtener el enlace de subida.')
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'in_progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'cancelled': 'bg-red-500/20 text-red-400 border-red-500/30',
      'on_hold': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'pending': 'Pendiente',
      'in_progress': 'En Progreso',
      'completed': 'Completado',
      'cancelled': 'Cancelado',
      'on_hold': 'En Espera'
    }
    return labels[status] || status
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'low': 'bg-green-500/20 text-green-400 border-green-500/30',
      'medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'high': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'urgent': 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return colors[priority] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      'low': 'Baja',
      'medium': 'Media',
      'high': 'Alta',
      'urgent': 'Urgente'
    }
    return labels[priority] || priority
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'videollamada': 'Videollamada',
      'video_personalizado': 'Video Personalizado',
      'fotos_personalizadas': 'Fotos Personalizadas',
      'contenido_boveda': 'Contenido Bóveda',
      'otro': 'Otro'
    }
    return labels[type] || type
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'videollamada': 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      'video_personalizado': 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3M7 4H5a1 1 0 00-1 1v14a1 1 0 001 1h2M7 4h10M7 4v16',
      'fotos_personalizadas': 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      'contenido_boveda': 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      'otro': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    }
    return icons[type] || 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <ModernCard className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <ModernCardHeader>
          <div className="flex items-center justify-between">
            <ModernCardTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getTypeIcon(ticket.type)} />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{ticket.title}</h2>
                <p className="text-sm text-gray-400">Ticket #{ticket.ticket_id}</p>
              </div>
            </ModernCardTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </ModernCardHeader>
        
        <ModernCardContent className="space-y-6">
          {/* Estado y Prioridad */}
          <div className="flex flex-wrap gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket.status)}`}>
              {getStatusLabel(ticket.status)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(ticket.priority)}`}>
              {getPriorityLabel(ticket.priority)}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
              {getTypeLabel(ticket.type)}
            </span>
          </div>

          {/* Información del Ticket */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Principal */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Información del Ticket
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-400">Modelo</label>
                  <p className="text-white">{ticket.modelo_name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-400">Precio</label>
                  <p className="text-white text-lg font-semibold">{formatPrice(ticket.price)}</p>
                </div>
                
                {ticket.deadline && (
                  <div>
                    <label className="text-sm font-medium text-gray-400">Fecha Límite</label>
                    <p className="text-white">{formatDate(ticket.deadline)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Fechas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Fechas
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-400">Creado</label>
                  <p className="text-white">{formatDate(ticket.created_at)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-400">Última Actualización</label>
                  <p className="text-white">{formatDate(ticket.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descripción
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-300 whitespace-pre-wrap">{ticket.description}</p>
            </div>
          </div>

          {/* Enlace de Subida */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-blue-400 mb-2">Enlace de Subida para la Modelo</h3>
                <p className="text-sm text-blue-300 mb-3">
                  Genera un enlace específico para este ticket. La modelo usará este enlace para subir el archivo solicitado, y el sistema se encargará de entregarlo automáticamente.
                </p>
                <ModernButton
                  variant="outline"
                  size="sm"
                  onClick={handleGetUploadLink}
                  className="bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Generar y Copiar Enlace
                </ModernButton>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2 mt-2">
                  <p className="text-xs text-yellow-300">
                    <strong>Proceso automatizado:</strong> Una vez que la modelo suba el archivo, el sistema lo entregará automáticamente al chatter. El enlace expira en 10 días.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <ModernButton
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cerrar
            </ModernButton>
            
            {ticket.status === 'pending' && onEdit && (
              <ModernButton
                variant="primary"
                onClick={onEdit}
                className="flex-1"
              >
                Editar Ticket
              </ModernButton>
            )}
            
            {(ticket.status === 'pending' || ticket.status === 'in_progress') && onCancel && (
              <ModernButton
                variant="outline"
                onClick={onCancel}
                className="flex-1 text-red-400 border-red-500/30 hover:bg-red-500/10"
              >
                Cancelar Ticket
              </ModernButton>
            )}
          </div>
        </ModernCardContent>
      </ModernCard>
    </div>
  )
}
