import React, { useState } from 'react'
import { createChatter } from '@/lib/dataService'
import { ModernButton } from '@/components/ui/ModernButton'

interface CreateChatterModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function CreateChatterModal({ onClose, onSuccess }: CreateChatterModalProps) {
  const [formData, setFormData] = useState({
    chatter_id: '',
    username: '',
    password: '',
    email: '',
    fullname: '',
    is_active: true,
    model_ids: [] as string[],
    model_names: [] as string[]
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.chatter_id || !formData.username || !formData.password || !formData.fullname) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }

    try {
      setLoading(true)
      await createChatter(formData)
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error creando chatter:', error)
      alert('Error al crear el chatter')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Crear Nuevo Chatter</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Chatter ID */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ID del Chatter <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.chatter_id}
              onChange={(e) => setFormData(prev => ({ ...prev, chatter_id: e.target.value }))}
              placeholder="Ej: CHAT001"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Identificador único para el chatter
            </p>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre de Usuario <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              placeholder="Ej: chatter123"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Mínimo 6 caracteres"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
              minLength={6}
            />
            <p className="text-xs text-gray-400 mt-1">
              La contraseña debe tener al menos 6 caracteres
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre Completo <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.fullname}
              onChange={(e) => setFormData(prev => ({ ...prev, fullname: e.target.value }))}
              placeholder="Ej: Juan Pérez"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Ej: juan@ejemplo.com"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-300">
              Cuenta activa
            </label>
          </div>

          {/* Buttons */}
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
              disabled={loading}
            >
              {loading ? 'Creando...' : 'Crear Chatter'}
            </ModernButton>
          </div>
        </form>
      </div>
    </div>
  )
}
