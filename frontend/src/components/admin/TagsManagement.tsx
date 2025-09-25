'use client'

import { useState, useEffect } from 'react'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'
import { Tag, getTags, createTag, deleteTag } from '@/lib/dataService'

interface TagsManagementProps {
  refreshTrigger?: number
}

export function TagsManagement({ }: TagsManagementProps) {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTagName, setNewTagName] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    loadTags()
  }, [])

  const loadTags = async () => {
    try {
      setLoading(true)
      const tagsData = await getTags()
      setTags(tagsData)
    } catch (error) {
      console.error('Error cargando etiquetas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      alert('Por favor ingresa un nombre para la etiqueta')
      return
    }

    try {
      setActionLoading('create')
      await createTag({ name: newTagName.trim() })
      setNewTagName('')
      setShowCreateModal(false)
      await loadTags()
    } catch (error) {
      console.error('Error creando etiqueta:', error)
      alert('Error al crear la etiqueta')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteTag = async (tagId: string, tagName: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar la etiqueta "${tagName}"?`)) {
      return
    }

    try {
      setActionLoading(tagId)
      await deleteTag(tagId)
      await loadTags()
    } catch (error) {
      console.error('Error eliminando etiqueta:', error)
      alert('Error al eliminar la etiqueta')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Gestión de Etiquetas</h1>
          <p className="text-gray-400">Administra las etiquetas del sistema</p>
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
          <h1 className="text-2xl font-bold text-white mb-2">Gestión de Etiquetas</h1>
          <p className="text-gray-400">Administra las etiquetas del sistema</p>
        </div>
        
            <ModernButton 
              variant="primary" 
              size="md"
              onClick={() => setShowCreateModal(true)}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nueva Etiqueta
            </ModernButton>
          </div>

          {/* Tags Grid */}
          <ModernCard>
            <ModernCardHeader>
              <ModernCardTitle>Lista de Etiquetas ({tags.length})</ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent>
              {tags.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-white">{tag.name}</p>
                          <p className="text-xs text-gray-400">
                            Creada: {new Date(tag.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <ModernButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTag(tag.id, tag.name)}
                          disabled={actionLoading === tag.id}
                        >
                          {actionLoading === tag.id ? 'Eliminando...' : 'Eliminar'}
                        </ModernButton>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <h3 className="text-lg font-medium text-white mb-2">No hay etiquetas</h3>
                  <p className="text-gray-400 mb-6">Crea tu primera etiqueta para comenzar</p>
                </div>
              )}
            </ModernCardContent>
          </ModernCard>

          {/* Create Tag Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-xl max-w-md w-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">Nueva Etiqueta</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre de la Etiqueta
                    </label>
                    <input
                      type="text"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      placeholder="Ej: VIP, Popular, Nuevo..."
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-700">
                  <ModernButton variant="outline" onClick={() => setShowCreateModal(false)}>
                    Cancelar
                  </ModernButton>
                  <ModernButton 
                    variant="primary" 
                    onClick={handleCreateTag}
                    disabled={actionLoading === 'create'}
                  >
                    {actionLoading === 'create' ? 'Creando...' : 'Crear Etiqueta'}
                  </ModernButton>
                </div>
              </div>
            </div>
          )}
    </div>
  )
}

