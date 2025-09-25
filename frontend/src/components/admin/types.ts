export type AdminSection = 'dashboard' | 'models' | 'chatters' | 'tickets' | 'tags' | 'news' | 'settings'

export interface AdminStats {
  totalModels: number
  activeModels: number
  pendingModels: number
  totalChatters: number
  activeChatters: number
  totalTickets: number
  pendingTickets: number
  completedTickets: number
}

export interface Model {
  id: string
  profile_id: string
  modelo: string
  contacto: string
  apps_selected: string[]
  aprobado: boolean
  activo: boolean
  eliminado: boolean
  created_at: string
  updated_at: string
}

export interface Chatter {
  id: string
  chatter_id: string
  username: string
  email: string
  fullname: string
  is_active: boolean
  model_ids: string[]
  model_names: string[]
  created_at: string
}

export interface Ticket {
  id: string
  ticket_id: string
  modelo_id: string
  modelo_name: string
  chatter_id: string
  chatter_name: string
  type: string
  status: string
  price: number
  title: string
  description: string
  priority: string
  deadline: string
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  name: string
  created_at: string
}

export interface AdminUser {
  id: string
  username: string
  email: string
  role: 'admin' | 'moderator'
  last_login: string
}
