'use client'

import { useState, useEffect, useCallback } from 'react'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'
import { Chatter, getModels, getTickets } from '@/lib/dataService'
import { CreateTicketModal } from './CreateTicketModal'

interface ChatterModelsProps {
  chatter: Chatter
  onNavigateToSection?: (section: string) => void
}

export function ChatterModels({ chatter }: ChatterModelsProps) {
  const [assignedModels, setAssignedModels] = useState<any[]>([])
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedModel, setSelectedModel] = useState<any>(null)
  const [showModelDetails, setShowModelDetails] = useState(false)
  const [showCreateTicket, setShowCreateTicket] = useState(false)
  const [preselectedModel, setPreselectedModel] = useState<any>(null)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      
      // Cargar modelos y tickets en paralelo
      const [allModels, allTickets] = await Promise.all([
        getModels(),
        getTickets()
      ])
      
      // Filtrar solo los modelos asignados al chatter
      const models = allModels.filter(model => 
        chatter.model_ids.includes(model.id)
      )
      
      // Filtrar tickets del chatter para las modelos asignadas
      const chatterTickets = allTickets.filter(ticket => 
        chatter.model_ids.includes(ticket.modelo_id)
      )
      
      setAssignedModels(models)
      setTickets(chatterTickets)
      
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }, [chatter.model_ids])

  useEffect(() => {
    loadData()
  }, [chatter.model_ids, loadData])

  const getAppIcon = (app: string) => {
    const icons: { [key: string]: string } = {
      whatsapp: '📱',
      telegram: '✈️',
      instagram: '📷',
      snapchat: '👻',
      teams: '💼',
      otra: '📞'
    }
    return icons[app] || '📱'
  }

  const getAppLabel = (app: string) => {
    const labels: { [key: string]: string } = {
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      instagram: 'Instagram',
      snapchat: 'Snapchat',
      teams: 'Microsoft Teams',
      otra: 'Otra App'
    }
    return labels[app] || app
  }

  const getModelTickets = (modelId: string) => {
    return tickets.filter(ticket => ticket.modelo_id === modelId)
  }

  const getPendingTicketsCount = (modelId: string) => {
    return getModelTickets(modelId).filter(ticket => ticket.status === 'pending').length
  }

  const getTopPrices = (precios: Record<string, number>) => {
    if (!precios) return []
    
    const priceEntries = Object.entries(precios)
      .filter(([, price]) => price > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3) // Top 3 precios
    
    return priceEntries.map(([service, price]) => ({
      service: service.replace(/_/g, ' ').toUpperCase(),
      price: price
    }))
  }

  const handleViewModelDetails = (model: any) => {
    setSelectedModel(model)
    setShowModelDetails(true)
  }

  const handleCreateTicketForModel = (model: any) => {
    setPreselectedModel(model)
    setShowCreateTicket(true)
  }

  const handleCreateTicketSuccess = () => {
    setShowCreateTicket(false)
    setPreselectedModel(null)
    loadData() // Recargar datos para actualizar estadísticas
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Mis Modelos Asignados</h1>
        <p className="text-gray-400">
          Tienes {assignedModels.length} modelo{assignedModels.length !== 1 ? 's' : ''} asignado{assignedModels.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Models Grid */}
      {assignedModels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedModels.map((model) => {
            const modelTickets = getModelTickets(model.id)
            const pendingCount = getPendingTicketsCount(model.id)
            const topPrices = getTopPrices(model.precios || {})
            
            return (
              <ModernCard key={model.id} variant="elevated" className="h-full">
                <ModernCardHeader>
                  <div className="flex items-center justify-between">
                    <ModernCardTitle className="text-lg">
                      {model.modelo}
                    </ModernCardTitle>
                    <div className="flex items-center gap-2">
                      {pendingCount > 0 && (
                        <div className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                          {pendingCount} pendiente{pendingCount !== 1 ? 's' : ''}
                        </div>
                      )}
                      <div className={`px-2 py-1 text-xs rounded-full ${
                        model.activo 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {model.activo ? 'Activo' : 'Inactivo'}
                      </div>
                    </div>
                  </div>
                </ModernCardHeader>
                
                <ModernCardContent className="space-y-4">
                  {/* Contact Info */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Contacto</h4>
                    <p className="text-sm text-gray-400">{model.contacto}</p>
                  </div>

                  {/* Apps Disponibles */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Apps Disponibles</h4>
                    <div className="flex flex-wrap gap-2">
                      {model.apps_selected.map((app: string) => (
                        <span
                          key={app}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 rounded text-xs text-gray-300"
                          title={getAppLabel(app)}
                        >
                          <span>{getAppIcon(app)}</span>
                          <span className="hidden sm:inline">{getAppLabel(app)}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Precios Principales */}
                  {topPrices.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Precios Principales</h4>
                      <div className="space-y-1">
                        {topPrices.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-xs">
                            <span className="text-gray-400 truncate">{item.service}</span>
                            <span className="text-green-400 font-medium">{formatPrice(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resumen de Tickets */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Resumen de Pedidos</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total:</span>
                        <span className="text-white">{modelTickets.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pendientes:</span>
                        <span className="text-orange-400">{pendingCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completados:</span>
                        <span className="text-green-400">{modelTickets.filter(t => t.status === 'completed').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">En Proceso:</span>
                        <span className="text-blue-400">{modelTickets.filter(t => t.status === 'in_progress').length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleCreateTicketForModel(model)}
                        className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                        title="Crear Ticket"
                      >
                        <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Crear Ticket
                      </button>
                      
                      <button
                        onClick={() => handleViewModelDetails(model)}
                        className="group flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white text-sm font-medium rounded-full transition-all duration-200 backdrop-blur-sm"
                        title="Ver Detalles"
                      >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </ModernCardContent>
              </ModernCard>
            )
          })}
        </div>
      ) : (
        <ModernCard variant="elevated">
          <ModernCardContent className="text-center py-12">
            <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">No tienes modelos asignados</h3>
            <p className="text-gray-400 mb-6">
              Contacta al administrador para que te asigne modelos disponibles.
            </p>
            <ModernButton
              variant="outline"
              onClick={() => {
                // Aquí podrías abrir un modal de contacto o enviar un mensaje al admin
                console.log('Contactar administrador')
                alert('Función de contactar administrador en desarrollo.')
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contactar Administrador
            </ModernButton>
          </ModernCardContent>
        </ModernCard>
      )}

      {/* Info Card */}
      <ModernCard variant="outlined">
        <ModernCardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-2">¿Cómo funciona?</h4>
              <p className="text-sm text-gray-400">
                Los modelos asignados son los únicos con los que puedes crear tickets. 
                Cada modelo tiene sus propias apps de contacto y servicios disponibles. 
                Puedes crear tickets para videollamadas, videos personalizados, fotos y más.
              </p>
            </div>
          </div>
        </ModernCardContent>
      </ModernCard>

      {/* Modal de Detalles de Modelo */}
      {showModelDetails && selectedModel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h2 className="text-xl font-semibold text-white">Detalles de {selectedModel.modelo}</h2>
                <p className="text-sm text-gray-400 mt-1">Información completa para ventas</p>
              </div>
              <button
                onClick={() => setShowModelDetails(false)}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Información Básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Información Básica</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-400">Nombre:</span>
                      <p className="text-white">{selectedModel.modelo}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-400">Contacto:</span>
                      <p className="text-white">{selectedModel.contacto}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-400">Estado:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedModel.activo 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedModel.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Apps y Handles</h3>
                  <div className="space-y-3">
                    {selectedModel.apps_selected.map((app: string) => (
                      <div key={app} className="flex items-center gap-3">
                        <span className="text-lg">{getAppIcon(app)}</span>
                        <div>
                          <p className="text-sm font-medium text-white">{getAppLabel(app)}</p>
                          <p className="text-xs text-gray-400">
                            {selectedModel[`app_handle_${app}`] || 'No especificado'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Precios Completos */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Precios de Servicios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedModel.precios && Object.entries(selectedModel.precios).map(([service, price]) => (
                    <div key={service} className="p-3 bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">{service.replace(/_/g, ' ').toUpperCase()}</p>
                      <p className="text-lg font-semibold text-green-400">{formatPrice(price as number)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extras */}
              {(selectedModel.extras_videollamadas?.length > 0 || selectedModel.extras_custom?.length > 0 || selectedModel.extras_generales) && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Extras Disponibles</h3>
                  <div className="space-y-4">
                    {selectedModel.extras_videollamadas?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Para Videollamadas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedModel.extras_videollamadas.map((extra: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                              {extra}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedModel.extras_custom?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Para Videos Personalizados:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedModel.extras_custom.map((extra: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                              {extra}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedModel.extras_generales && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Información Adicional:</h4>
                        <p className="text-sm text-gray-400 bg-gray-700 p-3 rounded-lg">
                          {selectedModel.extras_generales}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Resumen de Tickets */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Historial de Pedidos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-700 rounded-lg text-center">
                    <p className="text-2xl font-bold text-white">{getModelTickets(selectedModel.id).length}</p>
                    <p className="text-sm text-gray-400">Total</p>
                  </div>
                  <div className="p-4 bg-orange-500/20 rounded-lg text-center">
                    <p className="text-2xl font-bold text-orange-400">{getPendingTicketsCount(selectedModel.id)}</p>
                    <p className="text-sm text-gray-400">Pendientes</p>
                  </div>
                  <div className="p-4 bg-green-500/20 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-400">
                      {getModelTickets(selectedModel.id).filter(t => t.status === 'completed').length}
                    </p>
                    <p className="text-sm text-gray-400">Completados</p>
                  </div>
                  <div className="p-4 bg-blue-500/20 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-400">
                      {getModelTickets(selectedModel.id).filter(t => t.status === 'in_progress').length}
                    </p>
                    <p className="text-sm text-gray-400">En Proceso</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-gray-700">
              <ModernButton
                variant="outline"
                onClick={() => setShowModelDetails(false)}
              >
                Cerrar
              </ModernButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Creación de Ticket */}
      {showCreateTicket && preselectedModel && (
        <CreateTicketModal
          chatter={chatter}
          preselectedModel={preselectedModel}
          onClose={() => {
            setShowCreateTicket(false)
            setPreselectedModel(null)
          }}
          onSuccess={handleCreateTicketSuccess}
        />
      )}
    </div>
  )
}
