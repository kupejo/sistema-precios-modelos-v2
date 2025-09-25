'use client'

import { useState } from 'react'
import { ModernButton } from '@/components/ui/ModernButton'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { Chatter } from '@/lib/dataService'

interface ExportDataModalProps {
  chatter: Chatter
  onClose: () => void
}

export function ExportDataModal({ chatter, onClose }: ExportDataModalProps) {
  const [loading, setLoading] = useState(false)
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['json'])

  const handleFormatToggle = (format: string) => {
    setSelectedFormats(prev => 
      prev.includes(format) 
        ? prev.filter(f => f !== format)
        : [...prev, format]
    )
  }

  const generateExportData = () => {
    const exportData = {
      user_info: {
        username: chatter.username,
        fullname: chatter.fullname,
        email: chatter.email,
        is_active: chatter.is_active,
        created_at: chatter.created_at
      },
      assigned_models: chatter.model_names.map((name, index) => ({
        id: chatter.model_ids[index],
        name: name
      })),
      export_date: new Date().toISOString(),
      export_version: '1.0'
    }

    return exportData
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleExport = async () => {
    if (selectedFormats.length === 0) {
      alert('Por favor selecciona al menos un formato de exportación.')
      return
    }

    setLoading(true)

    try {
      const data = generateExportData()
      const timestamp = new Date().toISOString().split('T')[0]

      for (const format of selectedFormats) {
        switch (format) {
          case 'json':
            downloadFile(
              JSON.stringify(data, null, 2),
              `chatter_data_${timestamp}.json`,
              'application/json'
            )
            break
          
          case 'csv':
            const csvContent = generateCSV(data)
            downloadFile(
              csvContent,
              `chatter_data_${timestamp}.csv`,
              'text/csv'
            )
            break
          
          case 'txt':
            const txtContent = generateTXT(data)
            downloadFile(
              txtContent,
              `chatter_data_${timestamp}.txt`,
              'text/plain'
            )
            break
        }
      }

      alert(`Datos exportados exitosamente en formato(s): ${selectedFormats.join(', ')}`)
      onClose()
      
    } catch (error) {
      console.error('Error exportando datos:', error)
      alert('Error al exportar los datos. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const generateCSV = (data: any) => {
    const lines = [
      'Campo,Valor',
      `Usuario,${data.user_info.username}`,
      `Nombre Completo,${data.user_info.fullname}`,
      `Email,${data.user_info.email}`,
      `Estado,${data.user_info.is_active ? 'Activo' : 'Inactivo'}`,
      `Fecha de Creación,${data.user_info.created_at}`,
      '',
      'Modelos Asignados',
      'ID,Nombre'
    ]

    data.assigned_models.forEach((model: any) => {
      lines.push(`${model.id},${model.name}`)
    })

    return lines.join('\n')
  }

  const generateTXT = (data: any) => {
    return `
DATOS DEL CHATTER - EXPORTACIÓN
================================

INFORMACIÓN PERSONAL:
- Usuario: ${data.user_info.username}
- Nombre Completo: ${data.user_info.fullname}
- Email: ${data.user_info.email}
- Estado: ${data.user_info.is_active ? 'Activo' : 'Inactivo'}
- Fecha de Creación: ${data.user_info.created_at}

MODELOS ASIGNADOS:
${data.assigned_models.map((model: any) => `- ${model.name} (ID: ${model.id})`).join('\n')}

INFORMACIÓN DE EXPORTACIÓN:
- Fecha de Exportación: ${data.export_date}
- Versión: ${data.export_version}
    `.trim()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <ModernCard className="w-full max-w-lg">
        <ModernCardHeader>
          <ModernCardTitle className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar Datos
          </ModernCardTitle>
        </ModernCardHeader>
        
        <ModernCardContent className="space-y-6">
          {/* Información del usuario */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Datos a exportar:</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Usuario:</span>
                <span className="text-white">{chatter.username}</span>
              </div>
              <div className="flex justify-between">
                <span>Nombre:</span>
                <span className="text-white">{chatter.fullname}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="text-white">{chatter.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Modelos asignados:</span>
                <span className="text-white">{chatter.model_names.length}</span>
              </div>
            </div>
          </div>

          {/* Formatos de exportación */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Selecciona formato(s):</h3>
            <div className="space-y-3">
              {[
                { id: 'json', name: 'JSON', description: 'Formato estructurado para desarrolladores' },
                { id: 'csv', name: 'CSV', description: 'Hoja de cálculo compatible' },
                { id: 'txt', name: 'TXT', description: 'Texto plano legible' }
              ].map((format) => (
                <label key={format.id} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFormats.includes(format.id)}
                    onChange={() => handleFormatToggle(format.id)}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <div>
                    <div className="text-white font-medium">{format.name}</div>
                    <div className="text-sm text-gray-400">{format.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div className="text-sm text-yellow-300">
                <p className="font-medium mb-1">Importante:</p>
                <p className="text-yellow-400">Los archivos se descargarán automáticamente a tu dispositivo. Mantén estos datos seguros y no los compartas con terceros.</p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <ModernButton
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancelar
            </ModernButton>
            <ModernButton
              type="button"
              variant="primary"
              onClick={handleExport}
              className="flex-1"
              loading={loading}
              disabled={selectedFormats.length === 0}
            >
              {loading ? 'Exportando...' : 'Exportar Datos'}
            </ModernButton>
          </div>
        </ModernCardContent>
      </ModernCard>
    </div>
  )
}
