import React, { useState, useEffect, useCallback } from 'react'
import { getNewsForChatter, NewsItem } from '@/lib/dataService'

interface NewsNotificationProps {
  chatterId: string
  onNavigateToNews?: () => void
}

export function NewsNotification({ chatterId, onNavigateToNews }: NewsNotificationProps) {
  const [unreadNews, setUnreadNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadUnreadNews = useCallback(async () => {
    try {
      setLoading(true)
      const news = await getNewsForChatter(chatterId)
      
      // Filtrar noticias no leídas (en un sistema real, esto se haría con el backend)
      // Por ahora, simulamos que las noticias urgentes y de alta prioridad son "nuevas"
      const urgentNews = news.filter(newsItem => 
        newsItem.priority === 'urgent' || 
        newsItem.priority === 'high' ||
        newsItem.isPinned
      )
      
      setUnreadNews(urgentNews.slice(0, 3)) // Mostrar máximo 3 noticias
    } catch (error) {
      console.error('Error cargando noticias no leídas:', error)
    } finally {
      setLoading(false)
    }
  }, [chatterId])

  useEffect(() => {
    loadUnreadNews()
  }, [chatterId, loadUnreadNews])

  if (loading || unreadNews.length === 0) {
    return null
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 mb-6 border border-blue-500/30">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📰</span>
          <h3 className="text-lg font-semibold text-white">Noticias Importantes</h3>
          {unreadNews.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadNews.length}
            </span>
          )}
        </div>
        
        {onNavigateToNews && (
          <button
            onClick={onNavigateToNews}
            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            Ver todas →
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {unreadNews.map((newsItem) => (
          <div
            key={newsItem.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
          >
            <div className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0 mt-0.5">
                {getTypeIcon(newsItem.type)}
              </span>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-medium text-sm truncate">
                    {newsItem.title}
                  </h4>
                  
                  {newsItem.isPinned && (
                    <span className="text-yellow-300 text-xs">📌</span>
                  )}
                  
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(newsItem.priority)} flex-shrink-0`}></div>
                </div>
                
                <p className="text-white/80 text-xs line-clamp-2">
                  {newsItem.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t border-white/20">
        <p className="text-white/70 text-xs">
          💡 Mantente informado sobre las últimas actualizaciones y anuncios del sistema
        </p>
      </div>
    </div>
  )
}
