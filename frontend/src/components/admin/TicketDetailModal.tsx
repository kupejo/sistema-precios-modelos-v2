import React, { useState, useEffect, useCallback } from 'react'
import { Ticket, getTicketAuditLog, TicketAuditLog } from '@/lib/dataService'
import { ModernButton } from '@/components/ui/ModernButton'

interface TicketDetailModalProps {
  ticket: Ticket | null
  onClose: () => void
}

export function TicketDetailModal({ ticket, onClose }: TicketDetailModalProps) {
  const [auditLog, setAuditLog] = useState<TicketAuditLog[]>([])
  const [loadingAudit, setLoadingAudit] = useState(false)
  const [showAudit, setShowAudit] = useState(false)

  const loadAuditLog = useCallback(async () => {
    if (!ticket) return
    
    try {
      setLoadingAudit(true)
      const auditData = await getTicketAuditLog(ticket.id)
      setAuditLog(auditData)
    } catch (error) {
      console.error('Error cargando bitácora:', error)
    } finally {
      setLoadingAudit(false)
    }
  }, [ticket])

  const handleToggleAudit = useCallback(() => {
    setShowAudit(prev => {
      const newShowAudit = !prev
      if (newShowAudit && ticket && auditLog.length === 0) {
        loadAuditLog()
      }
      return newShowAudit
    })
  }, [ticket, auditLog.length, loadAuditLog])

  // Cargar bitácora solo cuando el modal se abre por primera vez
  useEffect(() => {
    if (ticket && showAudit && auditLog.length === 0) {
      loadAuditLog()
    }
  }, [ticket, showAudit, auditLog.length, loadAuditLog])

  // Resetear estado cuando el modal se cierra
  useEffect(() => {
    if (!ticket) {
      setShowAudit(false)
      setAuditLog([])
      setLoadingAudit(false)
    }
  }, [ticket])

  if (!ticket) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400'
      case 'completed':
        return 'bg-green-500/20 text-green-400'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'low':
        return 'bg-green-500/20 text-green-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getTypeLabel = (type: string) => {
    const typeLabels: { [key: string]: string } = {
      'videollamada': 'Videollamada',
      'video_personalizado': 'Video Personalizado',
      'fotos_personalizadas': 'Fotos Personalizadas',
      'contenido_boveda': 'Contenido Bóveda'
    }
    return typeLabels[type] || type
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'created':
        return '📝'
      case 'updated':
        return '✏️'
      case 'status_changed':
        return '🔄'
      case 'completed':
        return '✅'
      case 'cancelled':
        return '❌'
      case 'deleted':
        return '🗑️'
      default:
        return '📋'
    }
  }

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'created':
        return 'Ticket Creado'
      case 'updated':
        return 'Ticket Actualizado'
      case 'status_changed':
        return 'Estado Cambiado'
      case 'completed':
        return 'Ticket Completado'
      case 'cancelled':
        return 'Ticket Cancelado'
      case 'deleted':
        return 'Ticket Eliminado'
      default:
        return action
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'created':
        return 'bg-green-500/20 text-green-400'
      case 'updated':
        return 'bg-blue-500/20 text-blue-400'
      case 'status_changed':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'completed':
        return 'bg-green-500/20 text-green-400'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400'
      case 'deleted':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">Detalles del Ticket</h2>
            <p className="text-sm text-gray-400">ID: {ticket.ticket_id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Ticket Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Información del Ticket</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Título</label>
                  <p className="text-sm text-white">{ticket.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Tipo de Servicio</label>
                  <p className="text-sm text-white">{getTypeLabel(ticket.type)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Estado</label>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                    {ticket.status === 'pending' ? 'Pendiente' :
                     ticket.status === 'in_progress' ? 'En Progreso' :
                     ticket.status === 'completed' ? 'Completado' :
                     ticket.status === 'cancelled' ? 'Cancelado' : ticket.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Prioridad</label>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority === 'high' ? 'Alta' :
                     ticket.priority === 'medium' ? 'Media' :
                     ticket.priority === 'low' ? 'Baja' : ticket.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Precio</label>
                  <p className="text-sm text-white">${ticket.price.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Fecha de Creación</label>
                  <p className="text-sm text-white">{new Date(ticket.created_at).toLocaleString()}</p>
                </div>
                {ticket.updated_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Última Actualización</label>
                    <p className="text-sm text-white">{new Date(ticket.updated_at).toLocaleString()}</p>
                  </div>
                )}
                {ticket.deadline && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Fecha Límite</label>
                    <p className="text-sm text-white">{new Date(ticket.deadline).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Información de Participantes</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Modelo</label>
                  <div className="p-2 bg-gray-700/50 rounded-lg">
                    <p className="text-sm font-medium text-white">{ticket.modelo_name}</p>
                    <p className="text-xs text-gray-400">ID: {ticket.modelo_id}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Chatter</label>
                  <div className="p-2 bg-gray-700/50 rounded-lg">
                    <p className="text-sm font-medium text-white">{ticket.chatter_name}</p>
                    <p className="text-xs text-gray-400">ID: {ticket.chatter_id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {ticket.description && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Descripción</h3>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <p className="text-sm text-white whitespace-pre-wrap">{ticket.description}</p>
              </div>
            </div>
          )}

          {/* Audit Log */}
          {showAudit && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Bitácora del Ticket</h3>
              <div className="space-y-3">
                {loadingAudit ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-gray-400">Cargando bitácora...</span>
                  </div>
                ) : auditLog.length > 0 ? (
                  auditLog.map((entry) => (
                    <div key={entry.id} className="p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getActionIcon(entry.action)}</span>
                          <div>
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getActionColor(entry.action)}`}>
                              {getActionLabel(entry.action)}
                            </span>
                            <p className="text-sm text-gray-400 mt-1">
                              {new Date(entry.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {entry.changedBy && (
                          <span className="text-xs text-gray-400">
                            Por: {entry.changedBy}
                          </span>
                        )}
                      </div>
                      
                      {entry.details && (
                        <p className="text-sm text-gray-300 mb-2">{entry.details}</p>
                      )}
                      
                      {(entry.oldValues || entry.newValues) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-600">
                          {entry.oldValues && Object.keys(entry.oldValues).length > 0 && (
                            <div>
                              <h4 className="text-xs font-medium text-red-400 mb-2">Valores Anteriores</h4>
                              <div className="space-y-1">
                                {Object.entries(entry.oldValues).map(([key, value]) => (
                                  <div key={key} className="text-xs">
                                    <span className="text-gray-400">{key}:</span>
                                    <span className="text-red-300 ml-2">{String(value)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {entry.newValues && Object.keys(entry.newValues).length > 0 && (
                            <div>
                              <h4 className="text-xs font-medium text-green-400 mb-2">Valores Nuevos</h4>
                              <div className="space-y-1">
                                {Object.entries(entry.newValues).map(([key, value]) => (
                                  <div key={key} className="text-xs">
                                    <span className="text-gray-400">{key}:</span>
                                    <span className="text-green-300 ml-2">{String(value)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-400">No hay registros en la bitácora para este ticket</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <ModernButton
              variant="outline"
              onClick={handleToggleAudit}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {showAudit ? 'Ocultar Bitácora' : 'Ver Bitácora'}
            </ModernButton>
            
            <div className="flex gap-3">
              <ModernButton
                variant="outline"
                onClick={onClose}
              >
                Cerrar
              </ModernButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
