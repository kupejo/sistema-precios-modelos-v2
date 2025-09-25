'use client'

import { useState, useEffect } from 'react'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'
import { Model, getModels, approveModel, toggleModelActive, deleteModel, searchModels } from '@/lib/dataService'
import { ModelDetailModal } from './ModelDetailModal'
import { CreateModelModal } from './CreateModelModal'

interface ModelsManagementProps {
  refreshTrigger?: number
}

export function ModelsManagement({ refreshTrigger }: ModelsManagementProps) {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [appFilter, setAppFilter] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    loadModels()
  }, [refreshTrigger])

  const loadModels = async () => {
    try {
      setLoading(true)
      const modelsData = await getModels()
      setModels(modelsData)
    } catch (error) {
      console.error('Error cargando modelos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      const filteredModels = await searchModels(searchQuery, {
        status: statusFilter,
        app: appFilter
      })
      setModels(filteredModels)
    } catch (error) {
      console.error('Error buscando modelos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (modelId: string) => {
    try {
      setActionLoading(modelId)
      await approveModel(modelId)
      await loadModels() // Recargar la lista
    } catch (error) {
      console.error('Error aprobando modelo:', error)
      alert('Error al aprobar el modelo')
    } finally {
      setActionLoading(null)
    }
  }

  const handleActivate = async (modelId: string) => {
    try {
      setActionLoading(modelId)
      await toggleModelActive(modelId)
      await loadModels() // Recargar la lista
    } catch (error) {
      console.error('Error cambiando estado del modelo:', error)
      alert('Error al cambiar el estado del modelo')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (modelId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este modelo?')) {
      return
    }

    try {
      setActionLoading(modelId)
      await deleteModel(modelId)
      await loadModels() // Recargar la lista
    } catch (error) {
      console.error('Error eliminando modelo:', error)
      alert('Error al eliminar el modelo')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Gestión de Modelos</h1>
          <p className="text-gray-400">Administra los perfiles de modelos registrados</p>
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
          <h1 className="text-2xl font-bold text-white mb-2">Gestión de Modelos</h1>
          <p className="text-gray-400">Administra los perfiles de modelos registrados</p>
        </div>
        
        <div className="flex gap-3">
          <ModernButton variant="outline" size="md">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar
          </ModernButton>
          
          <ModernButton 
            variant="primary" 
            size="md"
            onClick={() => setShowCreateModal(true)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Modelo
          </ModernButton>
        </div>
      </div>

      {/* Filters */}
      <ModernCard>
        <ModernCardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar modelos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Todos los estados</option>
              <option value="approved">Aprobados</option>
              <option value="pending">Pendientes</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
            
            <select 
              value={appFilter}
              onChange={(e) => setAppFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Todas las apps</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram">Telegram</option>
              <option value="instagram">Instagram</option>
              <option value="snapchat">Snapchat</option>
            </select>

            <ModernButton 
              variant="primary" 
              onClick={handleSearch}
              disabled={loading}
            >
              Buscar
            </ModernButton>

            <ModernButton 
              variant="outline" 
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('')
                setAppFilter('')
                loadModels()
              }}
            >
              Limpiar
            </ModernButton>
          </div>
        </ModernCardContent>
      </ModernCard>

      {/* Models Table */}
      <ModernCard>
        <ModernCardHeader>
          <ModernCardTitle>Lista de Modelos ({models.length})</ModernCardTitle>
        </ModernCardHeader>
        <ModernCardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Modelo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Contacto</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Apps</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Fecha</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {model.modelo.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{model.modelo}</p>
                          <p className="text-xs text-gray-400">{model.profile_id}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-300">{model.contacto}</span>
                    </td>
                    
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {model.apps_selected.map((app) => (
                          <span key={app} className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
                            {app}
                          </span>
                        ))}
                      </div>
                    </td>
                    
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {model.aprobado ? (
                          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                            Aprobado
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded">
                            Pendiente
                          </span>
                        )}
                        
                        {model.activo && (
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                            Activo
                          </span>
                        )}
                      </div>
                    </td>
                    
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-400">
                        {new Date(model.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {!model.aprobado && (
                          <ModernButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(model.id)}
                            disabled={actionLoading === model.id}
                          >
                            {actionLoading === model.id ? 'Procesando...' : 'Aprobar'}
                          </ModernButton>
                        )}
                        
                        <ModernButton
                          variant={model.activo ? "outline" : "primary"}
                          size="sm"
                          onClick={() => handleActivate(model.id)}
                          disabled={actionLoading === model.id}
                        >
                          {actionLoading === model.id ? 'Procesando...' : (model.activo ? 'Desactivar' : 'Activar')}
                        </ModernButton>
                        
                        <ModernButton
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedModel(model)}
                        >
                          Ver
                        </ModernButton>
                        
                        <ModernButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(model.id)}
                          disabled={actionLoading === model.id}
                        >
                          {actionLoading === model.id ? 'Procesando...' : 'Eliminar'}
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

      {/* Modals */}
      {selectedModel && (
        <ModelDetailModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      )}

      {showCreateModal && (
        <CreateModelModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            loadModels()
            setShowCreateModal(false)
          }}
        />
      )}
    </div>
  )
}

