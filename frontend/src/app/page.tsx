'use client'

import { useState } from 'react'
import { AppSelection } from '@/components/forms/AppSelection'
import { VideocallSection } from '@/components/forms/VideocallSection'
import { CustomVideoSection } from '@/components/forms/CustomVideoSection'
import { PhotosExtrasSection } from '@/components/forms/PhotosExtrasSection'
import { VaultContentSection } from '@/components/forms/VaultContentSection'
import { GeneralExtrasSection } from '@/components/forms/GeneralExtrasSection'
import { FormSubmissionSection } from '@/components/forms/FormSubmissionSection'
import { BasicDataSection } from '@/components/forms/BasicDataSection'
import { createModel } from '@/lib/dataService'

export default function HomePage() {
  const [formData, setFormData] = useState({
    modelo: '',
    contacto: '',
    apps_selected: [] as string[],
    app_handle_whatsapp: '',
    app_handle_telegram: '',
    app_handle_teams: '',
    app_handle_instagram: '',
    app_handle_snapchat: '',
    app_handle_otra: '',
    app_otra_nombre: '',
    extras_videollamadas: [] as string[],
    extras_custom: [] as string[],
    extras_generales: '',
    precios: {
      'VIDEOCALL 5MIN': 0,
      'VIDEOCALL 10MIN': 0,
      'VIDEOCALL 15MIN': 0,
      'CUSTOM VIDEO PERSONALIZADO 5 M': 0,
      'CUSTOM VIDEO PERSONALIZADO 10 M': 0,
      'CUSTOM VIDEO PERSONALIZADO 15 M': 0,
      'FOTOS PERSONALIZADAS 1': 0,
      'FOTOS PERSONALIZADAS 3': 0,
      'BG PERSONALIZADO': 0,
      'PANTIES': 0,
      'SOLA VAGINAL': 0,
      'SOLA ANAL': 0,
      'SOLA SQUIRT': 0,
      'B/G BOY GIRL': 0,
      'B/G BOY GIRL ANAL': 0,
      'LESBIAN': 0,
      'ORGIA': 0,
      'BBC': 0,
      'TRIO 2 CHICOS 1 CHICA': 0,
      'LIVES': 0,
      'Estrenos': 0
    } as Record<string, number>
  })
  const [showPreview, setShowPreview] = useState(false)

  const handleFormDataChange = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const handleAppsChange = (apps: string[]) => {
    setFormData(prev => ({ ...prev, apps_selected: apps }))
  }

  const handleExtrasVideollamadasChange = (extras: string[]) => {
    setFormData(prev => ({ ...prev, extras_videollamadas: extras }))
  }

  const handleExtrasCustomChange = (extras: string[]) => {
    setFormData(prev => ({ ...prev, extras_custom: extras }))
  }

  const handlePreciosChange = (precios: Record<string, number>) => {
    setFormData(prev => ({ ...prev, precios }))
  }

  const handleExtrasGeneralesChange = (value: string) => {
    setFormData(prev => ({ ...prev, extras_generales: value }))
  }

  const handleModeloChange = (value: string) => {
    setFormData(prev => ({ ...prev, modelo: value }))
  }

  const handleContactoChange = (value: string) => {
    setFormData(prev => ({ ...prev, contacto: value }))
  }

  // Validación básica del formulario
  const isFormValid = () => {
    return formData.modelo.trim() !== '' && 
           formData.contacto.trim() !== '' &&
           formData.apps_selected.length > 0
  }

  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert('Por favor completa los campos obligatorios')
      return
    }
    
    try {
      console.log('Enviando formulario:', formData)
      console.log('🔍 Formulario - Precios que se envían:', formData.precios)
      console.log('🔍 Formulario - Apps seleccionadas:', formData.apps_selected)
      console.log('🔍 Formulario - Extras videollamadas:', formData.extras_videollamadas)
      console.log('🔍 Formulario - Extras custom:', formData.extras_custom)
      
      // Preparar los datos para crear el modelo
      const modelData = {
        profile_id: `MODEL_${Date.now()}`, // Generar ID único
        modelo: formData.modelo,
        contacto: formData.contacto,
        apps_selected: formData.apps_selected,
        app_handle_whatsapp: formData.app_handle_whatsapp,
        app_handle_telegram: formData.app_handle_telegram,
        app_handle_teams: formData.app_handle_teams,
        app_handle_instagram: formData.app_handle_instagram,
        app_handle_snapchat: formData.app_handle_snapchat,
        app_handle_otra: formData.app_handle_otra,
        app_otra_nombre: formData.app_otra_nombre,
        extras_videollamadas: formData.extras_videollamadas,
        extras_custom: formData.extras_custom,
        extras_generales: formData.extras_generales,
        precios: formData.precios,
        aprobado: false, // Por defecto no aprobado
        activo: false,   // Por defecto no activo
        eliminado: false
      }
      
      // Crear el modelo usando el dataService
      const newModel = await createModel(modelData)
      
      console.log('Modelo creado exitosamente:', newModel)
      
      // Notificar al panel de admin que hay un nuevo modelo
      localStorage.setItem('newModelCreated', Date.now().toString())
      
      alert(`¡Modelo "${formData.modelo}" registrado exitosamente! Ahora aparecerá en el panel de administración para su revisión.`)
      
      // Limpiar el formulario después del envío exitoso
      setFormData({
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
        precios: {
          'VIDEOCALL 5MIN': 0,
          'VIDEOCALL 10MIN': 0,
          'VIDEOCALL 15MIN': 0,
          'CUSTOM VIDEO PERSONALIZADO 5 M': 0,
          'CUSTOM VIDEO PERSONALIZADO 10 M': 0,
          'CUSTOM VIDEO PERSONALIZADO 15 M': 0,
          'FOTOS PERSONALIZADAS 1': 0,
          'FOTOS PERSONALIZADAS 3': 0,
          'BG PERSONALIZADO': 0,
          'PANTIES': 0,
          'SOLA VAGINAL': 0,
          'SOLA ANAL': 0,
          'SOLA SQUIRT': 0,
          'B/G BOY GIRL': 0,
          'B/G BOY GIRL ANAL': 0,
          'LESBIAN': 0,
          'ORGIA': 0,
          'BBC': 0,
          'TRIO 2 CHICOS 1 CHICA': 0,
          'LIVES': 0,
          'Estrenos': 0
        }
      })
      
    } catch (error) {
      console.error('Error al crear el modelo:', error)
      alert('Error al registrar el modelo. Por favor intenta nuevamente.')
    }
  }

  const handlePreview = () => {
    console.log('Generando vista previa:', formData)
    setShowPreview(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Fondo con patrón sutil */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-indigo-900/10 to-purple-900/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Header Moderno */}
      <header className="relative bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Título Principal */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg mb-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Sistema de Precios OnlyFans
            </h1>
            <p className="text-xs text-gray-300 max-w-2xl mx-auto">
              Configura tus servicios y precios de manera profesional y eficiente
            </p>
          </div>

          {/* Botones de Acceso Rápido */}
          <div className="flex justify-center gap-2">
            <a 
              href="/admin" 
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Panel Admin
            </a>
            <a 
              href="/chatter" 
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chatter
            </a>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Viewer
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Sidebar de Progreso */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-4">
                <h3 className="font-semibold text-white mb-2">Progreso del Formulario</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-300">Datos Básicos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-300">Aplicaciones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-300">Videollamadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-300">Videos Personalizados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-300">Fotos y Extras</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-300">Contenido Bóveda</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-300">Extras Generales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-300 rounded-full flex items-center justify-center">
                      <span className="text-xs text-slate-600">8</span>
                    </div>
                    <span className="text-xs text-gray-400">Finalizar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <div className="space-y-2">
              {/* Basic Data Section */}
              <BasicDataSection
                modelo={formData.modelo}
                contacto={formData.contacto}
                onModeloChange={handleModeloChange}
                onContactoChange={handleContactoChange}
              />

              {/* Apps Selection */}
              <AppSelection
                selectedApps={formData.apps_selected}
                onAppsChange={handleAppsChange}
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />

              {/* Videocall Section */}
              <VideocallSection
                precios={formData.precios}
                onPreciosChange={handlePreciosChange}
                extrasVideollamadas={formData.extras_videollamadas}
                onExtrasVideollamadasChange={handleExtrasVideollamadasChange}
              />

              {/* Custom Video Section */}
              <CustomVideoSection
                precios={formData.precios}
                onPreciosChange={handlePreciosChange}
                extrasCustom={formData.extras_custom}
                onExtrasCustomChange={handleExtrasCustomChange}
              />

              {/* Photos Extras Section */}
              <PhotosExtrasSection
                precios={formData.precios}
                onPreciosChange={handlePreciosChange}
              />

              {/* Vault Content Section */}
              <VaultContentSection
                precios={formData.precios}
                onPreciosChange={handlePreciosChange}
              />

              {/* General Extras Section */}
              <GeneralExtrasSection
                extrasGenerales={formData.extras_generales}
                onExtrasGeneralesChange={handleExtrasGeneralesChange}
              />

              {/* Form Submission Section */}
              <FormSubmissionSection
                onSubmit={handleSubmit}
                onPreview={handlePreview}
                isFormValid={isFormValid()}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-900/80 backdrop-blur-xl border-t border-gray-700/60 mt-4">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Sistema de Precios Modelos. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <a
                href="/admin"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Panel Admin
        </a>
        <a
                href="/chatter"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Panel Chatter
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Vista Previa */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Vista Previa del Perfil</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 space-y-6">
              {/* Información Básica */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Información Básica</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Nombre de la Modelo</label>
                    <p className="text-white">{formData.modelo || 'No especificado'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Contacto</label>
                    <p className="text-white">{formData.contacto || 'No especificado'}</p>
                  </div>
                </div>
              </div>

              {/* Apps Seleccionadas */}
              {formData.apps_selected.length > 0 && (
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Apps Seleccionadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.apps_selected.map((app, index) => (
                      <span key={index} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {app}
                      </span>
                    ))}
                  </div>
                  
                  {/* Handles de Apps */}
                  <div className="mt-4 space-y-2">
                    {formData.app_handle_whatsapp && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">📱 WhatsApp:</span>
                        <span className="text-white">{formData.app_handle_whatsapp}</span>
                      </div>
                    )}
                    {formData.app_handle_telegram && (
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">✈️ Telegram:</span>
                        <span className="text-white">{formData.app_handle_telegram}</span>
                      </div>
                    )}
                    {formData.app_handle_teams && (
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400">👥 Teams:</span>
                        <span className="text-white">{formData.app_handle_teams}</span>
                      </div>
                    )}
                    {formData.app_handle_instagram && (
                      <div className="flex items-center gap-2">
                        <span className="text-pink-400">📸 Instagram:</span>
                        <span className="text-white">{formData.app_handle_instagram}</span>
                      </div>
                    )}
                    {formData.app_handle_snapchat && (
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">👻 Snapchat:</span>
                        <span className="text-white">{formData.app_handle_snapchat}</span>
                      </div>
                    )}
                    {formData.app_handle_otra && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">📱 {formData.app_otra_nombre || 'Otra App'}:</span>
                        <span className="text-white">{formData.app_handle_otra}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Extras de Videollamadas */}
              {formData.extras_videollamadas.length > 0 && (
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Extras de Videollamadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.extras_videollamadas.map((extra, index) => (
                      <span key={index} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        {extra}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Extras de Videos Personalizados */}
              {formData.extras_custom.length > 0 && (
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Extras de Videos Personalizados</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.extras_custom.map((extra, index) => (
                      <span key={index} className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                        {extra}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Extras Generales */}
              {formData.extras_generales && (
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Información Adicional</h3>
                  <p className="text-white">{formData.extras_generales}</p>
                </div>
              )}

              {/* Precios de Servicios */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Precios de Servicios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(formData.precios).map(([servicio, precio]) => (
                    precio > 0 && (
                      <div key={servicio} className="flex justify-between items-center p-3 bg-gray-600/50 rounded-lg">
                        <span className="text-white text-sm">{servicio}</span>
                        <span className="text-green-400 font-semibold">${precio}</span>
                      </div>
                    )
                  ))}
                </div>
                {Object.values(formData.precios).every(precio => precio === 0) && (
                  <p className="text-gray-400 text-center py-4">No se han establecido precios</p>
                )}
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 px-6 py-4 rounded-b-xl">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setShowPreview(false)
                    handleSubmit()
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Confirmar y Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}