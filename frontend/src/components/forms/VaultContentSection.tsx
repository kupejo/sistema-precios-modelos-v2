'use client'

import { ModernCard, ModernCardHeader, ModernCardTitle, ModernCardDescription, ModernCardContent } from '@/components/ui/ModernCard'
import { ModernInput } from '@/components/ui/ModernInput'

interface VaultContentSectionProps {
  precios: Record<string, number>
  onPreciosChange: (precios: Record<string, number>) => void
}

const VAULT_SERVICIOS = [
  'SOLA VAGINAL',
  'SOLA ANAL',
  'SOLA SQUIRT',
  'B/G BOY GIRL',
  'B/G BOY GIRL ANAL',
  'LESBIAN',
  'ORGIA',
  'BBC',
  'TRIO 2 CHICOS 1 CHICA',
  'LIVES',
  'Estrenos'
]

export function VaultContentSection({
  precios,
  onPreciosChange
}: VaultContentSectionProps) {
  const handlePriceChange = (servicio: string, precio: number) => {
    onPreciosChange({ ...precios, [servicio]: precio })
  }

  return (
    <ModernCard variant="elevated">
      <ModernCardHeader>
        <ModernCardTitle 
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        >
          Contenido Bóveda
        </ModernCardTitle>
        <ModernCardDescription>
          Configura tus precios para contenido premium y categorías especiales
        </ModernCardDescription>
      </ModernCardHeader>
      
      <ModernCardContent>
        <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-900">
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-300 uppercase tracking-wide">Ítem</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-gray-300 uppercase tracking-wide">Precio ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {VAULT_SERVICIOS.map((servicio) => (
                <tr key={servicio} className="hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-2 font-medium text-white">
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
                        className="w-24 text-center text-sm"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModernCardContent>
    </ModernCard>
  )
}