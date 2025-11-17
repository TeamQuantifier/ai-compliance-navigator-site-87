export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alternates: {
        Row: {
          alternate_id: string
          alternate_lang: string
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string
          id: string
          primary_id: string
          primary_lang: string
        }
        Insert: {
          alternate_id: string
          alternate_lang: string
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string
          id?: string
          primary_id: string
          primary_lang: string
        }
        Update: {
          alternate_id?: string
          alternate_lang?: string
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string
          id?: string
          primary_id?: string
          primary_lang?: string
        }
        Relationships: []
      }
      authors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          name: string
          slug: string
          social: Json | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          name: string
          slug: string
          social?: Json | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          name?: string
          slug?: string
          social?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          lang: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          lang: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          lang?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          body_rich: Json
          category_id: string | null
          created_at: string
          excerpt: string | null
          id: string
          lang: string
          meta_desc: string | null
          meta_title: string | null
          og_image_url: string | null
          published_at: string | null
          related_post_ids: string[] | null
          slug: string
          status: Database["public"]["Enums"]["post_status"]
          tags: string[] | null
          title: string
          topic_id: string | null
          updated_at: string
        }
        Insert: {
          body_rich?: Json
          category_id?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          lang: string
          meta_desc?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          published_at?: string | null
          related_post_ids?: string[] | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"]
          tags?: string[] | null
          title: string
          topic_id?: string | null
          updated_at?: string
        }
        Update: {
          body_rich?: Json
          category_id?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          lang?: string
          meta_desc?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          published_at?: string | null
          related_post_ids?: string[] | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"]
          tags?: string[] | null
          title?: string
          topic_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      redirects: {
        Row: {
          created_at: string
          from_path: string
          hits: number
          http_code: number
          id: string
          is_active: boolean
          to_path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_path: string
          hits?: number
          http_code?: number
          id?: string
          is_active?: boolean
          to_path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_path?: string
          hits?: number
          http_code?: number
          id?: string
          is_active?: boolean
          to_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      stories: {
        Row: {
          author_id: string | null
          body_rich: Json
          client_name: string | null
          country: string | null
          created_at: string
          id: string
          industry: string | null
          lang: string
          logo_url: string | null
          meta_desc: string | null
          meta_title: string | null
          og_image_url: string | null
          published_at: string | null
          results_kpis: Json | null
          seo_score: number | null
          slug: string
          status: Database["public"]["Enums"]["post_status"]
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body_rich?: Json
          client_name?: string | null
          country?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          lang: string
          logo_url?: string | null
          meta_desc?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          published_at?: string | null
          results_kpis?: Json | null
          seo_score?: number | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"]
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body_rich?: Json
          client_name?: string | null
          country?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          lang?: string
          logo_url?: string | null
          meta_desc?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          published_at?: string | null
          results_kpis?: Json | null
          seo_score?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"]
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stories_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          created_at: string
          description: string | null
          id: string
          lang: string
          name: string
          target_keyword: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          lang: string
          name: string
          target_keyword?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          lang?: string
          name?: string
          target_keyword?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
      content_type: "post" | "story"
      post_status: "draft" | "scheduled" | "published" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "viewer"],
      content_type: ["post", "story"],
      post_status: ["draft", "scheduled", "published", "archived"],
    },
  },
} as const
