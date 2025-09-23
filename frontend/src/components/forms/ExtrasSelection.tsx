/**
 * =====================================================
 * COMPONENTE EXTRAS SELECTION
 * =====================================================
 * 
 * Selección de extras para videollamadas y videos personalizados
 * Reemplaza la funcionalidad de extras del Index.html original
 */

'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { EXTRAS_VIDEOLLAMADAS, EXTRAS_CUSTOM } from '@/types/models'

interface ExtrasSelectionProps {
  extrasVideollamadas: string[]
  extrasCustom: string[]
  extrasGenerales: string
  onExtrasVideollamadasChange: (extras: string[]) => void
  onExtrasCustomChange: (extras: string[]) => void
  onExtrasGeneralesChange: (text: string) => void
}

const EXTRAS_CONFIG = {
  'Dildo': { icon: '💖', color: 'text-pink-400' },
  'Squirt real': { icon: '💧', color: 'text-blue-400' },
  'Squirt falso': { icon: '✨', color: 'text-purple-400' },
  'Doble penetracion': { icon: '🔥', color: 'text-red-400' },
  'Pareja': { icon: '👥', color: 'text-green-400' },
  'Lesbico': { icon: '👭', color: 'text-pink-400' },
  'Anal solo': { icon: '⭕', color: 'text-orange-400' },
  'Multi camara': { icon: '📹', color: 'text-indigo-400' }
}

export function ExtrasSelection({
  extrasVideollamadas,
  extrasCustom,
  extrasGenerales,
  onExtrasVideollamadasChange,
  onExtrasCustomChange,
  onExtrasGeneralesChange
}: ExtrasSelectionProps) {
  const handleExtraToggle = (extra: string, type: 'videollamadas' | 'custom') => {
    if (type === 'videollamadas') {
      if (extrasVideollamadas.includes(extra)) {
        onExtrasVideollamadasChange(extrasVideollamadas.filter(e => e !== extra))
      } else {
        onExtrasVideollamadasChange([...extrasVideollamadas, extra])
      }
    } else {
      if (extrasCustom.includes(extra)) {
        onExtrasCustomChange(extrasCustom.filter(e => e !== extra))
      } else {
        onExtrasCustomChange([...extrasCustom, extra])
      }
    }
  }

  const renderExtraCard = (extra: string, type: 'videollamadas' | 'custom') => {
    const config = EXTRAS_CONFIG[extra as keyof typeof EXTRAS_CONFIG]
    const isSelected = type === 'videollamadas' 
      ? extrasVideollamadas.includes(extra)
      : extrasCustom.includes(extra)

    return (
      <Card
        key={`${type}-${extra}`}
        className={`cursor-pointer transition-all duration-200 ${
          isSelected
            ? 'bg-gray-800 border-blue-500 ring-2 ring-blue-500/20'
            : 'bg-gray-800 border-gray-700 hover:border-gray-600'
        }`}
        onClick={() => handleExtraToggle(extra, type)}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className={`text-2xl ${config.color}`}>
              {config.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white">{extra}</h4>
              <p className="text-sm text-gray-400">
                {isSelected ? 'Seleccionado' : 'No seleccionado'}
              </p>
            </div>
            <div className={`w-5 h-5 rounded border-2 ${
              isSelected
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-400'
            }`}>
              {isSelected && (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Servicios Adicionales
        </h3>
        <p className="text-gray-400 mb-6">
          Selecciona los extras que ofreces para videollamadas y videos personalizados.
        </p>
      </div>

      {/* Extras para Videollamadas */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center space-x-2">
            <span>📹</span>
            <span>Extras para Videollamadas</span>
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Servicios adicionales que ofreces durante las videollamadas.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXTRAS_VIDEOLLAMADAS.map(extra => renderExtraCard(extra, 'videollamadas'))}
          </div>
        </CardContent>
      </Card>

      {/* Extras para Videos Personalizados */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center space-x-2">
            <span>🎬</span>
            <span>Extras para Videos Personalizados</span>
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Servicios adicionales que ofreces en videos personalizados.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXTRAS_CUSTOM.map(extra => renderExtraCard(extra, 'custom'))}
          </div>
        </CardContent>
      </Card>

      {/* Información Adicional */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center space-x-2">
            <span>📝</span>
            <span>Información Adicional</span>
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Cualquier información adicional que quieras compartir sobre tus servicios.
          </p>
        </CardHeader>
        <CardContent>
          <Input
            label="Información General"
            placeholder="Describe cualquier servicio adicional, restricciones, o información importante..."
            value={extrasGenerales}
            onChange={(e) => onExtrasGeneralesChange(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            multiline
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Resumen de Extras */}
      {(extrasVideollamadas.length > 0 || extrasCustom.length > 0 || extrasGenerales) && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Resumen de Servicios Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {extrasVideollamadas.length > 0 && (
              <div>
                <h4 className="font-medium text-white mb-2">📹 Videollamadas:</h4>
                <div className="flex flex-wrap gap-2">
                  {extrasVideollamadas.map(extra => {
                    const config = EXTRAS_CONFIG[extra as keyof typeof EXTRAS_CONFIG]
                    return (
                      <span
                        key={extra}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm"
                      >
                        <span className={config.color}>{config.icon}</span>
                        <span>{extra}</span>
                      </span>
                    )
                  })}
                </div>
              </div>
            )}

            {extrasCustom.length > 0 && (
              <div>
                <h4 className="font-medium text-white mb-2">🎬 Videos Personalizados:</h4>
                <div className="flex flex-wrap gap-2">
                  {extrasCustom.map(extra => {
                    const config = EXTRAS_CONFIG[extra as keyof typeof EXTRAS_CONFIG]
                    return (
                      <span
                        key={extra}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm"
                      >
                        <span className={config.color}>{config.icon}</span>
                        <span>{extra}</span>
                      </span>
                    )
                  })}
                </div>
              </div>
            )}

            {extrasGenerales && (
              <div>
                <h4 className="font-medium text-white mb-2">📝 Información Adicional:</h4>
                <p className="text-gray-300 text-sm bg-gray-700 p-3 rounded-lg">
                  {extrasGenerales}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
