'use client'

import { ModernCard, ModernCardHeader, ModernCardTitle, ModernCardDescription, ModernCardContent } from '@/components/ui/ModernCard'
import { ModernInput } from '@/components/ui/ModernInput'
import { ModernCheckboxGrid } from '@/components/ui/ModernCheckbox'

interface CustomVideoSectionProps {
  precios: Record<string, number>
  onPreciosChange: (precios: Record<string, number>) => void
  extrasCustom: string[]
  onExtrasCustomChange: (extras: string[]) => void
}

const EXTRAS_CUSTOM = [
  {
    id: 'dildo',
    label: 'Dildo',
    icon: <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
  },
  {
    id: 'squirt_real',
    label: 'Squirt real',
    icon: <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
  },
  {
    id: 'squirt_falso',
    label: 'Squirt falso',
    icon: <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
  },
  {
    id: 'doble_penetracion',
    label: 'Doble penetración',
    icon: <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  },
  {
    id: 'pareja',
    label: 'Pareja',
    icon: <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5h1.5l1.5 4.5H16v6h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm1.5 9v-6h-1.5v6h1.5z"/></svg>
  },
  {
    id: 'lesbico',
    label: 'Lésbico',
    icon: <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
  },
  {
    id: 'anal_solo',
    label: 'Anal solo',
    icon: <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
  },
  {
    id: 'multi_camara',
    label: 'Multi cámara',
    icon: <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/></svg>
  }
]

const CUSTOM_VIDEO_SERVICIOS = [
  'CUSTOM VIDEO PERSONALIZADO 5 M',
  'CUSTOM VIDEO PERSONALIZADO 10 M', 
  'CUSTOM VIDEO PERSONALIZADO 15 M'
]

export function CustomVideoSection({
  precios,
  onPreciosChange,
  extrasCustom,
  onExtrasCustomChange
}: CustomVideoSectionProps) {
  const handlePriceChange = (servicio: string, precio: number) => {
    onPreciosChange({ ...precios, [servicio]: precio })
  }

  return (
    <ModernCard variant="elevated">
      <ModernCardHeader>
        <ModernCardTitle 
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4h10l-1 10a2 2 0 01-2 2H9a2 2 0 01-2-2L6 8z" />
            </svg>
          }
        >
          Video Personalizado
        </ModernCardTitle>
        <ModernCardDescription>
          Configura tus precios para videos a medida y selecciona extras disponibles
        </ModernCardDescription>
      </ModernCardHeader>
      
      <ModernCardContent>
        <div className="space-y-2">
          {/* Extras de video personalizado */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Extras de Video Personalizado
            </h3>
            <ModernCheckboxGrid
              options={EXTRAS_CUSTOM}
              selected={extrasCustom}
              onChange={onExtrasCustomChange}
              columns={4}
            />
          </div>

          {/* Precios de Videos Personalizados */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Precios de Videos Personalizados
            </h3>
            
            <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-900">
                    <th className="px-3 py-1 text-left text-xs font-semibold text-gray-300 uppercase tracking-wide">Ítem</th>
                    <th className="px-3 py-1 text-center text-xs font-semibold text-gray-300 uppercase tracking-wide">Precio ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {CUSTOM_VIDEO_SERVICIOS.map((servicio) => (
                    <tr key={servicio} className="hover:bg-gray-700 transition-colors">
                      <td className="px-3 py-1 font-medium text-white">
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4h10l-1 10a2 2 0 01-2 2H9a2 2 0 01-2-2L6 8z" />
                          </svg>
                          <span className="text-xs">{servicio}</span>
                        </div>
                      </td>
                      <td className="px-3 py-1">
                        <div className="flex items-center justify-center">
                          <ModernInput
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={precios[servicio] || ''}
                            onChange={(e) => handlePriceChange(servicio, parseFloat(e.target.value) || 0)}
                            className="w-20 text-center text-xs"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-700/30">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-medium text-blue-300 mb-1 text-sm">Información de Precios</h4>
                <p className="text-xs text-blue-200">
                  Escribe solo números. El símbolo $ se muestra automáticamente. Los extras seleccionados estarán disponibles para todos los tipos de video personalizado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModernCardContent>
    </ModernCard>
  )
}