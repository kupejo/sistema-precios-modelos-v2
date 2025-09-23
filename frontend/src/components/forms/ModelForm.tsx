/**
 * =====================================================
 * COMPONENTE MODEL FORM
 * =====================================================
 * 
 * Formulario principal para registro de modelos
 * Reemplaza la funcionalidad del Index.html original
 */

'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ServicePricing } from './ServicePricing'
import { AppSelection } from './AppSelection'
import { ExtrasSelection } from './ExtrasSelection'
import { FormularioModelo, SERVICIOS, APPS } from '@/types/models'
import { cn } from '@/lib/utils'

// Schema de validación
const formSchema = z.object({
  modelo: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  contacto: z.string().min(3, 'El contacto debe tener al menos 3 caracteres'),
  apps_selected: z.array(z.enum(APPS)).min(1, 'Selecciona al menos una app'),
  app_handle_whatsapp: z.string().optional(),
  app_handle_telegram: z.string().optional(),
  app_handle_teams: z.string().optional(),
  app_handle_instagram: z.string().optional(),
  app_handle_snapchat: z.string().optional(),
  app_handle_otra: z.string().optional(),
  app_otra_nombre: z.string().optional(),
  extras_videollamadas: z.array(z.string()).optional(),
  extras_custom: z.array(z.string()).optional(),
  extras_generales: z.string().optional(),
  precios: z.record(z.string(), z.number().min(0))
})

interface ModelFormProps {
  currentStep: number
  onStepChange: (step: number) => void
  formData: any
  onFormDataChange: (data: any) => void
}

export function ModelForm({
  currentStep,
  onStepChange,
  formData,
  onFormDataChange
}: ModelFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormularioModelo>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelo: '',
      contacto: '',
      apps_selected: [],
      app_handle_whatsapp: '',
      app_handle_telegram: '',
      app_handle_teams: '',
      app_handle_instagram: '',
      app_handle_snapchat: '',
      app_handle_otra: '',
      app_otra_nombre: '',
      extras_videollamadas: [],
      extras_custom: [],
      extras_generales: '',
      precios: SERVICIOS.reduce((acc, servicio) => {
        acc[servicio] = 0
        return acc
      }, {} as Record<string, number>)
    }
  })

  const { handleSubmit, formState: { errors }, watch, setValue } = form

  const onSubmit = async (data: FormularioModelo) => {
    setIsSubmitting(true)
    try {
      console.log('Datos del formulario:', data)
      // Aquí se enviarían los datos a Supabase
      // await createModelo(data)
      onFormDataChange(data)
      alert('¡Formulario enviado exitosamente!')
    } catch (error) {
      console.error('Error al enviar formulario:', error)
      alert('Error al enviar el formulario')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 5) {
      onStepChange(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Información Básica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nombre Artístico"
                  placeholder="Tu nombre artístico"
                  {...form.register('modelo')}
                  error={errors.modelo?.message}
                />
                <Input
                  label="Contacto"
                  placeholder="@usuario / +57..."
                  {...form.register('contacto')}
                  error={errors.contacto?.message}
                  helperText="WhatsApp, Telegram, etc."
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <AppSelection
            selectedApps={watch('apps_selected')}
            onAppsChange={(apps) => setValue('apps_selected', apps)}
            formData={watch()}
            onFormDataChange={(data) => {
              Object.keys(data).forEach(key => {
                setValue(key as any, data[key])
              })
            }}
          />
        )

      case 3:
        return (
          <ExtrasSelection
            extrasVideollamadas={watch('extras_videollamadas') || []}
            extrasCustom={watch('extras_custom') || []}
            extrasGenerales={watch('extras_generales') || ''}
            onExtrasVideollamadasChange={(extras) => setValue('extras_videollamadas', extras)}
            onExtrasCustomChange={(extras) => setValue('extras_custom', extras)}
            onExtrasGeneralesChange={(text) => setValue('extras_generales', text)}
          />
        )

      case 4:
        return (
          <ServicePricing
            precios={watch('precios')}
            onPreciosChange={(precios) => setValue('precios', precios)}
          />
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Revisión Final
            </h3>
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-4">Resumen de tu perfil:</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-400">Nombre:</span> {watch('modelo')}</p>
                <p><span className="text-gray-400">Contacto:</span> {watch('contacto')}</p>
                <p><span className="text-gray-400">Apps:</span> {watch('apps_selected')?.join(', ')}</p>
                <p><span className="text-gray-400">Extras Videollamadas:</span> {watch('extras_videollamadas')?.join(', ') || 'Ninguno'}</p>
                <p><span className="text-gray-400">Extras Custom:</span> {watch('extras_custom')?.join(', ') || 'Ninguno'}</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Anterior
        </Button>

        {currentStep < 5 ? (
          <Button
            type="button"
            onClick={nextStep}
            disabled={currentStep === 5}
          >
            Siguiente
          </Button>
        ) : (
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
          </Button>
        )}
      </div>
    </form>
  )
}
