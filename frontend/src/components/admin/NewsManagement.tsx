import React, { useState, useEffect } from 'react'
import { getAllNews, createNews, updateNews, deleteNews, getNewsStats, getModels, getChatters, NewsItem, initializeSampleNews } from '@/lib/dataService'

export function NewsManagement() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [models] = useState<any[]>([])
  const [chatters] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [newsData, , , statsData] = await Promise.all([
        getAllNews(),
        getModels(),
        getChatters(),
        getNewsStats()
      ])
      
      setNews(newsData)
      // setModels(modelsData)
      // setChatters(chattersData)
      setStats(statsData)
    } catch (error) {
      console.error('Error cargando datos:', error)
      alert('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNews = async (newsData: any) => {
    try {
      await createNews({
        ...newsData,
        createdBy: 'admin', // En un sistema real, esto vendría del usuario logueado
        isActive: true
      })
      await loadData()
      setShowCreateModal(false)
      alert('Noticia creada exitosamente')
    } catch (error) {
      console.error('Error creando noticia:', error)
      alert('Error al crear la noticia')
    }
  }

  const handleUpdateNews = async (newsId: string, updates: any) => {
    try {
      await updateNews(newsId, updates)
      await loadData()
      setShowEditModal(false)
      setSelectedNews(null)
      alert('Noticia actualizada exitosamente')
    } catch (error) {
      console.error('Error actualizando noticia:', error)
      alert('Error al actualizar la noticia')
    }
  }

  const handleDeleteNews = async (newsId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta noticia?')) return
    
    try {
      await deleteNews(newsId)
      await loadData()
      alert('Noticia eliminada exitosamente')
    } catch (error) {
      console.error('Error eliminando noticia:', error)
      alert('Error al eliminar la noticia')
    }
  }

  const handleToggleActive = async (newsId: string, isActive: boolean) => {
    try {
      await updateNews(newsId, { isActive: !isActive })
      await loadData()
    } catch (error) {
      console.error('Error actualizando estado:', error)
      alert('Error al actualizar el estado de la noticia')
    }
  }

  const handleInitializeSampleNews = async () => {
    if (!confirm('¿Estás seguro de que quieres inicializar noticias de ejemplo? Esto solo funcionará si no hay noticias existentes.')) return
    
    try {
      await initializeSampleNews()
      await loadData()
      alert('Noticias de ejemplo inicializadas exitosamente')
    } catch (error) {
      console.error('Error inicializando noticias de ejemplo:', error)
      alert('Error al inicializar noticias de ejemplo')
    }
  }

  const filteredNews = news.filter(newsItem => {
    if (filter === 'active') return newsItem.isActive
    if (filter === 'inactive') return !newsItem.isActive
    return true
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement': return '📢'
      case 'update': return '🔄'
      case 'warning': return '⚠️'
      case 'info': return 'ℹ️'
      default: return '📰'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'announcement': return 'Anuncio'
      case 'update': return 'Actualización'
      case 'warning': return 'Advertencia'
      case 'info': return 'Información'
      default: return type
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-500 bg-red-500/10'
      case 'high': return 'text-orange-500 bg-orange-500/10'
      case 'medium': return 'text-yellow-500 bg-yellow-500/10'
      case 'low': return 'text-green-500 bg-green-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Urgente'
      case 'high': return 'Alta'
      case 'medium': return 'Media'
      case 'low': return 'Baja'
      default: return priority
    }
  }

  const getTargetingLabel = (newsItem: NewsItem) => {
    switch (newsItem.targetType) {
      case 'all':
        return 'Todos los chatters'
      case 'specific_models':
        const modelNames = newsItem.targetModels?.map(modelId => 
          models.find(m => m.id === modelId)?.modelo || modelId
        ).join(', ') || 'Ninguna'
        return `Chatters con modelos: ${modelNames}`
      case 'specific_chatters':
        const chatterNames = newsItem.targetChatters?.map(chatterId => 
          chatters.find(c => c.id === chatterId)?.username || chatterId
        ).join(', ') || 'Ninguno'
        return `Chatters específicos: ${chatterNames}`
      default:
        return newsItem.targetType
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestión de Noticias</h2>
          <p className="text-gray-400">Administra las noticias y anuncios del sistema</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleInitializeSampleNews}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Datos de Prueba
          </button>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Noticia
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Noticias</p>
                <p className="text-2xl font-bold text-white">{stats.totalNews}</p>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Noticias Activas</p>
                <p className="text-2xl font-bold text-green-400">{stats.activeNews}</p>
              </div>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Vistas</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.totalViews}</p>
              </div>
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Promedio Vistas</p>
                <p className="text-2xl font-bold text-purple-400">
                  {stats.totalNews > 0 ? Math.round(stats.totalViews / stats.totalNews) : 0}
                </p>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              filter === 'active' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Activas
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              filter === 'inactive' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Inactivas
          </button>
        </div>
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No hay noticias</div>
            <p className="text-gray-500">Crea tu primera noticia para comenzar</p>
          </div>
        ) : (
          filteredNews.map((newsItem) => (
            <div key={newsItem.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getTypeIcon(newsItem.type)}</span>
                    <h3 className="text-lg font-semibold text-white">{newsItem.title}</h3>
                    {newsItem.isPinned && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                        📌 Fijada
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(newsItem.priority)}`}>
                      {getPriorityLabel(newsItem.priority)}
                    </span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                      {getTypeLabel(newsItem.type)}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-3 line-clamp-2">{newsItem.content}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>🎯 {getTargetingLabel(newsItem)}</span>
                    <span>👁️ {newsItem.viewsCount} vistas</span>
                    <span>📅 {new Date(newsItem.createdAt).toLocaleDateString('es-ES')}</span>
                    {newsItem.showUntil && (
                      <span>⏰ Expira: {new Date(newsItem.showUntil).toLocaleDateString('es-ES')}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleToggleActive(newsItem.id, newsItem.isActive)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      newsItem.isActive 
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                        : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    }`}
                  >
                    {newsItem.isActive ? 'Activa' : 'Inactiva'}
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedNews(newsItem)
                      setShowEditModal(true)
                    }}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => handleDeleteNews(newsItem.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create News Modal */}
      {showCreateModal && (
        <CreateNewsModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateNews}
          models={models}
          chatters={chatters}
        />
      )}

      {/* Edit News Modal */}
      {showEditModal && selectedNews && (
        <EditNewsModal
          news={selectedNews}
          onClose={() => {
            setShowEditModal(false)
            setSelectedNews(null)
          }}
          onSubmit={(updates: any) => handleUpdateNews(selectedNews.id, updates)}
          models={models}
          chatters={chatters}
        />
      )}
    </div>
  )
}

// Componente para crear noticias
function CreateNewsModal({ onClose, onSubmit, models, chatters }: any) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'announcement' as const,
    priority: 'medium' as const,
    targetType: 'all' as 'all' | 'specific_models' | 'specific_chatters',
    targetModels: [] as string[],
    targetChatters: [] as string[],
    isPinned: false,
    showUntil: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleModelToggle = (modelId: string) => {
    setFormData(prev => ({
      ...prev,
      targetModels: prev.targetModels.includes(modelId)
        ? prev.targetModels.filter((id: string) => id !== modelId)
        : [...prev.targetModels, modelId]
    }))
  }

  const handleChatterToggle = (chatterId: string) => {
    setFormData(prev => ({
      ...prev,
      targetChatters: prev.targetChatters.includes(chatterId)
        ? prev.targetChatters.filter((id: string) => id !== chatterId)
        : [...prev.targetChatters, chatterId]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Crear Nueva Noticia</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Título de la noticia"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contenido</label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Contenido de la noticia"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="announcement">📢 Anuncio</option>
                  <option value="update">🔄 Actualización</option>
                  <option value="warning">⚠️ Advertencia</option>
                  <option value="info">ℹ️ Información</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prioridad</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="low">🟢 Baja</option>
                  <option value="medium">🟡 Media</option>
                  <option value="high">🟠 Alta</option>
                  <option value="urgent">🔴 Urgente</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Audiencia</label>
              <select
                value={formData.targetType}
                onChange={(e) => handleInputChange('targetType', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">👥 Todos los chatters</option>
                <option value="specific_models">🎯 Chatters con modelos específicas</option>
                <option value="specific_chatters">👤 Chatters específicos</option>
              </select>
            </div>

            {formData.targetType === 'specific_models' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Modelos específicas
                  <span className="text-xs text-gray-400 block">
                    Solo chatters que tengan estas modelos asignadas verán la noticia
                  </span>
                </label>
                <div className="max-h-40 overflow-y-auto bg-gray-700 border border-gray-600 rounded-lg p-3">
                  {models.map((model: any) => (
                    <label key={model.id} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.targetModels.includes(model.id)}
                        onChange={() => handleModelToggle(model.id)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-white text-sm">{model.modelo}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {formData.targetType === 'specific_chatters' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Chatters específicos
                  <span className="text-xs text-gray-400 block">
                    Solo estos chatters específicos verán la noticia
                  </span>
                </label>
                <div className="max-h-40 overflow-y-auto bg-gray-700 border border-gray-600 rounded-lg p-3">
                  {chatters.map((chatter: any) => (
                    <label key={chatter.id} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.targetChatters.includes(chatter.id)}
                        onChange={() => handleChatterToggle(chatter.id)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-white text-sm">{chatter.username}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Expiración</label>
                <input
                  type="datetime-local"
                  value={formData.showUntil}
                  onChange={(e) => handleInputChange('showUntil', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">Dejar vacío para que no expire</p>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => handleInputChange('isPinned', e.target.checked)}
                    className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-white text-sm">📌 Fijar noticia</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Crear Noticia
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Componente para editar noticias
function EditNewsModal({ news, onClose, onSubmit, models, chatters }: any) {
  const [formData, setFormData] = useState({
    title: news.title,
    content: news.content,
    type: news.type,
    priority: news.priority,
    targetType: news.targetType as 'all' | 'specific_models' | 'specific_chatters',
    targetModels: news.targetModels || [],
    targetChatters: news.targetChatters || [],
    isPinned: news.isPinned,
    isActive: news.isActive,
    showUntil: news.showUntil || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleModelToggle = (modelId: string) => {
    setFormData(prev => ({
      ...prev,
      targetModels: prev.targetModels.includes(modelId)
        ? prev.targetModels.filter((id: string) => id !== modelId)
        : [...prev.targetModels, modelId]
    }))
  }

  const handleChatterToggle = (chatterId: string) => {
    setFormData(prev => ({
      ...prev,
      targetChatters: prev.targetChatters.includes(chatterId)
        ? prev.targetChatters.filter((id: string) => id !== chatterId)
        : [...prev.targetChatters, chatterId]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Editar Noticia</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contenido</label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="announcement">📢 Anuncio</option>
                  <option value="update">🔄 Actualización</option>
                  <option value="warning">⚠️ Advertencia</option>
                  <option value="info">ℹ️ Información</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prioridad</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="low">🟢 Baja</option>
                  <option value="medium">🟡 Media</option>
                  <option value="high">🟠 Alta</option>
                  <option value="urgent">🔴 Urgente</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Audiencia</label>
              <select
                value={formData.targetType}
                onChange={(e) => handleInputChange('targetType', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">👥 Todos los chatters</option>
                <option value="specific_models">🎯 Chatters con modelos específicas</option>
                <option value="specific_chatters">👤 Chatters específicos</option>
              </select>
            </div>

            {formData.targetType === 'specific_models' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Modelos específicas
                  <span className="text-xs text-gray-400 block">
                    Solo chatters que tengan estas modelos asignadas verán la noticia
                  </span>
                </label>
                <div className="max-h-40 overflow-y-auto bg-gray-700 border border-gray-600 rounded-lg p-3">
                  {models.map((model: any) => (
                    <label key={model.id} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.targetModels.includes(model.id)}
                        onChange={() => handleModelToggle(model.id)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-white text-sm">{model.modelo}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {formData.targetType === 'specific_chatters' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Chatters específicos
                  <span className="text-xs text-gray-400 block">
                    Solo estos chatters específicos verán la noticia
                  </span>
                </label>
                <div className="max-h-40 overflow-y-auto bg-gray-700 border border-gray-600 rounded-lg p-3">
                  {chatters.map((chatter: any) => (
                    <label key={chatter.id} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.targetChatters.includes(chatter.id)}
                        onChange={() => handleChatterToggle(chatter.id)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-white text-sm">{chatter.username}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Expiración</label>
                <input
                  type="datetime-local"
                  value={formData.showUntil}
                  onChange={(e) => handleInputChange('showUntil', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => handleInputChange('isPinned', e.target.checked)}
                    className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-white text-sm">📌 Fijar noticia</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-white text-sm">✅ Activa</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Actualizar Noticia
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
