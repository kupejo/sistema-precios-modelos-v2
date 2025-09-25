// Servicio de datos local para simular Supabase
// En producción, esto se conectaría a la base de datos real

export interface Model {
  id: string
  profile_id: string
  modelo: string
  contacto: string
  apps_selected: string[]
  app_handle_whatsapp?: string
  app_handle_telegram?: string
  app_handle_teams?: string
  app_handle_instagram?: string
  app_handle_snapchat?: string
  app_handle_otra?: string
  app_otra_nombre?: string
  extras_videollamadas?: string[]
  extras_custom?: string[]
  extras_generales?: string
  precios?: Record<string, number>
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
  password: string
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

export interface NewsItem {
  id: string
  title: string
  content: string
  type: 'announcement' | 'update' | 'warning' | 'info'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  
  // Targeting
  targetType: 'all' | 'specific_models' | 'specific_chatters'
  targetModels?: string[]
  targetChatters?: string[]
  
  // Metadata
  isActive: boolean
  isPinned: boolean
  showUntil?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  
  // Analytics
  viewsCount: number
  readBy: string[]
}

// Función para cargar datos desde localStorage
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error)
    return defaultValue
  }
}

// Función para guardar datos en localStorage
const saveToStorage = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
  }
}

// Función para limpiar todos los datos del localStorage (útil para testing)
export const clearAllData = (): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem('sistema_models')
    localStorage.removeItem('sistema_chatters')
    localStorage.removeItem('sistema_tickets')
    localStorage.removeItem('sistema_tags')
    localStorage.removeItem('sistema_activity_log')
    localStorage.removeItem('sistema_ticket_audit') // Agregar limpieza de bitácora de tickets
    
    // Reiniciar arrays en memoria
    models = []
    chatters = []
    tickets = []
    tags = []
    activityLog = []
    ticketAuditLog = [] // Reiniciar bitácora de tickets
    
    console.log('Todos los datos han sido limpiados del localStorage')
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

// Función de debug para verificar el estado del localStorage
export const debugLocalStorage = (): void => {
  if (typeof window === 'undefined') return
  
  console.log('🔍 DEBUG LOCALSTORAGE:')
  console.log('  - Models:', localStorage.getItem('sistema_models') ? JSON.parse(localStorage.getItem('sistema_models')!).length : 0)
  console.log('  - Chatters:', localStorage.getItem('sistema_chatters') ? JSON.parse(localStorage.getItem('sistema_chatters')!).length : 0)
  console.log('  - Tickets:', localStorage.getItem('sistema_tickets') ? JSON.parse(localStorage.getItem('sistema_tickets')!).length : 0)
  console.log('  - Tags:', localStorage.getItem('sistema_tags') ? JSON.parse(localStorage.getItem('sistema_tags')!).length : 0)
  console.log('  - Activity Log:', localStorage.getItem('sistema_activity_log') ? JSON.parse(localStorage.getItem('sistema_activity_log')!).length : 0)
  console.log('  - Ticket Audit Log:', localStorage.getItem('sistema_ticket_audit') ? JSON.parse(localStorage.getItem('sistema_ticket_audit')!).length : 0)
  
  console.log('🔍 DEBUG MEMORIA:')
  console.log('  - Models en memoria:', models.length)
  console.log('  - Chatters en memoria:', chatters.length)
  console.log('  - Tickets en memoria:', tickets.length)
  console.log('  - Tags en memoria:', tags.length)
  console.log('  - Activity Log en memoria:', activityLog.length)
  console.log('  - Ticket Audit Log en memoria:', ticketAuditLog.length)
}

// Datos iniciales vacíos para testing real desde cero
let models: Model[] = loadFromStorage('sistema_models', [])
let chatters: Chatter[] = loadFromStorage('sistema_chatters', [])
let tickets: Ticket[] = loadFromStorage('sistema_tickets', [])
let tags: Tag[] = loadFromStorage('sistema_tags', [])
let activityLog: ActivityLog[] = loadFromStorage('sistema_activity_log', [])

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
  console.log('🔍 getModels - Modelos cargados:', models)
  console.log('🔍 getModels - Total de modelos:', models.length)
  if (models.length > 0) {
    console.log('🔍 getModels - Primer modelo:', models[0])
    console.log('🔍 getModels - Precios del primer modelo:', models[0].precios)
  }
  return models.filter(m => !m.eliminado)
}

export const getChatters = async (): Promise<Chatter[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('🔍 getChatters - Chatters cargados:', chatters)
  console.log('🔍 getChatters - Total chatters:', chatters.length)
  if (chatters.length > 0) {
    console.log('🔍 getChatters - Primer chatter:', chatters[0])
    console.log('🔍 getChatters - Contraseña del primer chatter:', chatters[0].password)
  }
  return chatters
}

export const getTickets = async (): Promise<Ticket[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('🔍 getTickets - Tickets en memoria:', tickets.length)
  console.log('🔍 getTickets - Tickets desde localStorage:', loadFromStorage('sistema_tickets', []).length)
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
  console.log('🔍 createModel - Datos recibidos:', modelData)
  console.log('🔍 createModel - Precios recibidos:', modelData.precios)
  console.log('🔍 createModel - Apps recibidas:', modelData.apps_selected)
  console.log('🔍 createModel - Extras videollamadas:', modelData.extras_videollamadas)
  console.log('🔍 createModel - Extras custom:', modelData.extras_custom)
  console.log('🔍 createModel - Extras generales:', modelData.extras_generales)
  
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
  
  console.log('🔍 createModel - Modelo creado:', newModel)
  
  models.push(newModel)
  
  // Guardar en localStorage
  saveToStorage('sistema_models', models)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Nuevo modelo creado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Modelo ${newModel.modelo} creado`
  })
  
  // Guardar log de actividad
  saveToStorage('sistema_activity_log', activityLog)
  
  console.log('Modelo creado y guardado:', newModel)
  console.log('Total modelos en storage:', models.length)
  
  return newModel
}

export const createChatter = async (chatterData: Omit<Chatter, 'id' | 'created_at'>): Promise<Chatter> => {
  console.log('🔍 createChatter - Datos recibidos:', chatterData)
  console.log('🔍 createChatter - Contraseña recibida:', chatterData.password)
  
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
  
  console.log('🔍 createChatter - Chatter creado:', newChatter)
  console.log('🔍 createChatter - Contraseña en chatter creado:', newChatter.password)
  
  chatters.push(newChatter)
  
  // Guardar en localStorage
  saveToStorage('sistema_chatters', chatters)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Nuevo chatter creado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Chatter ${newChatter.fullname} creado`
  })
  
  // Guardar log de actividad
  saveToStorage('sistema_activity_log', activityLog)
  
  console.log('🔍 createChatter - Chatter guardado en localStorage')
  console.log('🔍 createChatter - Total chatters en storage:', chatters.length)
  
  return newChatter
}

export const createTicket = async (ticketData: Omit<Ticket, 'id' | 'ticket_id' | 'created_at' | 'updated_at'>): Promise<Ticket> => {
  console.log('🔍 createTicket - Creando ticket:', ticketData)
  
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
  
  // IMPORTANTE: Guardar en localStorage para persistir
  saveToStorage('sistema_tickets', tickets)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Nuevo ticket creado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Ticket ${newTicket.title} creado`
  })
  
  // Agregar entrada inicial a bitácora de tickets - solo campos del formulario
  const initialFields = {
    title: newTicket.title,
    description: newTicket.description,
    type: newTicket.type,
    priority: newTicket.priority,
    price: newTicket.price,
    deadline: newTicket.deadline
  }
  addTicketAuditLog(newTicket.id, 'TICKET_CREATED', null, initialFields, ticketData.chatter_name || 'Sistema', 'Ticket creado inicialmente')
  
  console.log('🔍 createTicket - Ticket creado y guardado:', newTicket)
  console.log('🔍 createTicket - Total tickets en memoria:', tickets.length)
  
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
export const updateChatter = async (chatterId: string, chatterData: Partial<Omit<Chatter, 'id' | 'chatter_id' | 'created_at'>>): Promise<Chatter> => {
  console.log('🔍 updateChatter - Actualizando chatter:', chatterId, chatterData)
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const chatterIndex = chatters.findIndex(c => c.id === chatterId)
  if (chatterIndex === -1) {
    throw new Error('Chatter no encontrado')
  }
  
  const updatedChatter = {
    ...chatters[chatterIndex],
    ...chatterData
  }
  
  chatters[chatterIndex] = updatedChatter
  
  // Guardar en localStorage
  saveToStorage('sistema_chatters', chatters)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Chatter actualizado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Chatter ${updatedChatter.fullname} - Información actualizada`
  })
  
  // Guardar log de actividad
  saveToStorage('sistema_activity_log', activityLog)
  
  console.log('🔍 updateChatter - Chatter actualizado:', updatedChatter)
  return updatedChatter
}

export const updateChatterModels = async (chatterId: string, modelIds: string[], modelNames: string[]): Promise<Chatter> => {
  console.log('updateChatterModels llamado con:', { chatterId, modelIds, modelNames })
  
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const chatter = chatters.find(c => c.id === chatterId)
  if (!chatter) {
    console.error('Chatter no encontrado con ID:', chatterId)
    throw new Error('Chatter no encontrado')
  }
  
  console.log('Chatter encontrado:', chatter)
  console.log('Actualizando modelos de:', chatter.model_ids, 'a:', modelIds)
  
  chatter.model_ids = modelIds
  chatter.model_names = modelNames
  
  console.log('Chatter actualizado:', chatter)
  
  // Guardar en localStorage
  saveToStorage('sistema_chatters', chatters)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Modelos actualizados',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Modelos asignados a chatter ${chatter.fullname} actualizados`
  })
  
  // Guardar log de actividad
  saveToStorage('sistema_activity_log', activityLog)
  
  return chatter
}

// Función para actualizar un modelo
export const updateModel = async (modelId: string, modelData: Partial<Omit<Model, 'id' | 'created_at' | 'updated_at'>>): Promise<Model> => {
  console.log('updateModel llamado con:', { modelId, modelData })
  
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const model = models.find(m => m.id === modelId)
  if (!model) {
    console.error('Modelo no encontrado con ID:', modelId)
    throw new Error('Modelo no encontrado')
  }
  
  console.log('Modelo encontrado:', model)
  console.log('Actualizando datos de:', model.modelo, 'con:', modelData)
  
  // Actualizar los campos proporcionados
  Object.keys(modelData).forEach(key => {
    if (key in model) {
      (model as any)[key] = (modelData as any)[key]
    }
  })
  
  // Actualizar timestamp
  model.updated_at = new Date().toISOString()
  
  console.log('Modelo actualizado:', model)
  
  // Guardar en localStorage
  saveToStorage('sistema_models', models)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Modelo actualizado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Modelo ${model.modelo} actualizado`
  })
  
  // Guardar log de actividad
  saveToStorage('sistema_activity_log', activityLog)
  
  return model
}

// Función para cambiar el estado activo de un chatter
export const toggleChatterStatus = async (chatterId: string): Promise<Chatter> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const chatter = chatters.find(c => c.id === chatterId)
  if (!chatter) throw new Error('Chatter no encontrado')
  
  chatter.is_active = !chatter.is_active
  
  // Guardar en localStorage
  saveToStorage('sistema_chatters', chatters)
  
  // Agregar a log de actividad
  activityLog.unshift({
    id: Date.now().toString(),
    action: 'Estado de chatter actualizado',
    user: 'Admin',
    timestamp: new Date().toISOString(),
    details: `Chatter ${chatter.fullname} ${chatter.is_active ? 'activado' : 'desactivado'}`
  })
  
  // Guardar log de actividad
  saveToStorage('sistema_activity_log', activityLog)
  
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

// ================ FUNCIONES DE EDICIÓN DE TICKETS ================

export const updateTicket = async (ticketId: string, ticketData: Partial<Omit<Ticket, 'id' | 'ticket_id' | 'created_at'>>): Promise<Ticket> => {
  console.log('🔍 updateTicket - Actualizando ticket:', ticketId, ticketData)
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const ticketIndex = tickets.findIndex(t => t.id === ticketId)
  if (ticketIndex === -1) {
    throw new Error('Ticket no encontrado')
  }
  
  const oldTicket = { ...tickets[ticketIndex] }
  const updatedTicket = {
    ...tickets[ticketIndex],
    ...ticketData,
    updated_at: new Date().toISOString()
  }
  
  tickets[ticketIndex] = updatedTicket
  
  // Guardar en localStorage
  saveToStorage('sistema_tickets', tickets)
  
  // Detectar cambios específicos y crear objetos con solo los campos modificados
  const changes: string[] = []
  const changedFields: Record<string, any> = {}
  const oldChangedFields: Record<string, any> = {}
  // Solo trackear los campos que realmente cambiaron (sin campos técnicos)
  const fieldsToTrack = ['title', 'description', 'type', 'priority', 'price', 'deadline'] as const
  
  fieldsToTrack.forEach(field => {
    const oldValue = (oldTicket as any)[field]
    const newValue = (ticketData as any)[field]
    if (newValue !== undefined && oldValue !== newValue) {
      changes.push(`${field}: "${oldValue}" → "${newValue}"`)
      changedFields[field] = newValue
      oldChangedFields[field] = oldValue
    }
  })
  
  const changeDetails = changes.length > 0 ? `Cambios: ${changes.join(', ')}` : 'Sin cambios detectados'
  
  // Agregar a bitácora de cambios con solo los campos que cambiaron
  addTicketAuditLog(ticketId, 'TICKET_UPDATED', oldChangedFields, changedFields, 'Sistema', changeDetails)
  
  console.log('🔍 updateTicket - Ticket actualizado:', updatedTicket)
  console.log('🔍 updateTicket - Cambios detectados:', changes)
  console.log('🔍 updateTicket - Campos antiguos modificados:', oldChangedFields)
  console.log('🔍 updateTicket - Campos nuevos modificados:', changedFields)
  return updatedTicket
}

export const completeTicket = async (ticketId: string, completedBy: string): Promise<Ticket> => {
  console.log('🔍 completeTicket - Completando ticket:', ticketId, completedBy)
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const ticketIndex = tickets.findIndex(t => t.id === ticketId)
  if (ticketIndex === -1) {
    throw new Error('Ticket no encontrado')
  }
  
  const oldTicket = { ...tickets[ticketIndex] }
  const updatedTicket = {
    ...tickets[ticketIndex],
    status: 'completed',
    updated_at: new Date().toISOString()
  }
  
  tickets[ticketIndex] = updatedTicket
  
  // Guardar en localStorage
  saveToStorage('sistema_tickets', tickets)
  
  // Solo mostrar el cambio de status
  const oldChangedFields = { status: oldTicket.status }
  const changedFields = { status: 'completed' }
  
  // Agregar a bitácora de cambios
  addTicketAuditLog(ticketId, 'TICKET_COMPLETED', oldChangedFields, changedFields, completedBy, 'Ticket marcado como completado')
  
  console.log('🔍 completeTicket - Ticket completado:', updatedTicket)
  return updatedTicket
}

export const deleteTicketById = async (ticketId: string, deletedBy: string): Promise<void> => {
  console.log('🔍 deleteTicketById - Eliminando ticket:', ticketId, deletedBy)
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const ticketIndex = tickets.findIndex(t => t.id === ticketId)
  if (ticketIndex === -1) {
    throw new Error('Ticket no encontrado')
  }
  
  const ticketToDelete = tickets[ticketIndex]
  
  // Solo mostrar campos del formulario antes de eliminar
  const deletedFields = {
    title: ticketToDelete.title,
    description: ticketToDelete.description,
    type: ticketToDelete.type,
    priority: ticketToDelete.priority,
    price: ticketToDelete.price,
    deadline: ticketToDelete.deadline
  }
  
  // Agregar a bitácora antes de eliminar
  addTicketAuditLog(ticketId, 'TICKET_DELETED', deletedFields, null, deletedBy, 'Ticket eliminado del sistema')
  
  // Eliminar ticket
  tickets.splice(ticketIndex, 1)
  
  // Guardar en localStorage
  saveToStorage('sistema_tickets', tickets)
  
  console.log('🔍 deleteTicketById - Ticket eliminado:', ticketId)
}

// ================ SISTEMA DE BITÁCORA DE TICKETS ================

export interface TicketAuditLog {
  id: string
  ticketId: string
  action: string
  oldValues: any
  newValues: any
  changedBy: string
  timestamp: string
  details?: string
}

// Array para almacenar la bitácora de tickets
let ticketAuditLog: TicketAuditLog[] = loadFromStorage('sistema_ticket_audit', [])

const addTicketAuditLog = (ticketId: string, action: string, oldValues: any, newValues: any, changedBy: string, details?: string) => {
  const auditEntry: TicketAuditLog = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    ticketId,
    action,
    oldValues,
    newValues,
    changedBy,
    timestamp: new Date().toISOString(),
    details
  }
  
  ticketAuditLog.unshift(auditEntry)
  
  // Guardar en localStorage
  saveToStorage('sistema_ticket_audit', ticketAuditLog)
  
  console.log('🔍 addTicketAuditLog - Entrada agregada:', auditEntry)
}

export const getTicketAuditLog = async (ticketId: string): Promise<TicketAuditLog[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const ticketAudits = ticketAuditLog.filter(audit => audit.ticketId === ticketId)
  console.log('🔍 getTicketAuditLog - Bitácora del ticket:', ticketId, ticketAudits)
  
  return ticketAudits
}

export const getAllTicketAuditLogs = async (): Promise<TicketAuditLog[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  console.log('🔍 getAllTicketAuditLogs - Total entradas de bitácora:', ticketAuditLog.length)
  return ticketAuditLog
}

// ================ SISTEMA DE PERMISOS ================

export const canChatterEditTicket = async (chatterId: string, ticketId: string): Promise<boolean> => {
  console.log('🔍 canChatterEditTicket - Verificando permisos:', chatterId, ticketId)
  
  await new Promise(resolve => setTimeout(resolve, 200))
  
  // Buscar el ticket
  const ticket = tickets.find(t => t.id === ticketId)
  if (!ticket) {
    console.log('🔍 canChatterEditTicket - Ticket no encontrado')
    return false
  }
  
  // Buscar el chatter
  const chatter = chatters.find(c => c.id === chatterId)
  if (!chatter) {
    console.log('🔍 canChatterEditTicket - Chatter no encontrado')
    return false
  }
  
  // Verificar si el chatter tiene asignada la modelo del ticket
  const canEdit = chatter.model_ids.includes(ticket.modelo_id)
  
  console.log('🔍 canChatterEditTicket - Permiso:', canEdit, {
    chatterId,
    ticketId,
    ticketModelId: ticket.modelo_id,
    chatterModelIds: chatter.model_ids
  })
  
  return canEdit
}

export const getChattersForTicket = async (ticketId: string): Promise<Chatter[]> => {
  console.log('🔍 getChattersForTicket - Obteniendo chatters para ticket:', ticketId)
  
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Buscar el ticket
  const ticket = tickets.find(t => t.id === ticketId)
  if (!ticket) {
    console.log('🔍 getChattersForTicket - Ticket no encontrado')
    return []
  }
  
  // Buscar chatters que tengan asignada la modelo del ticket
  const authorizedChatters = chatters.filter(c => 
    c.model_ids.includes(ticket.modelo_id) && c.is_active
  )
  
  console.log('🔍 getChattersForTicket - Chatters autorizados:', authorizedChatters.length)
  return authorizedChatters
}

// ================ FUNCIONES DE UTILIDAD PARA BITÁCORA ================

/**
 * Función para probar el sistema de bitácora de tickets
 */
export const testTicketAuditSystem = async (): Promise<void> => {
  console.log('🧪 Probando sistema de bitácora de tickets...')
  
  // Verificar si hay tickets
  if (tickets.length === 0) {
    console.log('❌ No hay tickets para probar la bitácora')
    return
  }
  
  const testTicket = tickets[0]
  console.log('🔍 Ticket de prueba:', testTicket)
  
  // Simular una actualización
  const testUpdate = {
    title: `Ticket actualizado - ${new Date().toLocaleTimeString()}`,
    description: 'Descripción actualizada para prueba de bitácora'
  }
  
  try {
    await updateTicket(testTicket.id, testUpdate)
    
    // Obtener bitácora
    const auditLog = await getTicketAuditLog(testTicket.id)
    console.log('🔍 Bitácora del ticket:', auditLog)
    
    console.log('✅ Prueba de bitácora completada')
  } catch (error) {
    console.error('❌ Error en prueba de bitácora:', error)
  }
}

// ================ SISTEMA DE NOTICIAS ================

/**
 * Obtiene todas las noticias
 */
export const getAllNews = async (): Promise<NewsItem[]> => {
  return loadFromStorage<NewsItem[]>('news', [])
}

/**
 * Obtiene noticias activas
 */
export const getActiveNews = async (): Promise<NewsItem[]> => {
  const allNews = await getAllNews()
  const now = new Date().toISOString()
  
  return allNews.filter(news => 
    news.isActive && 
    (!news.showUntil || new Date(news.showUntil) > new Date(now))
  )
}

/**
 * Obtiene noticias relevantes para un chatter específico
 * 
 * Lógica de targeting:
 * - 'all': Todas las noticias activas
 * - 'specific_models': Solo noticias dirigidas a modelos que el chatter tiene asignadas
 * - 'specific_chatters': Solo noticias dirigidas directamente al chatter
 * 
 * @param chatterId - ID del chatter
 * @returns Array de noticias relevantes para el chatter
 */
export const getNewsForChatter = async (chatterId: string): Promise<NewsItem[]> => {
  const activeNews = await getActiveNews()
  const chatter = await getChatterById(chatterId)
  
  if (!chatter) return []
  
  return activeNews.filter(news => {
    // Si es para todos los chatters, incluir
    if (news.targetType === 'all') return true
    
    // Si es para chatters específicos, verificar si el chatter está en la lista
    if (news.targetType === 'specific_chatters') {
      return news.targetChatters?.includes(chatterId) || false
    }
    
    // Si es para modelos específicas, verificar si el chatter tiene alguna de esas modelos asignadas
    if (news.targetType === 'specific_models') {
      return news.targetModels?.some(modelId => 
        chatter.model_ids.includes(modelId)
      ) || false
    }
    
    return false
  })
}

/**
 * Crea una nueva noticia
 */
export const createNews = async (newsData: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'readBy'>): Promise<NewsItem> => {
  const allNews = await getAllNews()
  
  const newNews: NewsItem = {
    ...newsData,
    id: `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewsCount: 0,
    readBy: []
  }
  
  allNews.unshift(newNews) // Agregar al inicio
  saveToStorage('news', allNews)
  
  console.log('📰 Nueva noticia creada:', newNews.id)
  return newNews
}

/**
 * Actualiza una noticia existente
 */
export const updateNews = async (newsId: string, updates: Partial<Omit<NewsItem, 'id' | 'createdAt'>>): Promise<NewsItem> => {
  const allNews = await getAllNews()
  const newsIndex = allNews.findIndex(news => news.id === newsId)
  
  if (newsIndex === -1) {
    throw new Error('Noticia no encontrada')
  }
  
  const updatedNews: NewsItem = {
    ...allNews[newsIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  allNews[newsIndex] = updatedNews
  saveToStorage('news', allNews)
  
  console.log('📰 Noticia actualizada:', newsId)
  return updatedNews
}

/**
 * Elimina una noticia
 */
export const deleteNews = async (newsId: string): Promise<void> => {
  const allNews = await getAllNews()
  const filteredNews = allNews.filter(news => news.id !== newsId)
  
  if (filteredNews.length === allNews.length) {
    throw new Error('Noticia no encontrada')
  }
  
  saveToStorage('news', filteredNews)
  console.log('📰 Noticia eliminada:', newsId)
}

/**
 * Marca una noticia como leída por un chatter
 */
export const markNewsAsRead = async (newsId: string, chatterId: string): Promise<void> => {
  const allNews = await getAllNews()
  const newsIndex = allNews.findIndex(news => news.id === newsId)
  
  if (newsIndex === -1) {
    throw new Error('Noticia no encontrada')
  }
  
  const news = allNews[newsIndex]
  
  // Incrementar contador de vistas si es la primera vez que la ve
  if (!news.readBy.includes(chatterId)) {
    news.viewsCount++
    news.readBy.push(chatterId)
    news.updatedAt = new Date().toISOString()
    
    allNews[newsIndex] = news
    saveToStorage('news', allNews)
    
    console.log('📰 Noticia marcada como leída:', newsId, 'por chatter:', chatterId)
  }
}

/**
 * Obtiene estadísticas de noticias
 */
export const getNewsStats = async (): Promise<{
  totalNews: number
  activeNews: number
  totalViews: number
  newsByType: Record<string, number>
  newsByPriority: Record<string, number>
}> => {
  const allNews = await getAllNews()
  const activeNews = await getActiveNews()
  
  const stats = {
    totalNews: allNews.length,
    activeNews: activeNews.length,
    totalViews: allNews.reduce((sum, news) => sum + news.viewsCount, 0),
    newsByType: {} as Record<string, number>,
    newsByPriority: {} as Record<string, number>
  }
  
  // Contar por tipo
  allNews.forEach(news => {
    stats.newsByType[news.type] = (stats.newsByType[news.type] || 0) + 1
    stats.newsByPriority[news.priority] = (stats.newsByPriority[news.priority] || 0) + 1
  })
  
  return stats
}

/**
 * Obtiene noticias pinneadas
 */
export const getPinnedNews = async (): Promise<NewsItem[]> => {
  const activeNews = await getActiveNews()
  return activeNews.filter(news => news.isPinned)
}

/**
 * Obtiene un chatter por ID (función auxiliar)
 */
const getChatterById = async (chatterId: string): Promise<Chatter | null> => {
  const allChatters = await getChatters()
  return allChatters.find(chatter => chatter.id === chatterId) || null
}

/**
 * Inicializa noticias de ejemplo para demostrar el sistema de targeting
 * 
 * Incluye ejemplos de:
 * - Noticias globales (para todos los chatters)
 * - Noticias dirigidas por modelos específicas
 * - Noticias dirigidas a chatters específicos
 */
export const initializeSampleNews = async (): Promise<void> => {
  const existingNews = await getAllNews()
  
  // Solo crear noticias de ejemplo si no hay noticias existentes
  if (existingNews.length > 0) return
  
  const sampleNews = [
    {
      title: '🎉 ¡Bienvenido al Sistema de Noticias!',
      content: 'Este es el nuevo sistema de noticias y anuncios. Aquí recibirás actualizaciones importantes sobre el sistema, nuevas funcionalidades y anuncios relevantes para tus modelos asignadas.',
      type: 'announcement' as const,
      priority: 'high' as const,
      targetType: 'all' as const,
      isActive: true,
      isPinned: true,
      createdBy: 'system'
    },
    {
      title: '🔧 Actualización del Sistema',
      content: 'Hemos implementado mejoras en el sistema de tickets y la interfaz de usuario. Ahora puedes gestionar tus tickets de manera más eficiente y recibir notificaciones en tiempo real.',
      type: 'update' as const,
      priority: 'medium' as const,
      targetType: 'all' as const,
      isActive: true,
      isPinned: false,
      showUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días
      createdBy: 'system'
    },
    {
      title: '⚠️ Mantenimiento Programado',
      content: 'El sistema estará en mantenimiento el próximo domingo de 2:00 AM a 4:00 AM. Durante este tiempo, el acceso estará limitado. Te recomendamos guardar tu trabajo antes de esta hora.',
      type: 'warning' as const,
      priority: 'urgent' as const,
      targetType: 'all' as const,
      isActive: true,
      isPinned: true,
      showUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días
      createdBy: 'system'
    },
    {
      title: '📊 Nuevas Estadísticas Disponibles',
      content: 'Ahora puedes ver estadísticas detalladas de tus tickets y modelos en el dashboard. Incluye métricas de rendimiento, tiempos de respuesta y análisis de tendencias.',
      type: 'info' as const,
      priority: 'low' as const,
      targetType: 'all' as const,
      isActive: true,
      isPinned: false,
      createdBy: 'system'
    },
    {
      title: '🎥 Nuevas Funcionalidades para Videollamadas',
      content: 'Hemos mejorado la calidad de las videollamadas y agregado nuevas opciones de personalización. Estas mejoras están disponibles para todos los modelos que ofrecen este servicio.',
      type: 'update' as const,
      priority: 'medium' as const,
      targetType: 'specific_models' as const,
      targetModels: [], // Se llenará dinámicamente con modelos que tengan videollamadas
      isActive: true,
      isPinned: false,
      createdBy: 'system'
    },
    {
      title: '📸 Actualización de Fotos Personalizadas',
      content: 'Nuevo sistema de procesamiento de fotos con mejor calidad y más opciones de edición. Esta actualización aplica para modelos que ofrecen fotos personalizadas.',
      type: 'info' as const,
      priority: 'low' as const,
      targetType: 'specific_models' as const,
      targetModels: [], // Se llenará dinámicamente con modelos que tengan fotos personalizadas
      isActive: true,
      isPinned: false,
      createdBy: 'system'
    }
  ]
  
  // Crear las noticias de ejemplo
  for (const newsData of sampleNews) {
    await createNews(newsData)
  }
  
  console.log('📰 Noticias de ejemplo inicializadas con sistema de targeting por modelos')
}
