'use client'

import React, { useState } from 'react'
import { ModernButton } from '@/components/ui/ModernButton'
import { Model, updateModel } from '@/lib/dataService'

interface ModelDetailModalProps {
  model: Model | null
  onClose: () => void
}

export function ModelDetailModal({ model, onClose }: ModelDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
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
    precios: {} as Record<string, number>
  })
  const [loading, setLoading] = useState(false)

  const appLabels: { [key: string]: string } = {
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    teams: 'Microsoft Teams',
    instagram: 'Instagram',
    snapchat: 'Snapchat',
    otra: 'Otra App'
  }

  // Inicializar datos de edición cuando se abre el modal
  React.useEffect(() => {
    if (model) {
      console.log('🔍 ModelDetailModal - Modelo recibido:', model)
      console.log('🔍 ModelDetailModal - Precios del modelo:', model.precios)
      console.log('🔍 ModelDetailModal - Apps del modelo:', model.apps_selected)
      console.log('🔍 ModelDetailModal - Extras videollamadas:', model.extras_videollamadas)
      console.log('🔍 ModelDetailModal - Extras custom:', model.extras_custom)
      console.log('🔍 ModelDetailModal - Extras generales:', model.extras_generales)
      
      // Inicializar precios con valores por defecto si no existen
      const defaultPrecios = {
        'VIDEOCALL 5MIN': 0,
        'VIDEOCALL 10MIN': 0,
        'VIDEOCALL 15MIN': 0,
        'CUSTOM VIDEO PERSONALIZADO 5 M': 0,
        'CUSTOM VIDEO PERSONALIZADO 10 M': 0,
        'CUSTOM VIDEO PERSONALIZADO 15 M': 0,
        'FOTOS PERSONALIZADAS 1': 0,
        'FOTOS PERSONALIZADAS 3': 0,
        'BG PERSONALIZADO': 0,
        'PANTIES': 0,
        'SOLA VAGINAL': 0,
        'SOLA ANAL': 0,
        'SOLA SQUIRT': 0,
        'B/G BOY GIRL': 0,
        'B/G BOY GIRL ANAL': 0,
        'LESBIAN': 0,
        'ORGIA': 0,
        'BBC': 0,
        'TRIO 2 CHICOS 1 CHICA': 0,
        'LIVES': 0,
        'Estrenos': 0
      }
      
      const preciosCombinados = { ...defaultPrecios, ...(model.precios || {}) }
      console.log('🔍 ModelDetailModal - Precios combinados:', preciosCombinados)
      
      setEditData({
        modelo: model.modelo || '',
        contacto: model.contacto || '',
        apps_selected: model.apps_selected || [],
        app_handle_whatsapp: model.app_handle_whatsapp || '',
        app_handle_telegram: model.app_handle_telegram || '',
        app_handle_teams: model.app_handle_teams || '',
        app_handle_instagram: model.app_handle_instagram || '',
        app_handle_snapchat: model.app_handle_snapchat || '',
        app_handle_otra: model.app_handle_otra || '',
        app_otra_nombre: model.app_otra_nombre || '',
        extras_videollamadas: model.extras_videollamadas || [],
        extras_custom: model.extras_custom || [],
        extras_generales: model.extras_generales || '',
        precios: preciosCombinados
      })
    }
  }, [model])

  if (!model) return null

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    if (!isEditing) {
      // Al cancelar, restaurar datos originales
      setEditData({
        modelo: model?.modelo || '',
        contacto: model?.contacto || '',
        apps_selected: model?.apps_selected || [],
        app_handle_whatsapp: model?.app_handle_whatsapp || '',
        app_handle_telegram: model?.app_handle_telegram || '',
        app_handle_teams: model?.app_handle_teams || '',
        app_handle_instagram: model?.app_handle_instagram || '',
        app_handle_snapchat: model?.app_handle_snapchat || '',
        app_handle_otra: model?.app_handle_otra || '',
        app_otra_nombre: model?.app_otra_nombre || '',
        extras_videollamadas: model?.extras_videollamadas || [],
        extras_custom: model?.extras_custom || [],
        extras_generales: model?.extras_generales || '',
        precios: model?.precios || {}
      })
    }
  }

  const handleInputChange = (field: string, value: string | string[] | Record<string, number>) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAppToggle = (app: string) => {
    setEditData(prev => ({
      ...prev,
      apps_selected: prev.apps_selected.includes(app)
        ? prev.apps_selected.filter(a => a !== app)
        : [...prev.apps_selected, app]
    }))
  }

  const handleExtraToggle = (field: 'extras_videollamadas' | 'extras_custom', extra: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: prev[field].includes(extra)
        ? prev[field].filter(e => e !== extra)
        : [...prev[field], extra]
    }))
  }

  const handlePriceChange = (servicio: string, precio: number) => {
    setEditData(prev => ({
      ...prev,
      precios: {
        ...prev.precios,
        [servicio]: precio
      }
    }))
  }

  const handleSaveChanges = async () => {
    if (!model) return

    try {
      setLoading(true)
      console.log('Guardando cambios del modelo:', editData)
      
      // Llamar a la función updateModel
      await updateModel(model.id, editData)
      
      alert('Modelo actualizado exitosamente')
      setIsEditing(false)
      
    } catch (error) {
      console.error('Error actualizando modelo:', error)
      alert('Error al actualizar la información del modelo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">Detalles del Modelo</h2>
            <p className="text-sm text-gray-400">{model.profile_id}</p>
          </div>
          <div className="flex items-center gap-2">
            <ModernButton
              variant="outline"
              size="sm"
              onClick={handleEditToggle}
            >
              {isEditing ? 'Cancelar' : 'Editar'}
            </ModernButton>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Información Básica */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Información Básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre del Modelo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.modelo}
                    onChange={(e) => handleInputChange('modelo', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre del modelo"
                  />
                ) : (
                  <p className="text-gray-300 px-3 py-2 bg-gray-700 rounded-lg">{model.modelo}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contacto
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.contacto}
                    onChange={(e) => handleInputChange('contacto', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Información de contacto"
                  />
                ) : (
                  <p className="text-gray-300 px-3 py-2 bg-gray-700 rounded-lg">{model.contacto}</p>
                )}
              </div>
            </div>
          </div>

          {/* Apps Seleccionadas */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Apps Seleccionadas</h3>
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(appLabels).map(([key, label]) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editData.apps_selected.includes(key)}
                      onChange={() => handleAppToggle(key)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300">{label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {model.apps_selected?.map(app => (
                  <span
                    key={app}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                  >
                    {appLabels[app] || app}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Handles de Apps */}
          {editData.apps_selected.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Handles de Apps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editData.apps_selected.map(app => (
                  <div key={app}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {appLabels[app]} {app === 'otra' && editData.app_otra_nombre ? `(${editData.app_otra_nombre})` : ''}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData[`app_handle_${app}` as keyof typeof editData] as string || ''}
                        onChange={(e) => handleInputChange(`app_handle_${app}` as keyof typeof editData, e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Usuario de ${appLabels[app]}`}
                      />
                    ) : (
                      <p className="text-gray-300 px-3 py-2 bg-gray-700 rounded-lg">{model[`app_handle_${app}` as keyof typeof model] as string || 'No especificado'}</p>
                    )}
                  </div>
                ))}
                {editData.apps_selected.includes('otra') && isEditing && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre de la Otra App
                    </label>
                    <input
                      type="text"
                      value={editData.app_otra_nombre}
                      onChange={(e) => handleInputChange('app_otra_nombre', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nombre de la app"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Extras Videollamadas */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Extras Videollamadas</h3>
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Lingerie', 'Juguetes', 'Roleplay', 'Fantasías', 'Lenguaje sucio'].map(extra => (
                  <label key={extra} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editData.extras_videollamadas.includes(extra)}
                      onChange={() => handleExtraToggle('extras_videollamadas', extra)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300">{extra}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {model.extras_videollamadas?.map(extra => (
                  <span
                    key={extra}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full"
                  >
                    {extra}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Extras Videos Personalizados */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Extras Videos Personalizados</h3>
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Lingerie', 'Juguetes', 'Roleplay', 'Fantasías', 'Lenguaje sucio', 'Cumshot'].map(extra => (
                  <label key={extra} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editData.extras_custom.includes(extra)}
                      onChange={() => handleExtraToggle('extras_custom', extra)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300">{extra}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {model.extras_custom?.map(extra => (
                  <span
                    key={extra}
                    className="px-3 py-1 bg-pink-600 text-white text-sm rounded-full"
                  >
                    {extra}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Extras Generales */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Extras Generales</h3>
            {isEditing ? (
              <textarea
                value={editData.extras_generales}
                onChange={(e) => handleInputChange('extras_generales', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Información adicional..."
              />
            ) : (
              <p className="text-gray-300 px-3 py-2 bg-gray-700 rounded-lg min-h-[60px]">{model.extras_generales || 'No especificado'}</p>
            )}
          </div>

          {/* Precios */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Precios de Servicios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(editData.precios || {}).map(([servicio, precio]) => (
                <div key={servicio} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300 text-sm flex-1">{servicio}</span>
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">$</span>
                      <input
                        type="number"
                        value={precio}
                        onChange={(e) => handlePriceChange(servicio, Number(e.target.value))}
                        className="w-20 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                      />
                    </div>
                  ) : (
                    <span className="text-white font-semibold">${precio}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Información del Sistema */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Información del Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-gray-400">ID del Perfil:</span>
                <p className="text-white font-mono text-sm">{model.profile_id}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Estado:</span>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    model.aprobado ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                  }`}>
                    {model.aprobado ? 'Aprobado' : 'Pendiente'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    model.activo ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                  }`}>
                    {model.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-400">Creado:</span>
                <p className="text-white text-sm">{new Date(model.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Actualizado:</span>
                <p className="text-white text-sm">{new Date(model.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {isEditing && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-700">
            <ModernButton
              variant="outline"
              onClick={handleEditToggle}
              disabled={loading}
            >
              Cancelar
            </ModernButton>
            <ModernButton
              onClick={handleSaveChanges}
              loading={loading}
              disabled={loading}
            >
              Guardar Cambios
            </ModernButton>
          </div>
        )}
      </div>
    </div>
  )
}