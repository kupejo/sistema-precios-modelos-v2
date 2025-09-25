'use client'

import { useState, useEffect } from 'react'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'
import { CreateChatterModal } from './CreateChatterModal'
import { ChatterDetailModal } from './ChatterDetailModal'
import { Chatter, getChatters, updateChatterModels, toggleChatterStatus } from '@/lib/dataService'

interface ChattersManagementProps {
  refreshTrigger?: number
}

export function ChattersManagement({ }: ChattersManagementProps) {
  const [chatters, setChatters] = useState<Chatter[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedChatter, setSelectedChatter] = useState<Chatter | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Debug: Log cuando cambie selectedChatter
  useEffect(() => {
    console.log('selectedChatter cambió:', selectedChatter)
  }, [selectedChatter])

  useEffect(() => {
    loadChatters()
  }, [])

  const loadChatters = async () => {
    try {
      setLoading(true)
      const chattersData = await getChatters()
      setChatters(chattersData)
    } catch (error) {
      console.error('Error cargando chatters:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateModels = async (chatterId: string, modelIds: string[], modelNames: string[]) => {
    try {
      console.log('Actualizando modelos para chatter:', chatterId, modelIds, modelNames)
      await updateChatterModels(chatterId, modelIds, modelNames)
      console.log('Modelos actualizados exitosamente')
      await loadChatters() // Recargar la lista
      console.log('Lista de chatters recargada')
    } catch (error) {
      console.error('Error actualizando modelos:', error)
      throw error
    }
  }

  const handleToggleStatus = async (chatterId: string) => {
    try {
      setActionLoading(chatterId)
      await toggleChatterStatus(chatterId)
      await loadChatters() // Recargar la lista
    } catch (error) {
      console.error('Error cambiando estado:', error)
      alert('Error al cambiar el estado del chatter')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Gestión de Chatters</h1>
          <p className="text-gray-400">Administra las cuentas de chatters</p>
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
          <h1 className="text-2xl font-bold text-white mb-2">Gestión de Chatters</h1>
          <p className="text-gray-400">Administra las cuentas de chatters</p>
        </div>
        
            <ModernButton 
              variant="primary" 
              size="md"
              onClick={() => setShowCreateModal(true)}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nuevo Chatter
            </ModernButton>
          </div>

          {/* Chatters Table */}
          <ModernCard>
            <ModernCardHeader>
              <ModernCardTitle>Lista de Chatters ({chatters.length})</ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Chatter</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Modelos Asignados</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Estado</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Fecha</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chatters.map((chatter) => (
                      <tr key={chatter.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {chatter.fullname.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{chatter.fullname}</p>
                              <p className="text-xs text-gray-400">@{chatter.username}</p>
                            </div>
                          </div>
                        </td>
                        
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-300">{chatter.email}</span>
                        </td>
                        
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {chatter.model_names.slice(0, 2).map((name, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
                                {name}
                              </span>
                            ))}
                            {chatter.model_names.length > 2 && (
                              <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                                +{chatter.model_names.length - 2} más
                              </span>
                            )}
                          </div>
                        </td>
                        
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            {chatter.is_active ? (
                              <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                Activo
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-400 rounded flex items-center gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                Inactivo
                              </span>
                            )}
                          </div>
                        </td>
                        
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-400">
                            {new Date(chatter.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <ModernButton
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                console.log('Abriendo modal para chatter:', chatter)
                                setSelectedChatter(chatter)
                              }}
                            >
                              Ver
                            </ModernButton>
                            
                            <ModernButton
                              variant={chatter.is_active ? "outline" : "primary"}
                              size="sm"
                              onClick={() => handleToggleStatus(chatter.id)}
                              disabled={actionLoading === chatter.id}
                            >
                              {actionLoading === chatter.id ? 'Procesando...' : (chatter.is_active ? 'Desactivar' : 'Activar')}
                            </ModernButton>
                            
                            <ModernButton
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                console.log('Abriendo modal de edición para chatter:', chatter)
                                setSelectedChatter(chatter)
                              }}
                            >
                              Editar
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
          
          {/* Create Chatter Modal */}
          {showCreateModal && (
            <CreateChatterModal
              onClose={() => setShowCreateModal(false)}
              onSuccess={() => {
                loadChatters()
                setShowCreateModal(false)
              }}
            />
          )}

          {/* Chatter Detail Modal */}
          {selectedChatter && (
            <ChatterDetailModal
              chatter={selectedChatter}
              onClose={() => {
                console.log('Cerrando modal')
                setSelectedChatter(null)
              }}
              onUpdateModels={handleUpdateModels}
            />
          )}
    </div>
  )
}

