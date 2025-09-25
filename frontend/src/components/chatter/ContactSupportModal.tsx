'use client'

import { useState } from 'react'
import { ModernButton } from '@/components/ui/ModernButton'
import { ModernInput } from '@/components/ui/ModernInput'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { Chatter } from '@/lib/dataService'

interface ContactSupportModalProps {
  chatter: Chatter
  onClose: () => void
  onSuccess: () => void
}

export function ContactSupportModal({ chatter, onClose, onSuccess }: ContactSupportModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    message: '',
    includeAccountInfo: true
  })

  const categories = [
    { id: 'general', name: 'Consulta General', description: 'Preguntas generales sobre el servicio' },
    { id: 'technical', name: 'Problema Técnico', description: 'Errores, bugs o problemas de funcionamiento' },
    { id: 'billing', name: 'Facturación', description: 'Problemas con pagos o facturas' },
    { id: 'account', name: 'Cuenta', description: 'Problemas con tu cuenta o perfil' },
    { id: 'models', name: 'Modelos', description: 'Consultas sobre modelos asignados' },
    { id: 'tickets', name: 'Tickets', description: 'Problemas con tickets o pedidos' }
  ]

  const priorities = [
    { id: 'low', name: 'Baja', description: 'No urgente' },
    { id: 'medium', name: 'Media', description: 'Normal' },
    { id: 'high', name: 'Alta', description: 'Importante' },
    { id: 'urgent', name: 'Urgente', description: 'Requiere atención inmediata' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simular envío de ticket de soporte
      const supportTicket = {
        chatter_id: chatter.chatter_id,
        chatter_name: chatter.fullname || chatter.username,
        chatter_email: chatter.email,
        subject: formData.subject,
        category: formData.category,
        priority: formData.priority,
        message: formData.message,
        include_account_info: formData.includeAccountInfo,
        created_at: new Date().toISOString(),
        status: 'open'
      }

      console.log('Ticket de soporte creado:', supportTicket)
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Tu consulta ha sido enviada exitosamente. Te responderemos pronto.')
      onSuccess()
      onClose()
      
    } catch (error) {
      console.error('Error enviando consulta:', error)
      alert('Error al enviar la consulta. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // const getCategoryLabel = (categoryId: string) => {
  //   return categories.find(c => c.id === categoryId)?.name || categoryId
  // }

  // const getPriorityLabel = (priorityId: string) => {
  //   return priorities.find(p => p.id === priorityId)?.name || priorityId
  // }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <ModernCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <ModernCardHeader>
          <ModernCardTitle className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contactar Soporte
          </ModernCardTitle>
        </ModernCardHeader>
        
        <ModernCardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Asunto */}
            <ModernInput
              label="Asunto *"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Describe brevemente tu consulta"
              required
            />

            {/* Categoría y Prioridad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Categoría *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  {categories.find(c => c.id === formData.category)?.description}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prioridad
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                      {priority.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  {priorities.find(p => p.id === formData.priority)?.description}
                </p>
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mensaje *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Describe detalladamente tu consulta o problema..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={6}
                required
              />
            </div>

            {/* Opción de incluir información de cuenta */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="includeAccountInfo"
                checked={formData.includeAccountInfo}
                onChange={(e) => handleInputChange('includeAccountInfo', e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <div>
                <label htmlFor="includeAccountInfo" className="text-sm font-medium text-gray-300 cursor-pointer">
                  Incluir información de mi cuenta
                </label>
                <p className="text-xs text-gray-400 mt-1">
                  Esto ayudará al equipo de soporte a resolver tu consulta más rápidamente
                </p>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Información de contacto:</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Usuario:</span>
                  <span className="text-white">{chatter.username}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="text-white">{chatter.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estado:</span>
                  <span className="text-white">{chatter.is_active ? 'Activo' : 'Inactivo'}</span>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-300">
                  <p className="font-medium mb-1">Tiempo de respuesta:</p>
                  <ul className="text-xs space-y-1 text-blue-400">
                    <li>• Urgente: 1-2 horas</li>
                    <li>• Alta: 4-8 horas</li>
                    <li>• Media: 24 horas</li>
                    <li>• Baja: 48 horas</li>
                  </ul>
                </div>
              </div>
            </div>

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
                {loading ? 'Enviando...' : 'Enviar Consulta'}
              </ModernButton>
            </div>
          </form>
        </ModernCardContent>
      </ModernCard>
    </div>
  )
}
