import React, { useState, useEffect, useCallback } from 'react'
import { getNewsForChatter, markNewsAsRead, NewsItem } from '@/lib/dataService'

interface NewsPanelProps {
  chatterId: string
}

export function NewsPanel({ chatterId }: NewsPanelProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [readNewsIds, setReadNewsIds] = useState<Set<string>>(new Set())

  const loadNews = useCallback(async () => {
    try {
      setLoading(true)
      const newsData = await getNewsForChatter(chatterId)
      
      // Ordenar: primero las pinneadas, luego por prioridad, luego por fecha
      const sortedNews = newsData.sort((a, b) => {
        // Las pinneadas van primero
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        
        // Luego por prioridad
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0
        const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0
        
        if (aPriority !== bPriority) return bPriority - aPriority
        
        // Finalmente por fecha (más recientes primero)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      
      setNews(sortedNews)
    } catch (error) {
      console.error('Error cargando noticias:', error)
    } finally {
      setLoading(false)
    }
  }, [chatterId])

  useEffect(() => {
    loadNews()
  }, [chatterId, loadNews])

  const handleNewsClick = async (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
    
    // Marcar como leída si no lo está
    if (!readNewsIds.has(newsItem.id)) {
      try {
        await markNewsAsRead(newsItem.id, chatterId)
        setReadNewsIds(prev => new Set([...prev, newsItem.id]))
      } catch (error) {
        console.error('Error marcando noticia como leída:', error)
      }
    }
  }

  const handleCloseDetail = () => {
    setSelectedNews(null)
  }

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
      case 'urgent': return 'border-red-500 bg-red-500/10'
      case 'high': return 'border-orange-500 bg-orange-500/10'
      case 'medium': return 'border-yellow-500 bg-yellow-500/10'
      case 'low': return 'border-green-500 bg-green-500/10'
      default: return 'border-gray-500 bg-gray-500/10'
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Ayer'
    if (diffDays < 7) return `Hace ${diffDays} días`
    return date.toLocaleDateString('es-ES')
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 bg-gray-700 rounded"></div>
                <div className="h-5 bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-700 rounded w-16"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg mb-2">📰</div>
        <div className="text-gray-400 mb-2">No hay noticias</div>
        <p className="text-gray-500 text-sm">Las noticias aparecerán aquí cuando estén disponibles</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {news.map((newsItem) => (
          <div
            key={newsItem.id}
            onClick={() => handleNewsClick(newsItem)}
            className={`bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-750 hover:border-gray-600 ${
              !readNewsIds.has(newsItem.id) ? 'ring-2 ring-blue-500/30' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <span className="text-2xl">{getTypeIcon(newsItem.type)}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white truncate">{newsItem.title}</h3>
                  
                  {newsItem.isPinned && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full flex-shrink-0">
                      📌 Fijada
                    </span>
                  )}
                  
                  <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(newsItem.priority)} flex-shrink-0`}>
                    {getPriorityLabel(newsItem.priority)}
                  </span>
                  
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full flex-shrink-0">
                    {getTypeLabel(newsItem.type)}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {newsItem.content}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{formatDate(newsItem.createdAt)}</span>
                  {newsItem.showUntil && (
                    <span>⏰ Expira: {new Date(newsItem.showUntil).toLocaleDateString('es-ES')}</span>
                  )}
                  {!readNewsIds.has(newsItem.id) && (
                    <span className="text-blue-400 font-medium">● Nuevo</span>
                  )}
                </div>
              </div>
              
              {!readNewsIds.has(newsItem.id) && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalle de noticia */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getTypeIcon(selectedNews.type)}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedNews.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(selectedNews.priority)}`}>
                        {getPriorityLabel(selectedNews.priority)}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                        {getTypeLabel(selectedNews.type)}
                      </span>
                      {selectedNews.isPinned && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                          📌 Fijada
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCloseDetail}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedNews.content}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <span>📅 {new Date(selectedNews.createdAt).toLocaleString('es-ES')}</span>
                  {selectedNews.showUntil && (
                    <span>⏰ Expira: {new Date(selectedNews.showUntil).toLocaleString('es-ES')}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <span>👁️ {selectedNews.viewsCount} vistas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
