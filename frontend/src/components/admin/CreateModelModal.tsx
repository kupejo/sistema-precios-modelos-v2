'use client'

import { useState } from 'react'
import { ModernButton } from '@/components/ui/ModernButton'
import { ModernInput } from '@/components/ui/ModernInput'
import { ModernCheckbox } from '@/components/ui/ModernCheckbox'
import { createModel } from '@/lib/dataService'

interface CreateModelModalProps {
  onClose: () => void
  onSuccess: () => void
}

const APP_OPTIONS = [
  { id: 'whatsapp', label: 'WhatsApp', icon: '📱' },
  { id: 'telegram', label: 'Telegram', icon: '✈️' },
  { id: 'instagram', label: 'Instagram', icon: '📷' },
  { id: 'snapchat', label: 'Snapchat', icon: '👻' },
  { id: 'teams', label: 'Microsoft Teams', icon: '💼' },
  { id: 'otra', label: 'Otra App', icon: '📱' }
]

const EXTRAS_VIDEOLLAMADAS = [
  'Desnuda',
  'Juguetes',
  'Masturbación',
  'Squirt',
  'Anal',
  'Fetish',
  'Roleplay',
  'Lésbico',
  'B/G',
  'Trio',
  'Orgia',
  'BBC',
  'Lives',
  'Estrenos'
]

const EXTRAS_CUSTOM = [
  'Desnuda',
  'Juguetes',
  'Masturbación',
  'Squirt',
  'Anal',
  'Fetish',
  'Roleplay',
  'Lésbico',
  'B/G',
  'Trio',
  'Orgia',
  'BBC',
  'Lives',
  'Estrenos'
]

const SERVICIOS = [
  'VIDEOCALL 5MIN',
  'VIDEOCALL 10MIN',
  'VIDEOCALL 15MIN',
  'CUSTOM VIDEO PERSONALIZADO 5 M',
  'CUSTOM VIDEO PERSONALIZADO 10 M',
  'CUSTOM VIDEO PERSONALIZADO 15 M',
  'FOTOS PERSONALIZADAS 1',
  'FOTOS PERSONALIZADAS 3',
  'BG PERSONALIZADO',
  'PANTIES',
  'SOLA VAGINAL',
  'SOLA ANAL',
  'SOLA SQUIRT',
  'B/G BOY GIRL',
  'B/G BOY GIRL ANAL',
  'LESBIAN',
  'ORGIA',
  'BBC',
  'TRIO 2 CHICOS 1 CHICA',
  'LIVES',
  'Estrenos'
]

export function CreateModelModal({ onClose, onSuccess }: CreateModelModalProps) {
  const [formData, setFormData] = useState({
    profile_id: '', // Se generará automáticamente
    modelo: '',
    contacto: '',
    apps_selected: [] as string[],
    app_handle_whatsapp: '',
    app_handle_telegram: '',
    app_handle_teams: '',
    app_handle_instagram: '',
    app_handle_snapchat: '',
    app_handle_otra: '',
    app_otra_nombre: '',
    extras_videollamadas: [] as string[],
    extras_custom: [] as string[],
    extras_generales: '',
    precios: {} as Record<string, number>,
    aprobado: false,
    activo: false,
    eliminado: false
  })
  const [loading, setLoading] = useState(false)
  const [currentSection, setCurrentSection] = useState(1)
  const totalSections = 6

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.modelo || !formData.contacto || formData.apps_selected.length === 0) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }

    try {
      setLoading(true)
      console.log('🔍 CreateModelModal - Enviando datos:', formData)
      await createModel(formData)
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error creando modelo:', error)
      alert('Error al crear el modelo')
    } finally {
      setLoading(false)
    }
  }

  const handleAppToggle = (appId: string) => {
    setFormData(prev => ({
      ...prev,
      apps_selected: prev.apps_selected.includes(appId)
        ? prev.apps_selected.filter(id => id !== appId)
        : [...prev.apps_selected, appId]
    }))
  }

  const handleInputChange = (field: string, value: string | string[] | Record<string, number>) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleExtraToggle = (field: 'extras_videollamadas' | 'extras_custom', extra: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(extra)
        ? prev[field].filter(e => e !== extra)
        : [...prev[field], extra]
    }))
  }

  const handlePriceChange = (servicio: string, precio: number) => {
    setFormData(prev => ({
      ...prev,
      precios: {
        ...prev.precios,
        [servicio]: precio
      }
    }))
  }

  const nextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1)
    }
  }

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Información Básica</h3>
            
            <ModernInput
              label="Nombre del Modelo"
              value={formData.modelo}
              onChange={(e) => handleInputChange('modelo', e.target.value)}
              placeholder="Ej: Ana García"
              required
            />

            <ModernInput
              label="Contacto"
              value={formData.contacto}
              onChange={(e) => handleInputChange('contacto', e.target.value)}
              placeholder="Ej: @anagarcia"
              required
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Apps Seleccionadas</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {APP_OPTIONS.map((app) => (
                <label
                  key={app.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    formData.apps_selected.includes(app.id)
                      ? 'bg-blue-500/20 border-blue-500'
                      : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.apps_selected.includes(app.id)}
                    onChange={() => handleAppToggle(app.id)}
                    className="sr-only"
                  />
                  <span className="text-lg">{app.icon}</span>
                  <span className="text-sm text-white">{app.label}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Handles de Apps</h3>
            
            {formData.apps_selected.includes('whatsapp') && (
              <ModernInput
                label="WhatsApp Handle"
                value={formData.app_handle_whatsapp}
                onChange={(e) => handleInputChange('app_handle_whatsapp', e.target.value)}
                placeholder="Ej: +1234567890"
              />
            )}

            {formData.apps_selected.includes('telegram') && (
              <ModernInput
                label="Telegram Handle"
                value={formData.app_handle_telegram}
                onChange={(e) => handleInputChange('app_handle_telegram', e.target.value)}
                placeholder="Ej: @anagarcia"
              />
            )}

            {formData.apps_selected.includes('teams') && (
              <ModernInput
                label="Teams Handle"
                value={formData.app_handle_teams}
                onChange={(e) => handleInputChange('app_handle_teams', e.target.value)}
                placeholder="Ej: ana.garcia@empresa.com"
              />
            )}

            {formData.apps_selected.includes('instagram') && (
              <ModernInput
                label="Instagram Handle"
                value={formData.app_handle_instagram}
                onChange={(e) => handleInputChange('app_handle_instagram', e.target.value)}
                placeholder="Ej: @anagarcia"
              />
            )}

            {formData.apps_selected.includes('snapchat') && (
              <ModernInput
                label="Snapchat Handle"
                value={formData.app_handle_snapchat}
                onChange={(e) => handleInputChange('app_handle_snapchat', e.target.value)}
                placeholder="Ej: anagarcia"
              />
            )}

            {formData.apps_selected.includes('otra') && (
              <>
                <ModernInput
                  label="Otra App - Nombre"
                  value={formData.app_otra_nombre}
                  onChange={(e) => handleInputChange('app_otra_nombre', e.target.value)}
                  placeholder="Ej: Discord"
                />
                <ModernInput
                  label="Otra App - Handle"
                  value={formData.app_handle_otra}
                  onChange={(e) => handleInputChange('app_handle_otra', e.target.value)}
                  placeholder="Ej: anagarcia#1234"
                />
              </>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Extras para Videollamadas</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {EXTRAS_VIDEOLLAMADAS.map((extra) => (
                <ModernCheckbox
                  key={extra}
                  checked={formData.extras_videollamadas.includes(extra)}
                  onChange={() => handleExtraToggle('extras_videollamadas', extra)}
                  label={extra}
                />
              ))}
            </div>

            <h3 className="text-lg font-semibold text-white mb-4 mt-8">Extras para Videos Personalizados</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {EXTRAS_CUSTOM.map((extra) => (
                <ModernCheckbox
                  key={extra}
                  checked={formData.extras_custom.includes(extra)}
                  onChange={() => handleExtraToggle('extras_custom', extra)}
                  label={extra}
                />
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Precios de Servicios</h3>
            
            <div className="space-y-4">
              {SERVICIOS.map((servicio) => (
                <div key={servicio} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span className="text-white text-sm">{servicio}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">$</span>
                    <input
                      type="number"
                      value={formData.precios[servicio] || 0}
                      onChange={(e) => handlePriceChange(servicio, parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                      min="0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Extras Generales</h3>
            
            <textarea
              value={formData.extras_generales}
              onChange={(e) => handleInputChange('extras_generales', e.target.value)}
              placeholder="Información adicional, comentarios especiales, etc."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 h-32 resize-none"
            />

            <h3 className="text-lg font-semibold text-white mb-4">Estado del Modelo</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <ModernCheckbox
                checked={formData.aprobado}
                onChange={() => setFormData(prev => ({ ...prev, aprobado: !prev.aprobado }))}
                label="Aprobado"
              />
              <ModernCheckbox
                checked={formData.activo}
                onChange={() => setFormData(prev => ({ ...prev, activo: !prev.activo }))}
                label="Activo"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">Crear Nuevo Modelo</h2>
            <p className="text-sm text-gray-400 mt-1">
              Sección {currentSection} de {totalSections}
            </p>
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

        {/* Progress Bar */}
        <div className="px-6 py-3 border-b border-gray-700">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentSection / totalSections) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {renderSection()}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700">
          <div className="flex gap-3">
            {currentSection > 1 && (
              <ModernButton variant="outline" onClick={prevSection} disabled={loading}>
                Anterior
              </ModernButton>
            )}
          </div>
          
          <div className="flex gap-3">
            <ModernButton variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </ModernButton>
            
            {currentSection < totalSections ? (
              <ModernButton variant="primary" onClick={nextSection} disabled={loading}>
                Siguiente
              </ModernButton>
            ) : (
              <ModernButton 
                variant="primary" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Creando...' : 'Crear Modelo'}
              </ModernButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
