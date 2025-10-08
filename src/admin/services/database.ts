import { supabase } from '../../lib/api';

// Generic CRUD operations for any table
export class DatabaseService {
  protected tableName: string;
  constructor(tableName: string) {
    this.tableName = tableName;
  }

  // Create a new record
  async create(data: any) {
    try {
      const { data: result, error } = await supabase
        .from(this.tableName)
        .insert({ ...data, user_id: (await supabase.auth.getUser()).data.user?.id })
        .select()
        .single();

      if (error) throw error;
      return result;
    } catch (error) {
      console.error(`Error creating ${this.tableName}:`, error);
      throw error;
    }
  }

  // Read all records
  async getAll(filters?: any) {
    try {
      let query = supabase.from(this.tableName).select('*');
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(`Error fetching ${this.tableName}:`, error);
      throw error;
    }
  }

  // Read a single record by ID
  async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching ${this.tableName} by ID:`, error);
      throw error;
    }
  }

  // Update a record
  async update(id: string, data: any) {
    try {
      const { data: result, error } = await supabase
        .from(this.tableName)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    } catch (error) {
      console.error(`Error updating ${this.tableName}:`, error);
      throw error;
    }
  }

  // Delete a record
  async delete(id: string) {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error deleting ${this.tableName}:`, error);
      throw error;
    }
  }
}

// Specific service classes for each entity
export class ProjectsService extends DatabaseService {
  constructor() {
    super('projects');
  }

  // Get projects by category
  async getByCategory(category: string) {
    return this.getAll({ category, status: 'published' });
  }

  // Get featured projects
  async getFeatured() {
    return this.getAll({ featured: true, status: 'published' });
  }

  // Get public projects (for portfolio display)
  async getPublicProjects() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('status', 'published')
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching public projects:', error);
      throw error;
    }
  }
}

export class ExperienceService extends DatabaseService {
  constructor() {
    super('experiences');
  }

  // Get current experiences
  async getCurrent() {
    return this.getAll({ current: true });
  }

  // Get experiences sorted by start date
  async getAllSorted() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching sorted experiences:', error);
      throw error;
    }
  }
}

export class EducationService extends DatabaseService {
  constructor() {
    super('educations');
  }

  // Get current education
  async getCurrent() {
    return this.getAll({ current: true });
  }

  // Get education sorted by start date
  async getAllSorted() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching sorted education:', error);
      throw error;
    }
  }
}

export class SkillsService extends DatabaseService {
  constructor() {
    super('skills');
  }

  // Get skills by category
  async getByCategory(category: string) {
    return this.getAll({ category });
  }

  // Get featured skills
  async getFeatured() {
    return this.getAll({ featured: true });
  }

  // Get skills grouped by category
  async getGroupedByCategory() {
    try {
      const skills = await this.getAll();
      const grouped = skills.reduce((acc: any, skill: any) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      }, {});
      
      return grouped;
    } catch (error) {
      console.error('Error grouping skills by category:', error);
      throw error;
    }
  }
}

export class ContactService extends DatabaseService {
  constructor() {
    super('contact_messages');
  }

  // Create contact message (public endpoint)
  async createMessage(data: any) {
    try {
      const { data: result, error } = await supabase
        .from(this.tableName)
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw error;
    }
  }

  // Get unread messages
  async getUnread() {
    return this.getAll({ status: 'unread' });
  }

  // Mark message as read
  async markAsRead(id: string) {
    return this.update(id, { status: 'read' });
  }
}

// Service instances
export const projectsService = new ProjectsService();
export const experienceService = new ExperienceService();
export const educationService = new EducationService();
export const skillsService = new SkillsService();
export const contactService = new ContactService();

// Authentication helpers
export const authService = {
  // Check if user is authenticated
  async isAuthenticated() {
    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Reset password
  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }
};

// Analytics helpers
export const analyticsService = {
  // Track page view
  async trackPageView(page: string) {
    try {
      const { error } = await supabase
        .from('analytics')
        .upsert({ page, views: 1 }, { onConflict: 'page,date' });

      if (error) {
        // If upsert fails, try incrementing existing record
        await supabase.rpc('increment_page_views', { page_name: page });
      }
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  },

  // Get analytics data
  async getAnalytics(days: number = 30) {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
};

// Export all services
export default {
  projects: projectsService,
  experience: experienceService,
  education: educationService,
  skills: skillsService,
  contact: contactService,
  auth: authService,
  analytics: analyticsService,
};