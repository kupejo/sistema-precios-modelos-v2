/**
 * =====================================================
 * PÁGINA PRINCIPAL - FORMULARIO DE MODELOS
 * =====================================================
 * 
 * Formulario principal para registro de precios de modelos
 * Reemplaza el Index.html del proyecto original
 */

'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ModelForm } from '@/components/forms/ModelForm'

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})

  const steps = [
    { id: 1, title: 'Datos Básicos', description: 'Información personal' },
    { id: 2, title: 'Apps de Comunicación', description: 'Selecciona tus apps' },
    { id: 3, title: 'Extras', description: 'Servicios adicionales' },
    { id: 4, title: 'Precios', description: 'Establece tus tarifas' },
    { id: 5, title: 'Revisión', description: 'Confirma tu información' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Sistema de Precios Modelos
              </h1>
              <p className="text-gray-400">
                Registra tus servicios y establece tus tarifas
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Ver Modelos
              </Button>
              <Button variant="default" size="sm">
                Panel Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      currentStep >= step.id
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-600 text-gray-400'
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className="text-sm font-medium text-white">{step.title}</p>
                    <p className="text-xs text-gray-400">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="mx-4 h-px w-8 bg-gray-600 sm:mx-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">
                {steps[currentStep - 1]?.title}
              </CardTitle>
              <p className="text-gray-400">
                {steps[currentStep - 1]?.description}
              </p>
            </CardHeader>
            <CardContent>
              <ModelForm
                currentStep={currentStep}
                onStepChange={setCurrentStep}
                formData={formData}
                onFormDataChange={setFormData}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              © 2024 Sistema de Precios Modelos. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Ayuda
              </Button>
              <Button variant="ghost" size="sm">
                Contacto
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}