// Database type definitions for Supabase
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          project_url: string
          github_url: string
          technologies: string[]
          category: string
          featured: boolean
          created_at: string
          updated_at: string
