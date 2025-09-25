import React, { useState, useEffect } from 'react'
import { Chatter, Model, getModels, updateChatter } from '@/lib/dataService'
import { ModernButton } from '@/components/ui/ModernButton'

interface ChatterDetailModalProps {
  chatter: Chatter | null
  onClose: () => void
  onUpdateModels: (chatterId: string, modelIds: string[], modelNames: string[]) => Promise<void>
}

export function ChatterDetailModal({ chatter, onClose, onUpdateModels }: ChatterDetailModalProps) {
  console.log('ChatterDetailModal renderizado con chatter:', chatter)
  
  const [models, setModels] = useState<Model[]>([])
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showModelAssignment, setShowModelAssignment] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    username: '',
    fullname: '',
    email: '',
    chatter_id: '',
    password: ''
  })

  useEffect(() => {
    if (chatter) {
      setSelectedModels(chatter.model_ids || [])
      setEditData({
        username: chatter.username || '',
        fullname: chatter.fullname || '',
        email: chatter.email || '',
        chatter_id: chatter.chatter_id || '',
        password: chatter.password || ''
      })
      loadModels()
    }
  }, [chatter])

  const loadModels = async () => {
    try {
      const modelsData = await getModels()
      setModels(modelsData.filter(m => m.aprobado && m.activo && !m.eliminado))
    } catch (error) {
      console.error('Error cargando modelos:', error)
    }
  }

  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    )
  }

  const handleSaveModels = async () => {
    if (!chatter) return

    try {
      setLoading(true)
      const selectedModelNames = models
        .filter(m => selectedModels.includes(m.id))
        .map(m => m.modelo)
      
      console.log('Guardando modelos para chatter:', {
        chatterId: chatter.id,
        selectedModels,
        selectedModelNames
      })
      
      await onUpdateModels(chatter.id, selectedModels, selectedModelNames)
      console.log('Modelos guardados exitosamente')
      setShowModelAssignment(false)
    } catch (error) {
      console.error('Error actualizando modelos:', error)
      alert('Error al actualizar los modelos asignados')
    } finally {
      setLoading(false)
    }
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    if (!isEditing) {
      // Al cancelar, restaurar datos originales
      setEditData({
        username: chatter?.username || '',
        fullname: chatter?.fullname || '',
        email: chatter?.email || '',
        chatter_id: chatter?.chatter_id || '',
        password: chatter?.password || ''
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveChanges = async () => {
    if (!chatter) return

    try {
      setLoading(true)
      console.log('🔍 ChatterDetailModal - Guardando cambios del chatter:', editData)
      
      // Actualizar el chatter con los nuevos datos
      const updatedChatter = await updateChatter(chatter.id, {
        username: editData.username,
        fullname: editData.fullname,
        email: editData.email,
        password: editData.password
      })
      
      console.log('🔍 ChatterDetailModal - Chatter actualizado exitosamente:', updatedChatter)
      alert('Información del chatter actualizada exitosamente')
      
      setIsEditing(false)
    } catch (error) {
      console.error('Error actualizando chatter:', error)
      alert('Error al actualizar la información del chatter')
    } finally {
      setLoading(false)
    }
  }

  if (!chatter) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" style={{ zIndex: 9999 }}>
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Detalles del Chatter</h2>
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
        <div className="p-6 space-y-6">
          {/* Chatter Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Información Personal</h3>
                <ModernButton
                  variant="outline"
                  size="sm"
                  onClick={handleEditToggle}
                >
                  {isEditing ? 'Cancelar' : 'Editar'}
                </ModernButton>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-400">ID del Chatter</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.chatter_id}
                      onChange={(e) => handleInputChange('chatter_id', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-white">{chatter.chatter_id}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400">Nombre de Usuario</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-white">@{chatter.username}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400">Nombre Completo</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.fullname}
                      onChange={(e) => handleInputChange('fullname', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-white">{chatter.fullname}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-white">{chatter.email || 'No especificado'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400">Contraseña</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nueva contraseña"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white font-mono bg-gray-800 px-2 py-1 rounded">
                        {chatter.password || 'No especificada'}
                      </p>
                      <span className="text-xs text-gray-500">(Visible para admin)</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400">Estado</label>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    chatter.is_active 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {chatter.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400">Fecha de Registro</label>
                  <p className="text-sm text-white">{new Date(chatter.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              
              {isEditing && (
                <div className="flex gap-2 mt-4">
                  <ModernButton
                    variant="outline"
                    size="sm"
                    onClick={handleEditToggle}
                    className="flex-1"
                  >
                    Cancelar
                  </ModernButton>
                  <ModernButton
                    variant="primary"
                    size="sm"
                    onClick={handleSaveChanges}
                    loading={loading}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </ModernButton>
                </div>
              )}
            </div>

            {/* Modelos Asignados */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Modelos Asignados</h3>
                <ModernButton
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModelAssignment(!showModelAssignment)}
                >
                  {showModelAssignment ? 'Cancelar' : 'Editar'}
                </ModernButton>
              </div>

              {showModelAssignment ? (
                <div className="space-y-4">
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {models.map((model) => (
                      <label key={model.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedModels.includes(model.id)}
                          onChange={() => handleModelToggle(model.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{model.modelo}</p>
                          <p className="text-xs text-gray-400">{model.contacto}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <ModernButton
                      variant="outline"
                      size="sm"
                      onClick={() => setShowModelAssignment(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </ModernButton>
                    <ModernButton
                      variant="primary"
                      size="sm"
                      onClick={handleSaveModels}
                      loading={loading}
                      disabled={loading}
                      className="flex-1"
                    >
                      {loading ? 'Guardando...' : 'Guardar'}
                    </ModernButton>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {chatter.model_names && chatter.model_names.length > 0 ? (
                    chatter.model_names.map((modelName, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-700/50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-white">{modelName}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">No hay modelos asignados</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t border-gray-700">
            <ModernButton
              variant="outline"
              onClick={onClose}
            >
              Cerrar
            </ModernButton>
          </div>
        </div>
      </div>
    </div>
  )
}
