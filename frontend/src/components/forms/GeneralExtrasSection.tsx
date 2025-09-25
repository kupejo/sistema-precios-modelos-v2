'use client'

import { ModernCard, ModernCardHeader, ModernCardTitle, ModernCardDescription, ModernCardContent } from '@/components/ui/ModernCard'
import { ModernTextarea } from '@/components/ui/ModernInput'

interface GeneralExtrasSectionProps {
  extrasGenerales: string
  onExtrasGeneralesChange: (value: string) => void
}

export function GeneralExtrasSection({
  extrasGenerales,
  onExtrasGeneralesChange
}: GeneralExtrasSectionProps) {
  return (
    <ModernCard variant="elevated">
      <ModernCardHeader>
        <ModernCardTitle 
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        >
          Extras Generales
        </ModernCardTitle>
        <ModernCardDescription>
          Especifica tus reglas, límites y preferencias para los chatters
        </ModernCardDescription>
      </ModernCardHeader>
      
      <ModernCardContent>
        <ModernTextarea
          label="Reglas y preferencias para chatters"
          placeholder="Ejemplo: Horarios: Lunes a Viernes 2pm-10pm. Límites: No anal, no fetish extremo. Disponibilidad videollamadas: Solo fines de semana. Política de cancelación: 2 horas antes..."
          value={extrasGenerales}
          onChange={(e) => onExtrasGeneralesChange(e.target.value)}
          rows={6}
          helperText="Esta información será visible para los chatters y debe incluir horarios, límites, actividades permitidas, políticas de cancelación y cualquier restricción importante."
        />
      </ModernCardContent>
    </ModernCard>
  )
}