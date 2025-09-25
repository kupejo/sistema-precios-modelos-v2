'use client'

import { ModernCard, ModernCardHeader, ModernCardTitle, ModernCardDescription, ModernCardContent } from '@/components/ui/ModernCard'
import { ModernInput } from '@/components/ui/ModernInput'
import { ModernCheckboxGrid } from '@/components/ui/ModernCheckbox'

interface AppSelectionProps {
  selectedApps: string[]
  onAppsChange: (apps: string[]) => void
  formData: any
  onFormDataChange: (data: any) => void
}

const APPS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    description: 'Mensajería instantánea',
    icon: <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
  },
  {
    id: 'telegram',
    label: 'Telegram',
    description: 'Mensajería segura',
    icon: <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
  },
  {
    id: 'teams',
    label: 'Microsoft Teams',
    description: 'Videollamadas empresariales',
    icon: <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 8h-17c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h17c.276 0 .5-.224.5-.5v-11c0-.276-.224-.5-.5-.5zM3.5 6C2.673 6 2 6.673 2 7.5V17.5c0 .827.673 1.5 1.5 1.5h17c.827 0 1.5-.673 1.5-1.5V7.5c0-.827-.673-1.5-1.5-1.5h-17zM2 7.5C2 6.673 2.673 6 3.5 6h17c.827 0 1.5.673 1.5 1.5v11c0 .827-.673 1.5-1.5 1.5h-17c-.827 0-1.5-.673-1.5-1.5v-11z"/></svg>
  },
  {
    id: 'instagram',
    label: 'Instagram',
    description: 'Red social visual',
    icon: <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  },
  {
    id: 'snapchat',
    label: 'Snapchat',
    description: 'Mensajes temporales',
    icon: <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/></svg>
  },
  {
    id: 'otra',
    label: 'Otra App',
    description: 'Especifica el nombre',
    icon: <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
  }
]

export function AppSelection({
  selectedApps,
  onAppsChange,
  formData,
  onFormDataChange
}: AppSelectionProps) {
  // const [showHandleInputs, setShowHandleInputs] = useState<string[]>([])

  // const handleAppToggle = (appId: string) => {
  //   if (selectedApps.includes(appId)) {
  //     onAppsChange(selectedApps.filter(app => app !== appId))
  //     setShowHandleInputs(showHandleInputs.filter(app => app !== appId))
  //   } else {
  //     onAppsChange([...selectedApps, appId])
  //     setShowHandleInputs([...showHandleInputs, appId])
  //   }
  // }

  const handleAppHandleChange = (appId: string, value: string) => {
    const fieldName = `app_handle_${appId}`
    onFormDataChange({ [fieldName]: value })
  }

  const handleOtraAppChange = (value: string) => {
    onFormDataChange({ app_otra_nombre: value })
  }

  const getAppHandle = (appId: string) => {
    const fieldName = `app_handle_${appId}`
    return formData[fieldName] || ''
  }

  return (
    <ModernCard variant="elevated">
      <ModernCardHeader>
        <ModernCardTitle 
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        >
          Aplicaciones Preferidas
        </ModernCardTitle>
        <ModernCardDescription>
          Selecciona las plataformas donde ofreces tus servicios de videollamada
        </ModernCardDescription>
      </ModernCardHeader>
      
      <ModernCardContent>
        <ModernCheckboxGrid
          options={APPS}
          selected={selectedApps}
          onChange={onAppsChange}
          columns={3}
        />

        {/* Inputs para handles de apps */}
        {selectedApps.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-white mb-2">Información de Contacto</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedApps.map((appId) => {
                const app = APPS.find(a => a.id === appId)
                if (!app) return null

                if (appId === 'otra') {
                  return (
                    <div key={appId} className="space-y-2">
                      <ModernInput
                        label="Nombre de la App"
                        placeholder="Especifica el nombre de la app"
                        value={formData.app_otra_nombre || ''}
                        onChange={(e) => handleOtraAppChange(e.target.value)}
                      />
                      <ModernInput
                        label="Usuario/Handle"
                        placeholder="Tu usuario o ID en la app"
                        value={getAppHandle(appId)}
                        onChange={(e) => handleAppHandleChange(appId, e.target.value)}
                      />
                    </div>
                  )
                }

                return (
                  <ModernInput
                    key={appId}
                    label={`Usuario/Handle en ${app.label}`}
                    placeholder={`Tu usuario en ${app.label}`}
                    value={getAppHandle(appId)}
                    onChange={(e) => handleAppHandleChange(appId, e.target.value)}
                    leftIcon={app.icon}
                  />
                )
              })}
            </div>
          </div>
        )}

      </ModernCardContent>
    </ModernCard>
  )
}