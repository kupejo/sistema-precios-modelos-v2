'use client'

import { useState, useEffect, useCallback } from 'react'
import { ModernCard, ModernCardContent } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'
import { Chatter, getTicketsByChatter, cancelTicket, completeTicket, deleteTicketById, canChatterEditTicket, getTicketAuditLog, TicketAuditLog, debugLocalStorage, testTicketAuditSystem } from '@/lib/dataService'
import { CreateTicketModal } from './CreateTicketModal'
import { TicketDetailModal } from './TicketDetailModal'
import { EditTicketModal } from './EditTicketModal'

interface ChatterTicketsProps {
  chatter: Chatter
  onNavigateToSection?: (section: string) => void
}

export function ChatterTickets({ chatter }: ChatterTicketsProps) {
  const [tickets, setTickets] = useState<any[]>([])
  const [filteredTickets, setFilteredTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAuditModal, setShowAuditModal] = useState(false)
  const [ticketAuditLog, setTicketAuditLog] = useState<TicketAuditLog[]>([])
  const [ticketPermissions, setTicketPermissions] = useState<Record<string, boolean>>({})

  const loadTickets = useCallback(async () => {
    try {
      setLoading(true)
      
      // Usar la nueva función específica para obtener tickets del chatter
      const chatterTickets = await getTicketsByChatter(chatter.chatter_id)
      
      // Ordenar por fecha de creación (más recientes primero)
      chatterTickets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      
      setTickets(chatterTickets)
      
    } catch (error) {
      console.error('Error cargando tickets:', error)
    } finally {
      setLoading(false)
    }
  }, [chatter.chatter_id])

  const filterTickets = useCallback(() => {
    if (statusFilter === 'all') {
      setFilteredTickets(tickets)
    } else {
      setFilteredTickets(tickets.filter(ticket => ticket.status === statusFilter))
    }
  }, [statusFilter, tickets])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente'
      case 'in_progress':
        return 'En Progreso'
      case 'completed':
        return 'Completado'
      case 'cancelled':
        return 'Cancelado'
      default:
        return status
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

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta'
      case 'medium':
        return 'Media'
      case 'low':
        return 'Baja'
      default:
        return priority
    }
  }

  const handleCreateTicket = () => {
    setShowCreateModal(true)
  }

  const handleCreateSuccess = () => {
    setShowCreateModal(false)
    loadTickets() // Recargar la lista de tickets
  }

  const handleViewDetails = (ticket: any) => {
    setSelectedTicket(ticket)
    setShowDetailModal(true)
  }

  const handleCancelTicket = async (ticketId: string) => {
    try {
      await cancelTicket(ticketId)
      alert('Ticket cancelado exitosamente.')
      loadTickets() // Recargar la lista
      setShowDetailModal(false)
    } catch (error) {
      console.error('Error cancelando ticket:', error)
      alert('Error al cancelar el ticket.')
    }
  }

  const handleCompleteTicket = async (ticketId: string) => {
    try {
      await completeTicket(ticketId, chatter.fullname || chatter.username)
      await loadTickets()
      alert('Ticket completado exitosamente')
    } catch (error) {
      console.error('Error completando ticket:', error)
      alert('Error al completar el ticket')
    }
  }

  const handleDeleteTicket = async (ticketId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este ticket? Esta acción no se puede deshacer.')) {
      try {
        await deleteTicketById(ticketId, chatter.fullname || chatter.username)
        await loadTickets()
        alert('Ticket eliminado exitosamente')
      } catch (error) {
        console.error('Error eliminando ticket:', error)
        alert('Error al eliminar el ticket')
      }
    }
  }

  const handleEditTicket = (ticket: any) => {
    setSelectedTicket(ticket)
    setShowEditModal(true)
  }

  const handleViewAudit = async (ticketId: string) => {
    try {
      const auditLog = await getTicketAuditLog(ticketId)
      setTicketAuditLog(auditLog)
      setShowAuditModal(true)
    } catch (error) {
      console.error('Error cargando bitácora:', error)
      alert('Error al cargar la bitácora del ticket')
    }
  }

  const checkTicketPermissions = useCallback(async (ticketId: string) => {
    try {
      const canEdit = await canChatterEditTicket(chatter.id, ticketId)
      setTicketPermissions(prev => ({ ...prev, [ticketId]: canEdit }))
    } catch (error) {
      console.error('Error verificando permisos:', error)
      setTicketPermissions(prev => ({ ...prev, [ticketId]: false }))
    }
  }, [chatter.id])

  useEffect(() => {
    loadTickets()
  }, [chatter.id, loadTickets])

  useEffect(() => {
    // Verificar permisos para cada ticket cuando se cargan
    tickets.forEach(ticket => {
      checkTicketPermissions(ticket.id)
    })
  }, [tickets, checkTicketPermissions])

  useEffect(() => {
    filterTickets()
  }, [tickets, statusFilter, filterTickets])

  // Funciones auxiliares para formatear campos en la bitácora
  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      title: 'Título',
      description: 'Descripción',
      type: 'Tipo de Servicio',
      priority: 'Prioridad',
      price: 'Precio',
      deadline: 'Fecha Límite'
    }
    return labels[field] || field
  }

  const formatFieldValue = (field: string, value: any): string => {
    if (value === null || value === undefined || value === '') return 'No especificado'
    
    if (field === 'price') {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    }
    
    if (field === 'deadline') {
      return new Date(value).toLocaleDateString('es-ES')
    }
    
    if (field === 'priority') {
      const priorityLabels: Record<string, string> = {
        low: 'Baja',
        medium: 'Media',
        high: 'Alta',
        urgent: 'Urgente'
      }
      return priorityLabels[value] || value
    }
    
    if (field === 'type') {
      const typeLabels: Record<string, string> = {
        videollamada: 'Videollamada',
        video_personalizado: 'Video Personalizado',
        fotos_personalizadas: 'Fotos Personalizadas',
        contenido_boveda: 'Contenido Bóveda',
        otro: 'Otro'
      }
      return typeLabels[value] || value
    }
    
    return String(value)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Mis Tickets</h1>
          <p className="text-gray-400">
            Tienes {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} en total
          </p>
        </div>
        
        <div className="flex gap-2">
          <ModernButton
            variant="outline"
            onClick={() => debugLocalStorage()}
            className="text-xs"
          >
            🔍 Debug Storage
          </ModernButton>
          <ModernButton
            variant="outline"
            onClick={() => testTicketAuditSystem()}
            className="text-xs"
          >
            🧪 Test Bitácora
          </ModernButton>
          <ModernButton
            variant="primary"
            onClick={handleCreateTicket}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Ticket
          </ModernButton>
        </div>
      </div>

      {/* Filters */}
      <ModernCard variant="outlined">
        <ModernCardContent className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-300">Filtrar por estado:</span>
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'Todos' },
                { value: 'pending', label: 'Pendientes' },
                { value: 'in_progress', label: 'En Progreso' },
                { value: 'completed', label: 'Completados' },
                { value: 'cancelled', label: 'Cancelados' }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    statusFilter === filter.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </ModernCardContent>
      </ModernCard>

      {/* Tickets List */}
      {filteredTickets.length > 0 ? (
        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <ModernCard key={ticket.id} variant="elevated">
              <ModernCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {/* Header con título y badges */}
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-white truncate">{ticket.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(ticket.status)}`}>
                        {getStatusLabel(ticket.status)}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {getPriorityLabel(ticket.priority)}
                      </span>
                    </div>
                    
                    {/* Información compacta en una sola línea */}
                    <div className="flex items-center gap-6 text-sm text-gray-300 mb-2">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>{getTypeLabel(ticket.type)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{ticket.modelo_name}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span>${ticket.price.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                      </div>

                      {ticket.deadline && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className={new Date(ticket.deadline) < new Date() ? 'text-red-400' : 'text-gray-300'}>
                            {new Date(ticket.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Descripción truncada si existe */}
                    {ticket.description && (
                      <p className="text-sm text-gray-400 truncate">
                        {ticket.description.length > 100 
                          ? `${ticket.description.substring(0, 100)}...` 
                          : ticket.description
                        }
                      </p>
                    )}
                  </div>

                  {/* Botones de acción con iconos */}
                  <div className="flex items-center gap-2 ml-4">
                    {/* Ver detalles */}
                    <button
                      onClick={() => handleViewDetails(ticket)}
                      className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
                      title="Ver Detalles"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    
                    {/* Botones de acción basados en permisos y estado */}
                    {ticketPermissions[ticket.id] && (
                      <>
                        {/* Completar */}
                        {ticket.status === 'pending' && (
                          <button
                            onClick={() => handleCompleteTicket(ticket.id)}
                            className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 transition-colors"
                            title="Completar"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}
                        
                        {/* Editar */}
                        {(ticket.status === 'pending' || ticket.status === 'in_progress') && (
                          <button
                            onClick={() => handleEditTicket(ticket)}
                            className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 transition-colors"
                            title="Editar"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                        
                        {/* Bitácora */}
                        <button
                          onClick={() => handleViewAudit(ticket.id)}
                          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
                          title="Bitácora"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                        
                        {/* Cancelar */}
                        <button
                          onClick={() => {
                            if (confirm('¿Estás seguro de que quieres cancelar este ticket?')) {
                              handleCancelTicket(ticket.ticket_id)
                            }
                          }}
                          className="p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 hover:text-yellow-300 transition-colors"
                          title="Cancelar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        
                        {/* Eliminar */}
                        <button
                          onClick={() => handleDeleteTicket(ticket.id)}
                          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors"
                          title="Eliminar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </>
                    )}
                    
                    {/* Mostrar mensaje si no tiene permisos */}
                    {!ticketPermissions[ticket.id] && ticketPermissions[ticket.id] !== undefined && (
                      <div className="text-xs text-gray-500 px-2">
                        Sin permisos
                      </div>
                    )}
                  </div>
                </div>
              </ModernCardContent>
            </ModernCard>
          ))}
        </div>
      ) : (
        <ModernCard variant="elevated">
          <ModernCardContent className="text-center py-12">
            <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">
              {statusFilter === 'all' ? 'No tienes tickets aún' : `No hay tickets ${getStatusLabel(statusFilter).toLowerCase()}`}
            </h3>
            <p className="text-gray-400 mb-6">
              {statusFilter === 'all' 
                ? 'Crea tu primer ticket para comenzar a trabajar con los modelos.'
                : 'Cambia el filtro para ver otros tickets.'
              }
            </p>
            {statusFilter === 'all' && (
              <ModernButton
                variant="primary"
                onClick={handleCreateTicket}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear Primer Ticket
              </ModernButton>
            )}
          </ModernCardContent>
        </ModernCard>
      )}

      {/* Modales */}
      {showCreateModal && (
        <CreateTicketModal
          chatter={chatter}
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {showDetailModal && selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => setShowDetailModal(false)}
          onCancel={() => handleCancelTicket(selectedTicket.ticket_id)}
        />
      )}

      {showEditModal && selectedTicket && (
        <EditTicketModal
          ticket={selectedTicket}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false)
            loadTickets()
          }}
        />
      )}

      {showAuditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header mejorado */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-750">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Bitácora del Ticket</h2>
                  <p className="text-sm text-gray-400">Historial completo de cambios y modificaciones</p>
                </div>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {ticketAuditLog.length === 0 ? (
                <div className="text-center py-12">
                  <div className="p-4 bg-gray-700/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Sin historial</h3>
                  <p className="text-gray-400">No hay entradas en la bitácora para este ticket.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Timeline de cambios */}
                  <div className="relative">
                    {ticketAuditLog.map((entry, index) => {
                      const getActionIcon = (action: string) => {
                        switch (action) {
                          case 'TICKET_CREATED':
                            return (
                              <div className="p-2 bg-green-500/20 rounded-full">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </div>
                            )
                          case 'TICKET_UPDATED':
                            return (
                              <div className="p-2 bg-blue-500/20 rounded-full">
                                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </div>
                            )
                          case 'TICKET_COMPLETED':
                            return (
                              <div className="p-2 bg-emerald-500/20 rounded-full">
                                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )
                          case 'TICKET_DELETED':
                            return (
                              <div className="p-2 bg-red-500/20 rounded-full">
                                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </div>
                            )
                          default:
                            return (
                              <div className="p-2 bg-gray-500/20 rounded-full">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            )
                        }
                      }

                      const getActionLabel = (action: string) => {
                        switch (action) {
                          case 'TICKET_CREATED': return 'Ticket Creado'
                          case 'TICKET_UPDATED': return 'Ticket Actualizado'
                          case 'TICKET_COMPLETED': return 'Ticket Completado'
                          case 'TICKET_DELETED': return 'Ticket Eliminado'
                          default: return action
                        }
                      }

                      const getActionColor = (action: string) => {
                        switch (action) {
                          case 'TICKET_CREATED': return 'border-green-500/30 bg-green-500/5'
                          case 'TICKET_UPDATED': return 'border-blue-500/30 bg-blue-500/5'
                          case 'TICKET_COMPLETED': return 'border-emerald-500/30 bg-emerald-500/5'
                          case 'TICKET_DELETED': return 'border-red-500/30 bg-red-500/5'
                          default: return 'border-gray-500/30 bg-gray-500/5'
                        }
                      }

                      return (
                        <div key={entry.id} className="relative flex gap-4">
                          {/* Línea conectora */}
                          {index < ticketAuditLog.length - 1 && (
                            <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-600"></div>
                          )}
                          
                          {/* Icono de acción */}
                          <div className="flex-shrink-0 mt-1">
                            {getActionIcon(entry.action)}
                          </div>
                          
                          {/* Contenido de la entrada */}
                          <div className={`flex-1 p-4 rounded-lg border ${getActionColor(entry.action)}`}>
                            {/* Header de la entrada */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-white">{getActionLabel(entry.action)}</h4>
                                <span className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full">
                                  {entry.changedBy}
                                </span>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-white">
                                  {new Date(entry.timestamp).toLocaleDateString('es-ES')}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {new Date(entry.timestamp).toLocaleTimeString('es-ES')}
                                </div>
                              </div>
                            </div>
                            
                            {/* Detalles de cambios */}
                            {entry.details && (
                              <div className="mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                                <h5 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Detalles del Cambio
                                </h5>
                                <div className="text-sm text-gray-300 font-mono bg-gray-900/50 p-2 rounded border">
                                  {entry.details}
                                </div>
                              </div>
                            )}
                            
                            {/* Información adicional si hay valores antiguos y nuevos */}
                            {entry.oldValues && entry.newValues && Object.keys(entry.oldValues).length > 0 && (
                              <div className="mt-3">
                                <h5 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Campos Modificados
                                </h5>
                                <div className="space-y-3">
                                  {Object.entries(entry.oldValues)
                                    .filter(([key]) => ['title', 'description', 'type', 'priority', 'price', 'deadline'].includes(key))
                                    .map(([key, oldValue]) => {
                                    const newValue = entry.newValues[key]
                                    const fieldLabel = getFieldLabel(key)
                                    return (
                                      <div key={key} className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium text-gray-300">{fieldLabel}</span>
                                          <span className="text-xs text-gray-500 uppercase tracking-wide">{key}</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                          <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                                            <span className="text-xs text-gray-400">Antes:</span>
                                            <span className="text-sm text-red-300 font-medium">{formatFieldValue(key, oldValue)}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                            <span className="text-xs text-gray-400">Después:</span>
                                            <span className="text-sm text-green-300 font-medium">{formatFieldValue(key, newValue)}</span>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )}
                            
                            {/* Mostrar valores nuevos si no hay valores antiguos (creación) */}
                            {!entry.oldValues && entry.newValues && Object.keys(entry.newValues).length > 0 && (
                              <div className="mt-3">
                                <h5 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Información del Ticket
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {Object.entries(entry.newValues)
                                    .filter(([key]) => ['title', 'description', 'type', 'priority', 'price', 'deadline'].includes(key))
                                    .map(([key, value]) => (
                                    <div key={key} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-green-400">{getFieldLabel(key)}</span>
                                        <span className="text-xs text-gray-500 uppercase tracking-wide">{key}</span>
                                      </div>
                                      <span className="text-sm text-green-300">{formatFieldValue(key, value)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Mostrar valores antiguos si no hay valores nuevos (eliminación) */}
                            {entry.oldValues && !entry.newValues && Object.keys(entry.oldValues).length > 0 && (
                              <div className="mt-3">
                                <h5 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Información del Ticket Eliminado
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {Object.entries(entry.oldValues)
                                    .filter(([key]) => ['title', 'description', 'type', 'priority', 'price', 'deadline'].includes(key))
                                    .map(([key, value]) => (
                                    <div key={key} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-red-400">{getFieldLabel(key)}</span>
                                        <span className="text-xs text-gray-500 uppercase tracking-wide">{key}</span>
                                      </div>
                                      <span className="text-sm text-red-300">{formatFieldValue(key, value)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
