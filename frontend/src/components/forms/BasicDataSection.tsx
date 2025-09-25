'use client'

import { ModernCard, ModernCardHeader, ModernCardTitle, ModernCardDescription, ModernCardContent } from '@/components/ui/ModernCard'
import { ModernInput } from '@/components/ui/ModernInput'

interface BasicDataSectionProps {
  modelo: string
  contacto: string
  onModeloChange: (value: string) => void
  onContactoChange: (value: string) => void
}

export function BasicDataSection({
  modelo,
  contacto,
  onModeloChange,
  onContactoChange
}: BasicDataSectionProps) {
  return (
    <ModernCard variant="elevated">
      <ModernCardHeader>
        <ModernCardTitle 
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        >
          Datos Básicos
        </ModernCardTitle>
        <ModernCardDescription>
          Información personal y de contacto requerida para tu perfil
        </ModernCardDescription>
      </ModernCardHeader>
      
      <ModernCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModernInput
            label="Nombre de la Modelo"
            placeholder="Ingresa tu nombre artístico"
            value={modelo}
            onChange={(e) => onModeloChange(e.target.value)}
            required
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            helperText="Este será el nombre que aparecerá en tu perfil"
          />
          
          <ModernInput
            label="Contacto (Telegram/WhatsApp)"
            placeholder="@usuario o +1234567890"
            value={contacto}
            onChange={(e) => onContactoChange(e.target.value)}
            required
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            }
            helperText="Incluye tu usuario de Telegram o número de WhatsApp"
          />
        </div>
      </ModernCardContent>
    </ModernCard>
  )
}