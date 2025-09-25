'use client'

import { useState, useEffect, useCallback } from 'react'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'
import { Chatter, Model, getModels } from '@/lib/dataService'

interface ChatterRequestsProps {
  chatter: Chatter
}

interface ModelRequest {
  id: string
  modelId: string
  modelName: string
  requestType: 'assignment' | 'removal' | 'info'
  status: 'pending' | 'approved' | 'rejected'
  message: string
  createdAt: string
  updatedAt: string
}

export function ChatterRequests({ chatter }: ChatterRequestsProps) {
  const [requests, setRequests] = useState<ModelRequest[]>([])
  const [allModels, setAllModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [newRequest, setNewRequest] = useState({
    modelId: '',
    requestType: 'assignment' as 'assignment' | 'removal' | 'info',
    message: ''
  })

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      // Cargar todos los modelos para el selector
      const models = await getModels()
      setAllModels(models)
      
      // Simular solicitudes existentes
      const mockRequests: ModelRequest[] = [
        {
          id: 'req_1',
          modelId: 'model_1',
          modelName: 'Modelo Ejemplo 1',
          requestType: 'assignment',
          status: 'pending',
          message: 'Solicito que se me asigne este modelo para trabajar con él.',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'req_2',
          modelId: 'model_2',
          modelName: 'Modelo Ejemplo 2',
          requestType: 'info',
          status: 'approved',
          message: 'Necesito más información sobre los servicios disponibles de este modelo.',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
      setRequests(mockRequests)
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSubmitRequest = async () => {
    if (!newRequest.modelId || !newRequest.message.trim()) {
      alert('Por favor completa todos los campos requeridos.')
      return
    }

    const selectedModel = allModels.find(m => m.id === newRequest.modelId)
    if (!selectedModel) {
      alert('Modelo no encontrado.')
      return
    }

    const request: ModelRequest = {
      id: `req_${Date.now()}`,
      modelId: newRequest.modelId,
      modelName: selectedModel.modelo,
      requestType: newRequest.requestType,
      status: 'pending',
      message: newRequest.message,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setRequests(prev => [request, ...prev])
    setNewRequest({ modelId: '', requestType: 'assignment', message: '' })
    setShowNewRequest(false)
    alert('Solicitud enviada exitosamente.')
  }

  const getRequestTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'assignment': 'Asignación de Modelo',
      'removal': 'Remoción de Modelo',
      'info': 'Solicitud de Información'
    }
    return types[type] || type
  }

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return 'M12 6v6m0 0v6m0-6h6m-6 0H6'
      case 'removal': return 'M6 18L18 6M6 6l12 12'
      case 'info': return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      default: return 'M12 6v6m0 0v6m0-6h6m-6 0H6'
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'approved': 'bg-green-500/20 text-green-400 border-green-500/30',
      'rejected': 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'pending': 'Pendiente',
      'approved': 'Aprobada',
      'rejected': 'Rechazada'
    }
    return labels[status] || status
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getAvailableModels = () => {
    // Filtrar modelos que no están asignados al chatter
    const assignedModelIds = chatter.model_ids || []
    return allModels.filter(model => !assignedModelIds.includes(model.id))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 text-white">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
        <p className="ml-2">Cargando solicitudes...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Mis Solicitudes</h1>
          <p className="text-gray-400">Gestiona tus solicitudes de modelos y servicios</p>
        </div>
        <ModernButton
          variant="primary"
          onClick={() => setShowNewRequest(true)}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nueva Solicitud
        </ModernButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ModernCard variant="elevated">
          <ModernCardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {requests.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-400">Pendientes</div>
            </div>
          </ModernCardContent>
        </ModernCard>
        
        <ModernCard variant="elevated">
          <ModernCardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {requests.filter(r => r.status === 'approved').length}
              </div>
              <div className="text-sm text-gray-400">Aprobadas</div>
            </div>
          </ModernCardContent>
        </ModernCard>
        
        <ModernCard variant="elevated">
          <ModernCardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {requests.filter(r => r.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-400">Rechazadas</div>
            </div>
          </ModernCardContent>
        </ModernCard>
      </div>

      {/* Requests List */}
      {requests.length === 0 ? (
        <ModernCard variant="elevated">
          <ModernCardContent>
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <p className="text-gray-400 text-lg mb-2">No tienes solicitudes</p>
              <p className="text-gray-500 text-sm">Crea una nueva solicitud para empezar</p>
            </div>
          </ModernCardContent>
        </ModernCard>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <ModernCard key={request.id} variant="elevated">
              <ModernCardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getRequestTypeIcon(request.requestType)} />
                      </svg>
                    </div>
                    <div>
                      <ModernCardTitle className="text-lg">
                        {getRequestTypeLabel(request.requestType)}
                      </ModernCardTitle>
                      <p className="text-sm text-gray-400">Modelo: {request.modelName}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                    {getStatusLabel(request.status)}
                  </span>
                </div>
              </ModernCardHeader>
              <ModernCardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Mensaje:</p>
                    <p className="text-white">{request.message}</p>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Creada: {formatDate(request.createdAt)}</span>
                    <span>Actualizada: {formatDate(request.updatedAt)}</span>
                  </div>
                </div>
              </ModernCardContent>
            </ModernCard>
          ))}
        </div>
      )}

      {/* New Request Modal */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <ModernCard className="w-full max-w-2xl">
            <ModernCardHeader>
              <ModernCardTitle className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nueva Solicitud
              </ModernCardTitle>
            </ModernCardHeader>
            
            <ModernCardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Modelo *
                  </label>
                  <select
                    value={newRequest.modelId}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, modelId: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecciona un modelo</option>
                    {getAvailableModels().map(model => (
                      <option key={model.id} value={model.id}>{model.modelo}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Solicitud *
                  </label>
                  <select
                    value={newRequest.requestType}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, requestType: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="assignment">Asignación de Modelo</option>
                    <option value="info">Solicitud de Información</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    value={newRequest.message}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Explica tu solicitud..."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <ModernButton
                    variant="outline"
                    onClick={() => setShowNewRequest(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </ModernButton>
                  <ModernButton
                    variant="primary"
                    onClick={handleSubmitRequest}
                    className="flex-1"
                  >
                    Enviar Solicitud
                  </ModernButton>
                </div>
              </div>
            </ModernCardContent>
          </ModernCard>
        </div>
      )}
    </div>
  )
}
