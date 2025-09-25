'use client'

import { useState, useEffect, useCallback } from 'react'
import { ModernButton } from '@/components/ui/ModernButton'
import { ModernInput } from '@/components/ui/ModernInput'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { Chatter, Model, createTicket, createUploadToken } from '@/lib/dataService'

interface CreateTicketModalProps {
  chatter: Chatter
  preselectedModel?: any
  onClose: () => void
  onSuccess: () => void
}

export function CreateTicketModal({ chatter, preselectedModel, onClose, onSuccess }: CreateTicketModalProps) {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    modelo_id: '',
    type: 'videollamada',
    title: '',
    description: '',
    price: 0,
    priority: 'medium',
    deadline: ''
  })
  const [uploadLink, setUploadLink] = useState<string | null>(null)

  const loadModels = useCallback(async () => {
    try {
      // Simular carga de modelos asignados
      const assignedModels = chatter.model_ids.map((modelId, index) => ({
        id: modelId,
        profile_id: modelId,
        modelo: chatter.model_names[index] || `Modelo ${index + 1}`,
        contacto: `Contacto ${index + 1}`,
        apps_selected: ['whatsapp', 'telegram'],
        aprobado: true,
        activo: true,
        eliminado: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }))
      setModels(assignedModels)
      
      // Si hay un modelo preseleccionado, configurarlo
      if (preselectedModel) {
        setFormData(prev => ({
          ...prev,
          modelo_id: preselectedModel.id
        }))
      }
    } catch (error) {
      console.error('Error cargando modelos:', error)
    }
  }, [chatter, preselectedModel])

  // Cargar modelos asignados al chatter
  useEffect(() => {
    loadModels()
  }, [loadModels])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validar que se haya seleccionado un modelo
      if (!formData.modelo_id) {
        alert('Por favor selecciona un modelo.')
        setLoading(false)
        return
      }

      const selectedModel = models.find(m => m.id === formData.modelo_id)
      
      const ticketData = {
        modelo_id: formData.modelo_id,
        modelo_name: selectedModel?.modelo || 'Modelo Desconocido',
        chatter_id: chatter.chatter_id,
        chatter_name: chatter.fullname || chatter.username,
        type: formData.type,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        priority: formData.priority,
        status: 'pending',
        deadline: formData.deadline || ''
      }

      // Crear el ticket usando la función real del dataService
      const newTicket = await createTicket(ticketData)
      
      // Crear token de upload para el ticket
      const { uploadUrl } = await createUploadToken(newTicket.ticket_id)
      setUploadLink(uploadUrl)
      
      console.log('Ticket creado exitosamente:', newTicket)
      alert('Ticket creado exitosamente!')
      onSuccess()
      onClose()
      
    } catch (error) {
      console.error('Error creando ticket:', error)
      alert('Error al crear el ticket. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <ModernCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <ModernCardHeader>
          <ModernCardTitle className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {preselectedModel ? `Crear Ticket para ${preselectedModel.modelo}` : 'Crear Nuevo Ticket'}
          </ModernCardTitle>
        </ModernCardHeader>
        
        <ModernCardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Modelo */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Modelo *
              </label>
              <select
                value={formData.modelo_id}
                onChange={(e) => handleInputChange('modelo_id', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona un modelo</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.modelo}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de servicio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Servicio *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="videollamada">Videollamada</option>
                <option value="video_personalizado">Video Personalizado</option>
                <option value="fotos_personalizadas">Fotos Personalizadas</option>
                <option value="contenido_boveda">Contenido Bóveda</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Título */}
            <ModernInput
              label="Título del Ticket *"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ej: Videollamada de 15 minutos"
              required
            />

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe detalladamente lo que necesitas..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                required
              />
            </div>

            {/* Precio y Prioridad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ModernInput
                label="Precio (USD)"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prioridad
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>

            {/* Fecha límite */}
            <ModernInput
              label="Fecha Límite (Opcional)"
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
            />

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <ModernButton
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                Cancelar
              </ModernButton>
              <ModernButton
                type="submit"
                variant="primary"
                className="flex-1"
                loading={loading}
              >
                {loading ? 'Creando...' : 'Crear Ticket'}
              </ModernButton>
            </div>
          </form>

          {/* Mostrar link de upload si está disponible */}
          {uploadLink && (
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-green-400 mb-2">¡Ticket creado exitosamente!</h3>
                  <p className="text-sm text-green-300 mb-3">
                    Comparte este enlace con la modelo para que pueda subir los archivos solicitados:
                  </p>
                  <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
                    <code className="text-xs text-green-400 break-all">{uploadLink}</code>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <p className="text-xs text-blue-300">
                      <strong>Instrucciones para la modelo:</strong><br/>
                      • Usa este enlace para subir el archivo solicitado<br/>
                      • El archivo se entregará automáticamente al chatter<br/>
                      • Este enlace expirará en 10 días
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ModernCardContent>
      </ModernCard>
    </div>
  )
}
