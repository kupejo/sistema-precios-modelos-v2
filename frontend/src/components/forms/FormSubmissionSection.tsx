'use client'

import { useState } from 'react'
import { ModernCard, ModernCardHeader, ModernCardTitle, ModernCardDescription, ModernCardContent } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'

interface FormSubmissionSectionProps {
  onSubmit: () => void
  onPreview: () => void
  isFormValid: boolean
}

export function FormSubmissionSection({
  onSubmit,
  onPreview,
  isFormValid
}: FormSubmissionSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreviewing, setIsPreviewing] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreview = async () => {
    setIsPreviewing(true)
    try {
      await onPreview()
    } finally {
      setIsPreviewing(false)
    }
  }

  return (
    <ModernCard variant="elevated">
        <ModernCardHeader>
          <ModernCardTitle 
            icon={
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            }
          >
            Finalizar y Enviar
          </ModernCardTitle>
          <ModernCardDescription>
            Completa el proceso de registro de precios
          </ModernCardDescription>
        </ModernCardHeader>
        
        <ModernCardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <ModernButton
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              loading={isSubmitting}
              variant="primary"
              size="lg"
              className="flex-1"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
            </ModernButton>
            
            <ModernButton
              onClick={handlePreview}
              disabled={isPreviewing}
              loading={isPreviewing}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              {isPreviewing ? 'Generando...' : 'Vista Previa'}
            </ModernButton>
          </div>

          {!isFormValid && (
            <div className="mt-4 bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h4 className="font-medium text-amber-300 mb-1 text-sm">Formulario Incompleto</h4>
                  <p className="text-xs text-amber-200">
                    Por favor completa todos los campos obligatorios antes de enviar el formulario.
                  </p>
                </div>
              </div>
            </div>
          )}
        </ModernCardContent>
    </ModernCard>
  )
}