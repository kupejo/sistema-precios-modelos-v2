// Servicio de datos local para simular Supabase
// En producción, esto se conectaría a la base de datos real

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

export interface ActivityLog {
  id: string
  action: string
  user: string
  timestamp: string
  details?: string
}

// Datos iniciales simulados
const models: Model[] = [
  {
    id: '1',
    profile_id: 'MOD001',
    modelo: 'Ana García',
    contacto: '@anagarcia',
    apps_selected: ['whatsapp', 'telegram'],
    aprobado: true,
    activo: true,
    eliminado: false,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    profile_id: 'MOD002',
    modelo: 'María López',
    contacto: '@marialopez',
    apps_selected: ['instagram', 'snapchat'],
    aprobado: false,
    activo: false,
    eliminado: false,
    created_at: '2024-01-14T15:45:00Z',
    updated_at: '2024-01-14T15:45:00Z'
  },
  {
    id: '3',
    profile_id: 'MOD003',
    modelo: 'Sofía Rodríguez',
    contacto: '@sofiardz',
    apps_selected: ['whatsapp', 'instagram', 'telegram'],
    aprobado: true,
    activo: false,
    eliminado: false,
    created_at: '2024-01-13T09:20:00Z',
    updated_at: '2024-01-13T09:20:00Z'
  },
  {
    id: '4',
    profile_id: 'MOD004',
    modelo: 'Isabella Martínez',
    contacto: '@isabella_m',
    apps_selected: ['snapchat', 'teams'],
    aprobado: false,
    activo: false,
    eliminado: false,
    created_at: '2024-01-12T14:15:00Z',
    updated_at: '2024-01-12T14:15:00Z'
  },
  {
    id: '5',
    profile_id: 'MOD005',
    modelo: 'Valentina González',
    contacto: '@valentina_g',
    apps_selected: ['whatsapp'],
    aprobado: true,
    activo: true,
    eliminado: false,
    created_at: '2024-01-11T11:30:00Z',
    updated_at: '2024-01-11T11:30:00Z'
  }
]

const chatters: Chatter[] = [
  {
    id: '1',
    chatter_id: 'CHAT001',
    username: 'carlos_lopez',
    email: 'carlos@example.com',
    fullname: 'Carlos López',
    is_active: true,
    model_ids: ['1', '5'],
    model_names: ['Ana García', 'Valentina González'],
    created_at: '2024-01-10T08:00:00Z'
  },
  {
    id: '2',
    chatter_id: 'CHAT002',
    username: 'miguel_rodriguez',
    email: 'miguel@example.com',
    fullname: 'Miguel Rodríguez',
    is_active: true,
    model_ids: ['1', '3'],
    model_names: ['Ana García', 'Sofía Rodríguez'],
    created_at: '2024-01-09T16:30:00Z'
  },
  {
    id: '3',
    chatter_id: 'CHAT003',
    username: 'diego_martinez',
    email: 'diego@example.com',
    fullname: 'Diego Martínez',
    is_active: false,
    model_ids: ['2'],
    model_names: ['María López'],
    created_at: '2024-01-08T13:45:00Z'
  }
]

const tickets: Ticket[] = [
  {
    id: '1',
    ticket_id: 'TKT001',
    modelo_id: '1',
    modelo_name: 'Ana García',
    chatter_id: '1',
    chatter_name: 'Carlos López',
    type: 'Soporte',
    status: 'pending',
    price: 50,
    title: 'Problema con videollamada',
    description: 'No puedo iniciar videollamada con el modelo',
    priority: 'high',
    deadline: '2024-01-16T18:00:00Z',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    ticket_id: 'TKT002',
    modelo_id: '2',
    modelo_name: 'María López',
    chatter_id: '3',
    chatter_name: 'Diego Martínez',
    type: 'Consulta',
    status: 'completed',
    price: 25,
    title: 'Consulta sobre precios',
    description: 'Quería saber sobre los precios de fotos personalizadas',
    priority: 'medium',
    deadline: '2024-01-14T17:00:00Z',
    created_at: '2024-01-14T09:00:00Z',
    updated_at: '2024-01-14T15:30:00Z'
  }
]

const tags: Tag[] = [
  { id: '1', name: 'VIP', created_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'Nuevo', created_at: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'Popular', created_at: '2024-01-01T00:00:00Z' }
]

const activityLog: ActivityLog[] = [
  {
    id: '1',
    action: 'Nuevo modelo registrado',
    user: 'Ana García',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    action: 'Ticket completado',
    user: 'Carlos López',
    timestamp: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    action: 'Chatter activado',
    user: 'Miguel Rodríguez',
    timestamp: '2024-01-13T14:20:00Z'
  },
  {
    id: '4',
    action: 'Modelo aprobado',
    user: 'Admin',
    timestamp: '2024-01-12T11:45:00Z'
  }
]

// Funciones para obtener datos
export const getStats = async (): Promise<AdminStats> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const totalModels = models.filter(m => !m.eliminado).length
  const activeModels = models.filter(m => m.activo && !m.eliminado).length
  const pendingModels = models.filter(m => !m.aprobado && !m.eliminado).length
  const totalChatters = chatters.length
  const activeChatters = chatters.filter(c => c.is_active).length
  const totalTickets = tickets.length
  const pendingTickets = tickets.filter(t => t.status === 'pending').length
  const completedTickets = tickets.filter(t => t.status === 'completed').length

  return {
    totalModels,
    activeModels,
    pendingModels,
    totalChatters,
    activeChatters,
    totalTickets,
    pendingTickets,
    completedTickets
  }
}

export const getModels = async (): Promise<Model[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return models.filter(m => !m.eliminado)
}

export const getChatters = async (): Promise<Chatter[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return chatters
}

export const getTickets = async (): Promise<Ticket[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return tickets
}

export const getTags = async (): Promise<Tag[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return tags
}

export const getRecentActivity = async (): Promise<ActivityLog[]> => {
  await new Promise(resolve => setTimeout(resolve, 200))
  return activityLog.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10)
}

// Funciones para modificar datos
export const approveModel = async (modelId: string): Promise<Model> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const model = models.find(m => m.id === modelId)
  if (!model) throw new Error('Modelo no encontrado')
  
  model.aprobado = true
  model.activo = true
  model.updated_at = new Date().toISOString()
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Modelo aprobado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Modelo ${model.modelo} aprobado`
  })
  
  return model
}

export const toggleModelActive = async (modelId: string): Promise<Model> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const model = models.find(m => m.id === modelId)
  if (!model) throw new Error('Modelo no encontrado')
  
  model.activo = !model.activo
  model.updated_at = new Date().toISOString()
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: model.activo ? 'Modelo activado' : 'Modelo desactivado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Modelo ${model.modelo} ${model.activo ? 'activado' : 'desactivado'}`
  })
  
  return model
}

export const deleteModel = async (modelId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const model = models.find(m => m.id === modelId)
  if (!model) throw new Error('Modelo no encontrado')
  
  model.eliminado = true
  model.updated_at = new Date().toISOString()
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Modelo eliminado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Modelo ${model.modelo} eliminado`
  })
}

export const createModel = async (modelData: Omit<Model, 'id' | 'created_at' | 'updated_at'>): Promise<Model> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Generar IDs únicos
  const newId = (models.length + 1).toString()
  const profileId = `MODEL_${Date.now()}_${Math.random().toString(36).substr(2, 5).toUpperCase()}`
  
  const newModel: Model = {
    ...modelData,
    id: newId,
    profile_id: profileId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  models.push(newModel)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Nuevo modelo creado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Modelo ${newModel.modelo} creado`
  })
  
  return newModel
}

export const createChatter = async (chatterData: Omit<Chatter, 'id' | 'created_at'>): Promise<Chatter> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Generar IDs únicos
  const newId = (chatters.length + 1).toString()
  const chatterId = `CHATTER_${Date.now()}_${Math.random().toString(36).substr(2, 5).toUpperCase()}`
  
  const newChatter: Chatter = {
    ...chatterData,
    id: newId,
    chatter_id: chatterId,
    created_at: new Date().toISOString()
  }
  
  chatters.push(newChatter)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Nuevo chatter creado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Chatter ${newChatter.fullname} creado`
  })
  
  return newChatter
}

export const createTicket = async (ticketData: Omit<Ticket, 'id' | 'ticket_id' | 'created_at' | 'updated_at'>): Promise<Ticket> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Generar IDs únicos
  const newId = (tickets.length + 1).toString()
  const ticketId = `TKT_${Date.now()}_${Math.random().toString(36).substr(2, 5).toUpperCase()}`
  
  const newTicket: Ticket = {
    ...ticketData,
    id: newId,
    ticket_id: ticketId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  tickets.push(newTicket)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Nuevo ticket creado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Ticket ${newTicket.title} creado`
  })
  
  return newTicket
}

export const createTag = async (tagData: Omit<Tag, 'id' | 'created_at'>): Promise<Tag> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Generar ID único
  const newId = (tags.length + 1).toString()
  
  const newTag: Tag = {
    ...tagData,
    id: newId,
    created_at: new Date().toISOString()
  }
  
  tags.push(newTag)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Nueva etiqueta creada',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Etiqueta ${newTag.name} creada`
  })
  
  return newTag
}

export const deleteTag = async (tagId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const tagIndex = tags.findIndex(t => t.id === tagId)
  if (tagIndex === -1) throw new Error('Etiqueta no encontrada')
  
  const tag = tags[tagIndex]
  tags.splice(tagIndex, 1)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Etiqueta eliminada',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Etiqueta ${tag.name} eliminada`
  })
}

export const updateTicketStatus = async (ticketId: string, status: string): Promise<Ticket> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const ticket = tickets.find(t => t.id === ticketId)
  if (!ticket) throw new Error('Ticket no encontrado')
  
  ticket.status = status
  ticket.updated_at = new Date().toISOString()
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Ticket actualizado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Ticket ${ticket.title} marcado como ${status}`
  })
  
  return ticket
}

// Funciones de búsqueda y filtrado
export const searchModels = async (query: string, filters: {
  status?: string
  app?: string
}): Promise<Model[]> => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  let filteredModels = models.filter(m => !m.eliminado)
  
  // Búsqueda por texto
  if (query) {
    filteredModels = filteredModels.filter(m => 
      m.modelo?.toLowerCase().includes(query.toLowerCase()) ||
      m.contacto?.toLowerCase().includes(query.toLowerCase()) ||
      m.profile_id?.toLowerCase().includes(query.toLowerCase())
    )
  }
  
  // Filtro por estado
  if (filters.status) {
    switch (filters.status) {
      case 'approved':
        filteredModels = filteredModels.filter(m => m.aprobado)
        break
      case 'pending':
        filteredModels = filteredModels.filter(m => !m.aprobado)
        break
      case 'active':
        filteredModels = filteredModels.filter(m => m.activo)
        break
      case 'inactive':
        filteredModels = filteredModels.filter(m => !m.activo)
        break
    }
  }
  
  // Filtro por app
  if (filters.app) {
    filteredModels = filteredModels.filter(m => 
      m.apps_selected.includes(filters.app!)
    )
  }
  
  return filteredModels
}

// Configuración del sistema
export interface SystemSettings {
  systemName: string
  systemDescription: string
  emailNotifications: boolean
  pushNotifications: boolean
  sessionTimeout: number
  twoFactorAuth: boolean
}

let systemSettings: SystemSettings = {
  systemName: 'Sistema de Precios Modelos',
  systemDescription: 'Sistema para gestión de precios de modelos',
  emailNotifications: true,
  pushNotifications: false,
  sessionTimeout: 60,
  twoFactorAuth: false
}

export const getSystemSettings = async (): Promise<SystemSettings> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { ...systemSettings }
}

export const updateSystemSettings = async (settings: Partial<SystemSettings>): Promise<SystemSettings> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  systemSettings = { ...systemSettings, ...settings }
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Configuración actualizada',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: 'Configuración del sistema modificada'
  })
  
  return { ...systemSettings }
}

// Función para actualizar modelos asignados a un chatter
export const updateChatterModels = async (chatterId: string, modelIds: string[], modelNames: string[]): Promise<Chatter> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const chatter = chatters.find(c => c.id === chatterId)
  if (!chatter) throw new Error('Chatter no encontrado')
  
  chatter.model_ids = modelIds
  chatter.model_names = modelNames
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Modelos actualizados',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Modelos asignados a chatter ${chatter.fullname} actualizados`
  })
  
  return chatter
}

// Función para cambiar el estado activo de un chatter
export const toggleChatterStatus = async (chatterId: string): Promise<Chatter> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const chatter = chatters.find(c => c.id === chatterId)
  if (!chatter) throw new Error('Chatter no encontrado')
  
  chatter.is_active = !chatter.is_active
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Estado de chatter actualizado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Chatter ${chatter.fullname} ${chatter.is_active ? 'activado' : 'desactivado'}`
  })
  
  return chatter
}

// Función para obtener tickets de un chatter específico
export const getTicketsByChatter = async (chatterId: string): Promise<Ticket[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return tickets.filter(ticket => ticket.chatter_id === chatterId)
}

// Función para cancelar un ticket
export const cancelTicket = async (ticketId: string): Promise<Ticket> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const ticket = tickets.find(t => t.ticket_id === ticketId)
  if (!ticket) {
    throw new Error('Ticket no encontrado')
  }
  
  ticket.status = 'cancelled'
  ticket.updated_at = new Date().toISOString()
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Ticket cancelado',
    user: 'Chatter',
    timestamp: new Date().toISOString(),
    details: `Ticket ${ticket.title} cancelado`
  })
  
  return ticket
}

// ================ FUNCIONES DE UPLOAD ================

/**
 * Crea un token de upload para un ticket
 */
export const createUploadToken = async (ticketId: string): Promise<{ token: string; uploadUrl: string }> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Generar token único
  const token = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  // Enlace específico para el ticket - no es una página pública
  const uploadUrl = `${window.location.origin}/api/upload/${token}`
  
  // En un sistema real, aquí guardarías el token en la base de datos
  console.log(`Token de upload creado para ticket ${ticketId}:`, { token, uploadUrl })
  
  return { token, uploadUrl }
}

/**
 * Obtiene el link de upload para un ticket
 */
export const getUploadLink = async (ticketId: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  // En un sistema real, aquí buscarías el token existente o crearías uno nuevo
  const { uploadUrl } = await createUploadToken(ticketId)
  return uploadUrl
}
