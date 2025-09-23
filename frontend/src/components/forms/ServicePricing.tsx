/**
 * =====================================================
 * COMPONENTE SERVICE PRICING
 * =====================================================
 * 
 * Tabla de precios para servicios
 * Reemplaza la funcionalidad de precios del Index.html original
 */

'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { SERVICIOS, CATEGORIAS_SERVICIOS, PRECIOS_SUGERIDOS } from '@/lib/constants'
import { getIconoServicio, getPrecioSugerido } from '@/lib/utils'
import { Servicio } from '@/types/models'

interface ServicePricingProps {
  precios: Record<Servicio, number>
  onPreciosChange: (precios: Record<Servicio, number>) => void
}

export function ServicePricing({ precios, onPreciosChange }: ServicePricingProps) {
  const handlePriceChange = (servicio: Servicio, precio: number) => {
    onPreciosChange({
      ...precios,
      [servicio]: precio
    })
  }

  const renderServiceRow = (servicio: Servicio) => {
    const icono = getIconoServicio(servicio)
    const precioSugerido = getPrecioSugerido(servicio)
    const precioActual = precios[servicio] || 0

    return (
      <tr key={servicio} className="border-t border-gray-700 hover:bg-gray-800/30 transition-colors">
        <td className="p-3 font-medium text-white">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{icono}</span>
            <span>{servicio}</span>
          </div>
        </td>
        <td className="p-3">
          <div className="flex items-center justify-center">
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder={precioSugerido.toString()}
              value={precioActual || ''}
              onChange={(e) => handlePriceChange(servicio, parseFloat(e.target.value) || 0)}
              className="w-32 text-center"
            />
          </div>
        </td>
      </tr>
    )
  }

  const renderCategory = (categoria: keyof typeof CATEGORIAS_SERVICIOS, titulo: string) => {
    const servicios = CATEGORIAS_SERVICIOS[categoria]
    
    return (
      <Card key={categoria} className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            {titulo}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3 text-gray-300 font-medium">Servicio</th>
                  <th className="text-center p-3 text-gray-300 font-medium">Precio (COP)</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map(renderServiceRow)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Establece tus Precios
        </h3>
        <p className="text-gray-400 mb-6">
          Define los precios para cada uno de tus servicios. Los valores sugeridos aparecen como placeholder.
        </p>
      </div>

      <div className="space-y-6">
        {renderCategory('videollamadas', '📹 Videollamadas')}
        {renderCategory('customs', '🎬 Videos Personalizados')}
        {renderCategory('extras', '📸 Extras y Fotos')}
        {renderCategory('xxx', '💋 Contenido Adulto')}
      </div>

      {/* Resumen de precios */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            Resumen de Precios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(precios).map(([servicio, precio]) => (
              <div key={servicio} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-300 truncate">{servicio}</span>
                <span className="text-sm font-medium text-white">
                  {precio > 0 ? `$${precio.toLocaleString()}` : 'No definido'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
