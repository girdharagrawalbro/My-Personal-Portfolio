// Minimal API shim implementing the subset of the previous Supabase shim
// It forwards calls to your local REST server (Express app at VITE_API_BASE)

function normalizeUrl(path: string) {
  const base = (import.meta.env as any).VITE_API_BASE || ''
  return `${base}${path}`
}

async function handleResponse(res: Response) {
  const body = await res.json().catch(() => null)
  if (!res.ok) return { data: null, error: body || { message: res.statusText } }
  return { data: body, error: null }
}

function createQuery(collection: string) {
  const state: any = { filters: [], order: null }

  async function execute() {
    const params = new URLSearchParams()
    state.filters.forEach((f: any) => params.append(f.key, String(f.value)))
    if (state.order) {
      params.append('_order', state.order.field)
      params.append('_orderDir', state.order.opts?.ascending ? 'asc' : 'desc')
    }
    const url = normalizeUrl(`/api/${collection}`) + (params.toString() ? `?${params.toString()}` : '')
    const res = await fetch(url)
    return handleResponse(res)
  }

  const proxy: any = {
    select: (_cols?: string) => proxy,
    eq: (key: string, value: any) => { state.filters.push({ key, op: 'eq', value }); return proxy },
    gte: (key: string, value: any) => { state.filters.push({ key, op: 'gte', value }); return proxy },
    order: (field: string, opts?: any) => { state.order = { field, opts }; return proxy },
    then: (onfulfilled: any, onrejected?: any) => execute().then(onfulfilled, onrejected),
    execute
  }

  return proxy
}

function from(collection: string) {
  return {
    select: (cols?: string) => createQuery(collection).select(cols),
    insert: async (payload: any) => {
      const url = normalizeUrl(`/api/${collection}`)
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      return handleResponse(res)
    },
    update: async (idOrObj: any, payload?: any) => {
      let id = idOrObj
      let body = payload
      if (typeof idOrObj === 'object' && !payload) {
        id = idOrObj._id || idOrObj.id
        body = idOrObj
      }
      if (!id) return { data: null, error: { message: 'Missing id for update' } }
      const url = normalizeUrl(`/api/${collection}/${id}`)
      const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      return handleResponse(res)
    },
    delete: async (id: string) => {
      const url = normalizeUrl(`/api/${collection}/${id}`)
      const res = await fetch(url, { method: 'DELETE' })
      return handleResponse(res)
    },
    upsert: async (payload: any, opts?: any) => {
      const url = normalizeUrl(`/api/${collection}/upsert`)
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payload, onConflict: opts?.onConflict }) })
      return handleResponse(res)
    }
  }
}

const AUTH_KEY = 'portfolio_auth_token'

const authShim = {
  getSession: async () => {
    const token = localStorage.getItem(AUTH_KEY)
    return { data: { session: token ? { access_token: token } : null }, error: null }
  },
  signInWithPassword: async ({ email, password }: { email: string, password: string }) => {
    try {
      const url = normalizeUrl('/auth/login')
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const body = await res.json().catch(() => null)
      if (!res.ok) return { data: null, error: body || { message: res.statusText } }
      const { token, user } = body
      if (token) localStorage.setItem(AUTH_KEY, token)
      return { data: { user, session: { access_token: token } }, error: null }
    } catch (err: any) {
      return { data: null, error: { message: err?.message || 'Login failed' } }
    }
  },
  signOut: async () => {
    localStorage.removeItem(AUTH_KEY)
    return { error: null }
  },
  getUser: async () => {
    try {
      const token = localStorage.getItem(AUTH_KEY)
      if (!token) return { data: { user: null }, error: null }
      const url = normalizeUrl('/auth/me')
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      const body = await res.json().catch(() => null)
      if (!res.ok) return { data: { user: null }, error: body || { message: res.statusText } }
      return { data: { user: body }, error: null }
    } catch (err: any) {
      return { data: { user: null }, error: { message: err?.message || 'Failed to fetch user' } }
    }
  },
  onAuthStateChange: (handler: (event: string, session: any) => void) => {
    const listeners: any = (window as any).__portfolio_auth_listeners__ = (window as any).__portfolio_auth_listeners__ || []
    listeners.push(handler)
    return { data: { subscription: { unsubscribe: () => { const idx = listeners.indexOf(handler); if (idx >= 0) listeners.splice(idx, 1) } } } }
  },
  resetPasswordForEmail: async (_email: string) => {
    // Not implemented for local REST API; return no-op
    return { error: null }
  }
}

const apiShim: any = {
  from,
  auth: authShim,
  rpc: async (fn: string, payload?: any) => {
    const url = normalizeUrl(`/rpc/${fn}`)
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload || {}) })
    return handleResponse(res)
  }
}

export const supabase: any = apiShim
export default supabase
