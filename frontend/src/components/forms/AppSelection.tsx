/**
 * =====================================================
 * COMPONENTE APP SELECTION
 * =====================================================
 * 
 * Selección de apps de comunicación
 * Reemplaza la funcionalidad de apps del Index.html original
 */

'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { APPS } from '@/types/models'

interface AppSelectionProps {
  selectedApps: string[]
  onAppsChange: (apps: string[]) => void
  formData: any
  onFormDataChange: (data: any) => void
}

const APP_CONFIG = {
  whatsapp: {
    name: 'WhatsApp',
    icon: '📱',
    placeholder: '@usuario o +57...',
    color: 'bg-green-600'
  },
  telegram: {
    name: 'Telegram',
    icon: '✈️',
    placeholder: '@usuario',
    color: 'bg-blue-600'
  },
  teams: {
    name: 'Microsoft Teams',
    icon: '👥',
    placeholder: 'usuario@empresa.com',
    color: 'bg-purple-600'
  },
  instagram: {
    name: 'Instagram',
    icon: '📷',
    placeholder: '@usuario',
    color: 'bg-pink-600'
  },
  snapchat: {
    name: 'Snapchat',
    icon: '👻',
    placeholder: '@usuario',
    color: 'bg-yellow-600'
  },
  otra: {
    name: 'Otra App',
    icon: '📲',
    placeholder: 'Especifica la app',
    color: 'bg-gray-600'
  }
}

export function AppSelection({
  selectedApps,
  onAppsChange,
  formData,
  onFormDataChange
}: AppSelectionProps) {
  const handleAppToggle = (app: string) => {
    if (selectedApps.includes(app)) {
      onAppsChange(selectedApps.filter(a => a !== app))
    } else {
      onAppsChange([...selectedApps, app])
    }
  }

  const handleAppHandleChange = (app: string, value: string) => {
    onFormDataChange({
      ...formData,
      [`app_handle_${app}`]: value
    })
  }

  const handleOtraAppChange = (value: string) => {
    onFormDataChange({
      ...formData,
      app_otra_nombre: value
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Apps de Comunicación
        </h3>
        <p className="text-gray-400 mb-6">
          Selecciona las apps que usas para comunicarte con tus clientes.
        </p>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {APPS.map((app) => {
          const config = APP_CONFIG[app as keyof typeof APP_CONFIG]
          const isSelected = selectedApps.includes(app)
          
          return (
            <Card
              key={app}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-gray-800 border-blue-500 ring-2 ring-blue-500/20'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => handleAppToggle(app)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center text-white text-lg`}>
                    {config.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{config.name}</h4>
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
        })}
      </div>

      {/* App Handles */}
      {selectedApps.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Información de Contacto
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Proporciona tu información de contacto para cada app seleccionada.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedApps.map((app) => {
              const config = APP_CONFIG[app as keyof typeof APP_CONFIG]
              const handleKey = `app_handle_${app}`
              const currentValue = formData[handleKey] || ''
              
              return (
                <div key={app}>
                  <Input
                    label={`${config.icon} ${config.name}`}
                    placeholder={config.placeholder}
                    value={currentValue}
                    onChange={(e) => handleAppHandleChange(app, e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              )
            })}
            
            {selectedApps.includes('otra') && (
              <div>
                <Input
                  label="📲 Nombre de la App Personalizada"
                  placeholder="Ej: Zoom, Discord, etc."
                  value={formData.app_otra_nombre || ''}
                  onChange={(e) => handleOtraAppChange(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Resumen */}
      {selectedApps.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Resumen de Apps Seleccionadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedApps.map((app) => {
                const config = APP_CONFIG[app as keyof typeof APP_CONFIG]
                const handleKey = `app_handle_${app}`
                const handle = formData[handleKey] || 'No especificado'
                
                return (
                  <div key={app} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{config.icon}</span>
                      <span className="text-white font-medium">{config.name}</span>
                    </div>
                    <span className="text-gray-300 text-sm">{handle}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
