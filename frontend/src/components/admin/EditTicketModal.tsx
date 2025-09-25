import React, { useState, useEffect } from 'react'
import { Ticket, updateTicketStatus } from '@/lib/dataService'
import { ModernButton } from '@/components/ui/ModernButton'
import { ModernInput } from '@/components/ui/ModernInput'

interface EditTicketModalProps {
  ticket: Ticket | null
  onClose: () => void
  onSuccess: () => void
}

export function EditTicketModal({ ticket, onClose, onSuccess }: EditTicketModalProps) {
  const [formData, setFormData] = useState({
    status: '',
    priority: '',
    title: '',
    description: '',
    price: 0
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (ticket) {
      setFormData({
        status: ticket.status,
        priority: ticket.priority,
        title: ticket.title,
        description: ticket.description,
        price: ticket.price
      })
    }
  }, [ticket])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticket) return

    try {
      setLoading(true)
      
      // Actualizar estado si cambió
      if (formData.status !== ticket.status) {
        await updateTicketStatus(ticket.id, formData.status)
      }
      
      // Aquí podrías agregar más actualizaciones como título, descripción, etc.
      // Por ahora solo actualizamos el estado
      
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error actualizando ticket:', error)
      alert('Error al actualizar el ticket')
    } finally {
      setLoading(false)
    }
  }

  if (!ticket) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Editar Ticket</h2>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">ID del Ticket</label>
              <div className="px-3 py-2 bg-gray-700 rounded-lg text-white text-sm">
                {ticket.ticket_id}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Servicio</label>
              <div className="px-3 py-2 bg-gray-700 rounded-lg text-white text-sm">
                {ticket.type}
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="space-y-4">
            <ModernInput
              label="Título"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Título del ticket"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción del ticket"
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="pending">Pendiente</option>
                  <option value="in_progress">En Progreso</option>
                  <option value="completed">Completado</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prioridad</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>

            <ModernInput
              label="Precio"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
              placeholder="0"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <ModernButton
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </ModernButton>
            <ModernButton
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </ModernButton>
          </div>
        </form>
      </div>
    </div>
  )
}
