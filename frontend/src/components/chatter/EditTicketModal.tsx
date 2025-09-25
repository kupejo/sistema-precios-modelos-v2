'use client'

import { useState, useEffect, useCallback } from 'react'
import { ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'
import { ModernInput } from '@/components/ui/ModernInput'
import { updateTicket, getModels } from '@/lib/dataService'

interface EditTicketModalProps {
  ticket: any
  onClose: () => void
  onSuccess: () => void
}

export function EditTicketModal({ ticket, onClose, onSuccess }: EditTicketModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    priority: '',
    price: 0,
    deadline: ''
  })
  const [models, setModels] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const loadModels = useCallback(async () => {
    try {
      const modelsData = await getModels()
      setModels(modelsData)
    } catch (error) {
      console.error('Error cargando modelos:', error)
    }
  }, [])

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title || '',
        description: ticket.description || '',
        type: ticket.type || '',
        priority: ticket.priority || '',
        price: ticket.price || 0,
        deadline: ticket.deadline || ''
      })
    }
    loadModels()
  }, [ticket, loadModels])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.type) {
      alert('Por favor completa los campos obligatorios')
      return
    }

    try {
      setLoading(true)
      
      const updateData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        priority: formData.priority,
        price: formData.price,
        deadline: formData.deadline
      }
      
      await updateTicket(ticket.id, updateData)
      alert('Ticket actualizado exitosamente')
      onSuccess()
    } catch (error) {
      console.error('Error actualizando ticket:', error)
      alert('Error al actualizar el ticket')
    } finally {
      setLoading(false)
    }
  }

  // const getTypeLabel = (type: string) => {
  //   const types: Record<string, string> = {
  //     'videollamada': 'Videollamada',
  //     'video_personalizado': 'Video Personalizado',
  //     'fotos_personalizadas': 'Fotos Personalizadas',
  //     'contenido_boveda': 'Contenido Bóveda',
  //     'otro': 'Otro'
  //   }
  //   return types[type] || type
  // }

  // const getPriorityLabel = (priority: string) => {
  //   const priorities: Record<string, string> = {
  //     'low': 'Baja',
  //     'medium': 'Media',
  //     'high': 'Alta',
  //     'urgent': 'Urgente'
  //   }
  //   return priorities[priority] || priority
  // }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ModernCardHeader>
          <ModernCardTitle icon={
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }>
            Editar Ticket
          </ModernCardTitle>
        </ModernCardHeader>

        <form onSubmit={handleSubmit}>
          <ModernCardContent>
            <div className="space-y-6">
              {/* Información del ticket actual */}
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-sm font-medium text-white mb-2">Información Actual</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">ID:</span>
                    <span className="text-white ml-2 font-mono">{ticket.ticket_id}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Modelo:</span>
                    <span className="text-white ml-2">{ticket.modelo_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Estado:</span>
                    <span className="text-white ml-2">{ticket.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Creado:</span>
                    <span className="text-white ml-2">
                      {new Date(ticket.created_at).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Campos editables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModernInput
                  label="Título *"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Título del ticket"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Tipo de Servicio *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="videollamada">Videollamada</option>
                    <option value="video_personalizado">Video Personalizado</option>
                    <option value="fotos_personalizadas">Fotos Personalizadas</option>
                    <option value="contenido_boveda">Contenido Bóveda</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Prioridad</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>

                <ModernInput
                  label="Precio"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />

                <ModernInput
                  label="Fecha Límite"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descripción detallada del ticket"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                />
              </div>
            </div>
          </ModernCardContent>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-700">
            <ModernButton
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </ModernButton>
            <ModernButton
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Actualizando...' : 'Actualizar Ticket'}
            </ModernButton>
          </div>
        </form>
      </div>
    </div>
  )
}
