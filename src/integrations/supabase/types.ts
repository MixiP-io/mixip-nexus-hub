export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assets: {
        Row: {
          folder_id: string | null
          id: string
          license_type: string | null
          name: string
          preview_url: string | null
          project_id: string
          size: number
          storage_path: string | null
          storage_url: string | null
          type: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          folder_id?: string | null
          id?: string
          license_type?: string | null
          name: string
          preview_url?: string | null
          project_id: string
          size: number
          storage_path?: string | null
          storage_url?: string | null
          type: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          folder_id?: string | null
          id?: string
          license_type?: string | null
          name?: string
          preview_url?: string | null
          project_id?: string
          size?: number
          storage_path?: string | null
          storage_url?: string | null
          type?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assets_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "project_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_type: string | null
          avatar: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          full_name: string | null
          id: string
          is_new_user: boolean | null
          location: string | null
          updated_at: string
        }
        Insert: {
          account_type?: string | null
          avatar?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          full_name?: string | null
          id: string
          is_new_user?: boolean | null
          location?: string | null
          updated_at?: string
        }
        Update: {
          account_type?: string | null
          avatar?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          full_name?: string | null
          id?: string
          is_new_user?: boolean | null
          location?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_folders: {
        Row: {
          created_at: string
          id: string
          name: string
          parent_folder_id: string | null
          project_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          parent_folder_id?: string | null
          project_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          parent_folder_id?: string | null
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_folders_parent_folder_id_fkey"
            columns: ["parent_folder_id"]
            isOneToOne: false
            referencedRelation: "project_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_folders_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_licensing: {
        Row: {
          ai_training: boolean | null
          created_at: string
          derivative_works: boolean | null
          extended_marketing: boolean | null
          id: string
          merchandising: boolean | null
          primary_campaign: boolean | null
          project_id: string
          publicity: boolean | null
          secondary_brand: boolean | null
          social_media: boolean | null
          type: string
          updated_at: string
        }
        Insert: {
          ai_training?: boolean | null
          created_at?: string
          derivative_works?: boolean | null
          extended_marketing?: boolean | null
          id?: string
          merchandising?: boolean | null
          primary_campaign?: boolean | null
          project_id: string
          publicity?: boolean | null
          secondary_brand?: boolean | null
          social_media?: boolean | null
          type?: string
          updated_at?: string
        }
        Update: {
          ai_training?: boolean | null
          created_at?: string
          derivative_works?: boolean | null
          extended_marketing?: boolean | null
          id?: string
          merchandising?: boolean | null
          primary_campaign?: boolean | null
          project_id?: string
          publicity?: boolean | null
          secondary_brand?: boolean | null
          social_media?: boolean | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_licensing_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_owners: {
        Row: {
          created_at: string
          id: string
          project_id: string
          royalty_percentage: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          royalty_percentage?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          royalty_percentage?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_owners_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          cover_image: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
