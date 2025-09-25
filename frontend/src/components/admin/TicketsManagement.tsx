'use client'

import { useState, useEffect } from 'react'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'
import { TicketDetailModal } from './TicketDetailModal'
import { EditTicketModal } from './EditTicketModal'
import { Ticket, getTickets, updateTicketStatus } from '@/lib/dataService'

interface TicketsManagementProps {
  refreshTrigger?: number
}

export function TicketsManagement({ }: TicketsManagementProps) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      setLoading(true)
      const ticketsData = await getTickets()
      setTickets(ticketsData)
    } catch (error) {
      console.error('Error cargando tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    try {
      setActionLoading(ticketId)
      await updateTicketStatus(ticketId, newStatus)
      await loadTickets()
    } catch (error) {
      console.error('Error actualizando ticket:', error)
      alert('Error al actualizar el ticket')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Gestión de Tickets</h1>
          <p className="text-gray-400">Administra los tickets del sistema</p>
        </div>
        
        <div className="animate-pulse">
          <div className="h-64 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Gestión de Tickets</h1>
          <p className="text-gray-400">Administra los tickets del sistema</p>
        </div>
        
        <ModernButton variant="primary" size="md">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo Ticket
        </ModernButton>
      </div>

          {/* Tickets Table */}
          <ModernCard>
            <ModernCardHeader>
              <ModernCardTitle>Lista de Tickets ({tickets.length})</ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Ticket</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Modelo</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Chatter</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Tipo</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Prioridad</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Estado</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Precio</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-white">{ticket.ticket_id}</p>
                            <p className="text-xs text-gray-400 truncate max-w-32">{ticket.title}</p>
                          </div>
                        </td>
                        
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-300">{ticket.modelo_name}</span>
                        </td>
                        
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-300">{ticket.chatter_name}</span>
                        </td>
                        
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                            {ticket.type}
                          </span>
                        </td>
                        
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded ${
                            ticket.priority === 'high' 
                              ? 'bg-red-500/20 text-red-400'
                              : ticket.priority === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {ticket.priority}
                          </span>
                        </td>
                        
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded ${
                            ticket.status === 'completed' 
                              ? 'bg-green-500/20 text-green-400'
                              : ticket.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-300">${ticket.price}</span>
                        </td>
                        
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {ticket.status === 'pending' && (
                              <ModernButton
                                variant="primary"
                                size="sm"
                                onClick={() => handleStatusChange(ticket.id, 'completed')}
                                disabled={actionLoading === ticket.id}
                              >
                                {actionLoading === ticket.id ? 'Procesando...' : 'Completar'}
                              </ModernButton>
                            )}
                            
                            <ModernButton
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedTicket(ticket)}
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Ver
                            </ModernButton>
                            
                            <ModernButton
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingTicket(ticket)}
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Editar
                            </ModernButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ModernCardContent>
          </ModernCard>

          {/* Ticket Detail Modal */}
          {selectedTicket && (
            <TicketDetailModal
              ticket={selectedTicket}
              onClose={() => setSelectedTicket(null)}
            />
          )}

          {/* Edit Ticket Modal */}
          {editingTicket && (
            <EditTicketModal
              ticket={editingTicket}
              onClose={() => setEditingTicket(null)}
              onSuccess={() => {
                loadTickets()
                setEditingTicket(null)
              }}
            />
          )}
    </div>
  )
}

