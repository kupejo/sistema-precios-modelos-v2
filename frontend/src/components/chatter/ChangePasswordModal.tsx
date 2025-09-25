'use client'

import { useState } from 'react'
import { ModernButton } from '@/components/ui/ModernButton'
import { ModernInput } from '@/components/ui/ModernInput'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'

interface ChangePasswordModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function ChangePasswordModal({ onClose, onSuccess }: ChangePasswordModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'La contraseña actual es requerida'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'La nueva contraseña es requerida'
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu nueva contraseña'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'La nueva contraseña debe ser diferente a la actual'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Simular cambio de contraseña
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      alert('Contraseña cambiada exitosamente!')
      onSuccess()
      onClose()
      
    } catch (error) {
      console.error('Error cambiando contraseña:', error)
      alert('Error al cambiar la contraseña. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <ModernCard className="w-full max-w-md">
        <ModernCardHeader>
          <ModernCardTitle className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Cambiar Contraseña
          </ModernCardTitle>
        </ModernCardHeader>
        
        <ModernCardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <ModernInput
              label="Contraseña Actual"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              error={errors.currentPassword}
              placeholder="Ingresa tu contraseña actual"
              required
            />

            <ModernInput
              label="Nueva Contraseña"
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              error={errors.newPassword}
              placeholder="Ingresa tu nueva contraseña"
              required
            />

            <ModernInput
              label="Confirmar Nueva Contraseña"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              placeholder="Confirma tu nueva contraseña"
              required
            />

            {/* Información de seguridad */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-300">
                  <p className="font-medium mb-1">Requisitos de contraseña:</p>
                  <ul className="text-xs space-y-1 text-blue-400">
                    <li>• Mínimo 6 caracteres</li>
                    <li>• Diferente a la contraseña actual</li>
                    <li>• Recomendamos usar mayúsculas, minúsculas y números</li>
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
                {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
              </ModernButton>
            </div>
          </form>
        </ModernCardContent>
      </ModernCard>
    </div>
  )
}
