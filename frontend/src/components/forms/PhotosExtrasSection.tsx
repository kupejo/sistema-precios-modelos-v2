'use client'

import { ModernCard, ModernCardHeader, ModernCardTitle, ModernCardDescription, ModernCardContent } from '@/components/ui/ModernCard'
import { ModernInput } from '@/components/ui/ModernInput'

interface PhotosExtrasSectionProps {
  precios: Record<string, number>
  onPreciosChange: (precios: Record<string, number>) => void
}

const FOTOS_SERVICIOS = [
  'FOTOS PERSONALIZADAS 1',
  'FOTOS PERSONALIZADAS 3',
  'BG PERSONALIZADO',
  'PANTIES'
]

export function PhotosExtrasSection({
  precios,
  onPreciosChange
}: PhotosExtrasSectionProps) {
  const handlePriceChange = (servicio: string, precio: number) => {
    onPreciosChange({ ...precios, [servicio]: precio })
  }

  return (
    <ModernCard variant="elevated">
      <ModernCardHeader>
        <ModernCardTitle 
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        >
          Fotos y Extras
        </ModernCardTitle>
        <ModernCardDescription>
          Configura tus precios para servicios fotográficos y contenido personalizado
        </ModernCardDescription>
      </ModernCardHeader>
      
      <ModernCardContent>
        <div className="space-y-8">
          {/* Servicios Fotográficos */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Servicios Fotográficos
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Fotos Personalizadas */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-pink-500 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-semibold text-white">Fotos Personalizadas</h4>
                </div>
                <p className="text-xs text-gray-300">Fotografías a medida según solicitud específica</p>
              </div>

              {/* Fondos Personalizados */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-semibold text-white">Fondos Personalizados</h4>
                </div>
                <p className="text-xs text-gray-300">Configuración de ambiente específico</p>
              </div>

              {/* Ropa Interior */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-semibold text-white">Ropa Interior</h4>
                </div>
                <p className="text-xs text-gray-300">Lencería y ropa interior personalizada</p>
              </div>
            </div>
          </div>

          {/* Precios de Fotos y Extras */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Precios de Fotos y Extras
            </h3>
            
            <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-900">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-300 uppercase tracking-wide">Ítem</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-300 uppercase tracking-wide">Precio ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {FOTOS_SERVICIOS.map((servicio) => (
                    <tr key={servicio} className="hover:bg-gray-700 transition-colors">
                      <td className="px-4 py-2 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs">{servicio}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center">
                          <ModernInput
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={precios[servicio] || ''}
                            onChange={(e) => handlePriceChange(servicio, parseFloat(e.target.value) || 0)}
                            className="w-24 text-center text-xs"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </ModernCardContent>
    </ModernCard>
  )
}