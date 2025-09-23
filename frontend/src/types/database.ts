/**
 * =====================================================
 * TIPOS DE BASE DE DATOS
 * =====================================================
 * 
 * Tipos TypeScript generados automáticamente por Supabase
 * Para regenerar: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      modelos: {
        Row: {
          id: string
          profile_id: string
          modelo: string
          contacto: string | null
          apps_selected: string[]
          app_handle_whatsapp: string | null
          app_handle_telegram: string | null
          app_handle_teams: string | null
          app_handle_instagram: string | null
          app_handle_snapchat: string | null
          app_handle_otra: string | null
          app_otra_nombre: string | null
          extras_videollamadas: string[]
          extras_custom: string[]
          extras_generales: string | null
          aprobado: boolean
          activo: boolean
          eliminado: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          modelo: string
          contacto?: string | null
          apps_selected?: string[]
          app_handle_whatsapp?: string | null
          app_handle_telegram?: string | null
          app_handle_teams?: string | null
          app_handle_instagram?: string | null
          app_handle_snapchat?: string | null
          app_handle_otra?: string | null
          app_otra_nombre?: string | null
          extras_videollamadas?: string[]
          extras_custom?: string[]
          extras_generales?: string | null
          aprobado?: boolean
          activo?: boolean
          eliminado?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          modelo?: string
          contacto?: string | null
          apps_selected?: string[]
          app_handle_whatsapp?: string | null
          app_handle_telegram?: string | null
          app_handle_teams?: string | null
          app_handle_instagram?: string | null
          app_handle_snapchat?: string | null
          app_handle_otra?: string | null
          app_otra_nombre?: string | null
          extras_videollamadas?: string[]
          extras_custom?: string[]
          extras_generales?: string | null
          aprobado?: boolean
          activo?: boolean
          eliminado?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      servicios_precios: {
        Row: {
          id: string
          modelo_id: string
          videocall_5min: number
          videocall_10min: number
          videocall_15min: number
          custom_video_5m: number
          custom_video_10m: number
          custom_video_15m: number
          fotos_personalizadas_1: number
          fotos_personalizadas_3: number
          bg_personalizado: number
          panties: number
          sola_vaginal: number
          sola_anal: number
          sola_squirt: number
          bg_boy_girl: number
          bg_boy_girl_anal: number
          lesbian: number
          orgia: number
          bbc: number
          trio_2_chicos_1_chica: number
          lives: number
          estrenos: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          modelo_id: string
          videocall_5min?: number
          videocall_10min?: number
          videocall_15min?: number
          custom_video_5m?: number
          custom_video_10m?: number
          custom_video_15m?: number
          fotos_personalizadas_1?: number
          fotos_personalizadas_3?: number
          bg_personalizado?: number
          panties?: number
          sola_vaginal?: number
          sola_anal?: number
          sola_squirt?: number
          bg_boy_girl?: number
          bg_boy_girl_anal?: number
          lesbian?: number
          orgia?: number
          bbc?: number
          trio_2_chicos_1_chica?: number
          lives?: number
          estrenos?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          modelo_id?: string
          videocall_5min?: number
          videocall_10min?: number
          videocall_15min?: number
          custom_video_5m?: number
          custom_video_10m?: number
          custom_video_15m?: number
          fotos_personalizadas_1?: number
          fotos_personalizadas_3?: number
          bg_personalizado?: number
          panties?: number
          sola_vaginal?: number
          sola_anal?: number
          sola_squirt?: number
          bg_boy_girl?: number
          bg_boy_girl_anal?: number
          lesbian?: number
          orgia?: number
          bbc?: number
          trio_2_chicos_1_chica?: number
          lives?: number
          estrenos?: number
          created_at?: string
          updated_at?: string
        }
      }
      chatters: {
        Row: {
          id: string
          chatter_id: string
          username: string
          password_hash: string
          email: string | null
          fullname: string | null
          is_active: boolean
          model_ids: string[]
          model_names: string[]
          created_at: string
        }
        Insert: {
          id?: string
          chatter_id: string
          username: string
          password_hash: string
          email?: string | null
          fullname?: string | null
          is_active?: boolean
          model_ids?: string[]
          model_names?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          chatter_id?: string
          username?: string
          password_hash?: string
          email?: string | null
          fullname?: string | null
          is_active?: boolean
          model_ids?: string[]
          model_names?: string[]
          created_at?: string
        }
      }
      tickets: {
        Row: {
          id: string
          ticket_id: string
          modelo_id: string
          chatter_id: string
          type: string
          status: string
          price: number | null
          title: string
          description: string | null
          priority: string
          deadline: string | null
          client_info: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ticket_id: string
          modelo_id: string
          chatter_id: string
          type: string
          status?: string
          price?: number | null
          title: string
          description?: string | null
          priority?: string
          deadline?: string | null
          client_info?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ticket_id?: string
          modelo_id?: string
          chatter_id?: string
          type?: string
          status?: string
          price?: number | null
          title?: string
          description?: string | null
          priority?: string
          deadline?: string | null
          client_info?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      etiquetas: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      modelo_etiquetas: {
        Row: {
          modelo_id: string
          etiqueta_id: string
        }
        Insert: {
          modelo_id: string
          etiqueta_id: string
        }
        Update: {
          modelo_id?: string
          etiqueta_id?: string
        }
      }
      ticket_audit: {
        Row: {
          id: string
          ticket_id: string
          action: string
          old_values: Json | null
          new_values: Json | null
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          ticket_id: string
          action: string
          old_values?: Json | null
          new_values?: Json | null
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          ticket_id?: string
          action?: string
          old_values?: Json | null
          new_values?: Json | null
          user_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
