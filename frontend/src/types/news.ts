export interface NewsItem {
  id: string
  title: string
  content: string
  type: 'announcement' | 'update' | 'warning' | 'info'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  
  // Targeting - Las noticias van dirigidas a chatters, pero pueden estar filtradas por modelos específicas
  targetType: 'all' | 'specific_models' | 'specific_chatters'
  targetModels?: string[] // IDs de modelos específicas - Solo chatters con estas modelos verán la noticia
  targetChatters?: string[] // IDs de chatters específicos - Para noticias dirigidas directamente a chatters
  
  // Metadata
  isActive: boolean
  isPinned: boolean
  showUntil?: string // Fecha de expiración
  createdBy: string // ID del admin que creó la noticia
  createdAt: string
  updatedAt: string
  
  // Analytics
  viewsCount: number
  readBy: string[] // IDs de chatters que han leído la noticia
}

export interface NewsTargeting {
  type: 'all' | 'specific_models' | 'specific_chatters'
  models?: string[] // IDs de modelos específicas - Solo chatters con estas modelos verán la noticia
  chatters?: string[] // IDs de chatters específicos - Para noticias dirigidas directamente a chatters
}

export interface NewsStats {
  totalNews: number
  activeNews: number
  totalViews: number
  totalReads: number
  newsByType: Record<string, number>
  newsByPriority: Record<string, number>
}

export interface ChatterNewsView {
  newsId: string
  chatterId: string
  viewedAt: string
  readAt?: string
  dismissedAt?: string
}

// Tipos para el formulario de creación
export interface CreateNewsData {
  title: string
  content: string
  type: NewsItem['type']
  priority: NewsItem['priority']
  targetType: NewsItem['targetType']
  targetModels?: string[]
  targetChatters?: string[]
  isPinned: boolean
  showUntil?: string
}

export interface UpdateNewsData extends Partial<CreateNewsData> {
  isActive?: boolean
}
