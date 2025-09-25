'use client'

import { useState, useEffect, useCallback } from 'react'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'
import { ModernInput } from '@/components/ui/ModernInput'
import { Chatter, Ticket, getTickets } from '@/lib/dataService'

interface ChatterHistoryProps {
  chatter: Chatter
}

export function ChatterHistory({ }: ChatterHistoryProps) {
  const [allTickets, setAllTickets] = useState<Ticket[]>([])
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true)
      // En el sistema original, esto cargaba TODOS los tickets del sistema
      const tickets = await getTickets()
      setAllTickets(tickets)
    } catch (error) {
      console.error('Error cargando historial:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const filterTickets = useCallback(() => {
    let filtered = [...allTickets]

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.modelo_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.chatter_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter)
    }

    // Filtro por tipo
    if (typeFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.type === typeFilter)
    }

    // Filtro por fecha
    if (dateFilter !== 'all') {
      const now = new Date()
      const filterDate = new Date()
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }
      
      filtered = filtered.filter(ticket => new Date(ticket.created_at) >= filterDate)
    }

    setFilteredTickets(filtered)
  }, [allTickets, searchTerm, statusFilter, typeFilter, dateFilter])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  useEffect(() => {
    filterTickets()
  }, [allTickets, searchTerm, statusFilter, typeFilter, dateFilter, filterTickets])

  const exportHistory = () => {
    const csvContent = [
      ['ID', 'Título', 'Modelo', 'Chatter', 'Tipo', 'Estado', 'Precio', 'Fecha Creación'],
      ...filteredTickets.map(ticket => [
        ticket.ticket_id,
        ticket.title,
        ticket.modelo_name,
        ticket.chatter_name,
        ticket.type,
        ticket.status,
        ticket.price.toString(),
        new Date(ticket.created_at).toLocaleDateString('es-ES')
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `historial_tickets_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'in_progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'cancelled': 'bg-red-500/20 text-red-400 border-red-500/30',
      'on_hold': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'pending': 'Pendiente',
      'in_progress': 'En Progreso',
      'completed': 'Completado',
      'cancelled': 'Cancelado',
      'on_hold': 'En Espera'
    }
    return labels[status] || status
  }

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'videollamada': 'Videollamada',
      'video_personalizado': 'Video Personalizado',
      'fotos_personalizadas': 'Fotos Personalizadas',
      'contenido_boveda': 'Contenido Bóveda',
      'otro': 'Otro'
    }
    return types[type] || type
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Historial Completo</h1>
        <p className="text-gray-400">Historial de todos los tickets del sistema</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <ModernButton
          variant="primary"
          onClick={exportHistory}
          disabled={filteredTickets.length === 0}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exportar Historial
        </ModernButton>
        
        <ModernButton
          variant="outline"
          onClick={loadHistory}
          loading={loading}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualizar
        </ModernButton>
      </div>

      {/* Filters */}
      <ModernCard variant="elevated">
        <ModernCardHeader>
          <ModernCardTitle icon={
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
          }>
            Filtros
          </ModernCardTitle>
        </ModernCardHeader>
        <ModernCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ModernInput
              label="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en historial..."
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estado
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="in_progress">En Progreso</option>
                <option value="completed">Completado</option>
                <option value="cancelled">Cancelado</option>
                <option value="on_hold">En Espera</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los tipos</option>
                <option value="videollamada">Videollamada</option>
                <option value="video_personalizado">Video Personalizado</option>
                <option value="fotos_personalizadas">Fotos Personalizadas</option>
                <option value="contenido_boveda">Contenido Bóveda</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fecha
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas las fechas</option>
                <option value="today">Hoy</option>
                <option value="week">Última semana</option>
                <option value="month">Último mes</option>
                <option value="year">Último año</option>
              </select>
            </div>
          </div>
        </ModernCardContent>
      </ModernCard>

      {/* Results */}
      <ModernCard variant="elevated">
        <ModernCardHeader>
          <ModernCardTitle icon={
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          }>
            Historial de Tickets ({filteredTickets.length} resultados)
          </ModernCardTitle>
        </ModernCardHeader>
        <ModernCardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              <p className="text-gray-400 mt-2">Cargando historial...</p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <p className="text-gray-400">No hay historial disponible</p>
              <p className="text-gray-500 text-sm mt-1">Aún no se han creado tickets en el sistema</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">ID</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Título</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Modelo</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Chatter</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Tipo</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Estado</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Precio</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.ticket_id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 px-4 text-gray-300 font-mono text-sm">
                        #{ticket.ticket_id}
                      </td>
                      <td className="py-3 px-4 text-white font-medium">
                        {ticket.title}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {ticket.modelo_name}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {ticket.chatter_name}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {getTypeLabel(ticket.type)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                          {getStatusLabel(ticket.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        ${ticket.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {formatDate(ticket.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </ModernCardContent>
      </ModernCard>
    </div>
  )
}
