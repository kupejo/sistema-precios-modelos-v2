'use client'

import { useState, useEffect, useCallback } from 'react'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernInput } from '@/components/ui/ModernInput'
import { Chatter, Model, getModels } from '@/lib/dataService'

interface ChatterViewerProps {
  chatter: Chatter
}

function ChatterViewer({ }: ChatterViewerProps) {
  const [allModels, setAllModels] = useState<Model[]>([])
  const [filteredModels, setFilteredModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const loadAllModels = useCallback(async () => {
    try {
      setLoading(true)
      // Cargar TODOS los modelos del sistema (no solo los asignados al chatter)
      const models = await getModels()
      setAllModels(models)
    } catch (error) {
      console.error('Error cargando modelos:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const filterAndSortModels = useCallback(() => {
    let filtered = [...allModels]

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(model =>
        model.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.contacto.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortBy) {
        case 'name':
          aValue = a.modelo.toLowerCase()
          bValue = b.modelo.toLowerCase()
          break
        case 'contact':
          aValue = a.contacto.toLowerCase()
          bValue = b.contacto.toLowerCase()
          break
        case 'status':
          aValue = a.aprobado ? (a.activo ? 'activo' : 'inactivo') : 'pendiente'
          bValue = b.aprobado ? (b.activo ? 'activo' : 'inactivo') : 'pendiente'
          break
        case 'date':
          aValue = new Date(a.created_at).getTime()
          bValue = new Date(b.created_at).getTime()
          break
        default:
          aValue = a.modelo.toLowerCase()
          bValue = b.modelo.toLowerCase()
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    setFilteredModels(filtered)
  }, [allModels, searchTerm, sortBy, sortOrder])

  useEffect(() => {
    loadAllModels()
  }, [loadAllModels])

  useEffect(() => {
    filterAndSortModels()
  }, [allModels, searchTerm, sortBy, sortOrder, filterAndSortModels])

  const getStatusColor = (model: Model) => {
    if (!model.aprobado) {
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
    if (model.activo) {
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    }
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getStatusLabel = (model: Model) => {
    if (!model.aprobado) {
      return 'Pendiente'
    }
    if (model.activo) {
      return 'Activo'
    }
    return 'Inactivo'
  }

  const getAppIcon = (app: string) => {
    const icons: Record<string, string> = {
      'whatsapp': 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488',
      'telegram': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-.14.03-.23.05-.38.12-2.24 1.43-6.32 4.2-.6.42-1.15.63-1.64.62-.54-.01-1.58-.3-2.35-.55-.95-.31-1.7-.47-1.63-.99.03-.2.4-.4 1.1-.61 4.24-1.85 7.07-3.07 8.49-3.66 3.8-1.58 4.58-1.85 5.1-1.86.11 0 .36.03.52.17.14.13.18.3.2.53-.01.06-.01.24-.01.24z',
      'instagram': 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.186 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.186-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      'snapchat': 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z',
      'teams': 'M20.5 14.26a.84.84 0 0 0-.1-.36.8.8 0 0 0-.29-.31l-6-3.51a.83.83 0 0 0-.84 0l-6 3.51a.8.8 0 0 0-.29.31.84.84 0 0 0-.1.36v6.74a.84.84 0 0 0 .1.36.8.8 0 0 0 .29.31l6 3.51a.83.83 0 0 0 .84 0l6-3.51a.8.8 0 0 0 .29-.31.84.84 0 0 0 .1-.36v-6.74zM7 13.15v5.67l-4-2.33v-5.68l4 2.34zm10 0v5.67l4-2.33v-5.68l-4 2.34zM8 12l4-2.33L16 12l-4 2.33L8 12zm9-8.26a.84.84 0 0 0-.1-.36.8.8 0 0 0-.29-.31l-6-3.51a.83.83 0 0 0-.84 0l-6 3.51a.8.8 0 0 0-.29.31.84.84 0 0 0-.1.36v6.74a.84.84 0 0 0 .1.36.8.8 0 0 0 .29.31l6 3.51a.83.83 0 0 0 .84 0l6-3.51a.8.8 0 0 0 .29-.31.84.84 0 0 0 .1-.36V3.74zM7 6.41v5.67l-4-2.33V4.08l4 2.33zm10 0v5.67l4-2.33V4.08l-4 2.33zM8 5.26l4-2.33L16 5.26l-4 2.33L8 5.26z'
    }
    return icons[app] || 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  }

  const getAppLabel = (app: string) => {
    const labels: Record<string, string> = {
      'whatsapp': 'WhatsApp',
      'telegram': 'Telegram',
      'instagram': 'Instagram',
      'snapchat': 'Snapchat',
      'teams': 'Teams',
      'otra': 'Otra'
    }
    return labels[app] || app
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Viewer de Modelos</h1>
          <p className="text-gray-400">Explora todos los modelos disponibles en el sistema</p>
        </div>

        {/* Search and Sort */}
        <ModernCard variant="elevated">
          <ModernCardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <ModernInput
                  label="Buscar modelos"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o contacto..."
                />
              </div>
              
              <div className="flex gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name">Nombre</option>
                    <option value="contact">Contacto</option>
                    <option value="status">Estado</option>
                    <option value="date">Fecha</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Orden
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                  </select>
                </div>
              </div>
            </div>
          </ModernCardContent>
        </ModernCard>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ModernCard variant="elevated">
            <ModernCardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{filteredModels.length}</div>
                <div className="text-sm text-gray-400">Modelos encontrados</div>
              </div>
            </ModernCardContent>
          </ModernCard>
          
          <ModernCard variant="elevated">
            <ModernCardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {filteredModels.filter(m => m.aprobado && m.activo).length}
                </div>
                <div className="text-sm text-gray-400">Activos</div>
              </div>
            </ModernCardContent>
          </ModernCard>
          
          <ModernCard variant="elevated">
            <ModernCardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {filteredModels.filter(m => !m.aprobado).length}
                </div>
                <div className="text-sm text-gray-400">Pendientes</div>
              </div>
            </ModernCardContent>
          </ModernCard>
          
          <ModernCard variant="elevated">
            <ModernCardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">
                  {filteredModels.filter(m => m.aprobado && !m.activo).length}
                </div>
                <div className="text-sm text-gray-400">Inactivos</div>
              </div>
            </ModernCardContent>
          </ModernCard>
        </div>

        {/* Models Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <p className="text-gray-400 mt-2">Cargando modelos...</p>
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="text-gray-400">No se encontraron modelos</p>
            <p className="text-gray-500 text-sm mt-1">Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <ModernCard key={model.id} variant="elevated" className="hover:shadow-lg transition-shadow">
                <ModernCardHeader>
                  <div className="flex items-center justify-between">
                    <ModernCardTitle className="text-lg">
                      {model.modelo}
                    </ModernCardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(model)}`}>
                      {getStatusLabel(model)}
                    </span>
                  </div>
                </ModernCardHeader>
                <ModernCardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Contacto:</p>
                      <p className="text-white">{model.contacto}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Apps disponibles:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {model.apps_selected.map((app) => (
                          <span
                            key={app}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d={getAppIcon(app)} />
                            </svg>
                            {getAppLabel(app)}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Fecha de registro:</p>
                      <p className="text-gray-300 text-sm">{formatDate(model.created_at)}</p>
                    </div>
                  </div>
                </ModernCardContent>
              </ModernCard>
            ))}
          </div>
        )}
      </div>
    )
  }

export { ChatterViewer }
