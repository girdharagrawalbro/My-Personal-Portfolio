// Local API shim that replaces the server dependency with static data
import { projectsData } from '../utils/projectsData';
import { experienceData } from '../utils/experienceData';
import { educationData } from '../utils/educationData';
import { skillsData } from '../utils/constants';

const AUTH_KEY = 'portfolio_auth_token';

// Simple in-memory mock for data that might be modified (e.g., contact messages)
const mockDb: Record<string, any[]> = {
  projects: projectsData,
  experiences: experienceData,
  educations: educationData,
  skills: skillsData.flatMap(cat => cat.skills.map(s => ({ ...s, category: cat.title }))),
  contact_messages: [],
  analytics: []
};

// Simple local storage persistence helper
const getLocalData = (collection: string) => {
  const stored = localStorage.getItem(`portfolio_db_${collection}`);
  if (stored) return JSON.parse(stored);
  return mockDb[collection] || [];
};

const setLocalData = (collection: string, data: any[]) => {
  localStorage.setItem(`portfolio_db_${collection}`, JSON.stringify(data));
};

function from(collection: string) {
  return {
    select: () => ({
      eq: (key: string, value: any) => ({
        order: (field: string, { ascending = true } = {}) => ({
          then: (resolve: any) => {
            let data = [...getLocalData(collection)];
            data = data.filter((item: any) => item[key] === value);
            data.sort((a, b) => {
              const valA = a[field];
              const valB = b[field];
              if (valA < valB) return ascending ? -1 : 1;
              if (valA > valB) return ascending ? 1 : -1;
              return 0;
            });
            resolve({ data, error: null });
          }
        }),
        then: (resolve: any) => {
          const data = getLocalData(collection).filter((item: any) => item[key] === value);
          resolve({ data, error: null });
        }
      }),
      order: (field: string, { ascending = true } = {}) => ({
        then: (resolve: any) => {
          const data = [...getLocalData(collection)];
          data.sort((a, b) => {
            const valA = a[field];
            const valB = b[field];
            if (valA < valB) return ascending ? -1 : 1;
            if (valA > valB) return ascending ? 1 : -1;
            return 0;
          });
          resolve({ data, error: null });
        }
      }),
      then: (resolve: any) => {
        resolve({ data: getLocalData(collection), error: null });
      }
    }),
    insert: async (payload: any) => {
      const data = getLocalData(collection);
      const newItem = { ...payload, id: String(Date.now()), created_at: new Date().toISOString() };
      data.push(newItem);
      setLocalData(collection, data);
      return { data: newItem, error: null };
    },
    update: async (id: string, payload: any) => {
      const data = getLocalData(collection);
      const idx = data.findIndex((item: any) => item.id === id || item._id === id);
      if (idx >= 0) {
        data[idx] = { ...data[idx], ...payload };
        setLocalData(collection, data);
        return { data: data[idx], error: null };
      }
      return { data: null, error: { message: 'Not found' } };
    },
    delete: async (id: string) => {
      let data = getLocalData(collection);
      data = data.filter((item: any) => item.id !== id && item._id !== id);
      setLocalData(collection, data);
      return { data: null, error: null };
    },
    upsert: async (payload: any) => {
      const data = getLocalData(collection);
      data.push(payload);
      setLocalData(collection, data);
      return { data: payload, error: null };
    }
  };
}

const authShim = {
  getSession: async () => {
    const token = localStorage.getItem(AUTH_KEY);
    return { data: { session: token ? { access_token: token, user: { id: 'local-user', email: 'admin@example.com' } } : null }, error: null };
  },
  signInWithPassword: async ({ email, password }: any) => {
    // Basic local "admin" login check
    if (email === 'admin@example.com' && password === 'admin') {
      const token = 'local-mock-token';
      localStorage.setItem(AUTH_KEY, token);
      return { data: { user: { id: 'local-user', email }, session: { access_token: token } }, error: null };
    }
    return { data: null, error: { message: 'Invalid credentials. Use admin@example.com / admin' } };
  },
  signOut: async () => {
    localStorage.removeItem(AUTH_KEY);
    return { error: null };
  },
  getUser: async () => {
    const token = localStorage.getItem(AUTH_KEY);
    if (!token) return { data: { user: null }, error: null };
    return { data: { user: { id: 'local-user', email: 'admin@example.com' } }, error: null };
  },
  onAuthStateChange: (_handler: any) => {
    return { data: { subscription: { unsubscribe: () => { } } } };
  },
  resetPasswordForEmail: async () => ({ error: null })
};

const apiShim: any = {
  from,
  auth: authShim,
  rpc: async (fn: string, payload?: any) => {
    console.log(`Mock RPC call: ${fn}`, payload);
    return { data: true, error: null };
  }
};

export const supabase: any = apiShim;
export default supabase;

