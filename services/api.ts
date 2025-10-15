export type Json = any;

const BASE = '/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}` || path, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return res.json();
  }
  // Some endpoints may return raw JSON bytes; try parse
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text as unknown as T; }
}

export const authApi = {
  async login(employeeId: string, password: string) {
    return request<{ ok: boolean; token?: string; message?: string }>(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ employeeId, password }),
    });
  },
  async logout() {
    return request(`/auth/logout`, { method: 'POST' });
  },
};

export const staffApi = {
  async getAll() {
    const res = await request<{ ok: boolean; data: any[] }>(`/employees/`);
    return res.data as any[];
  },
  async getById(id: string) {
    const res = await request<any>(`/employees/${id}`);
    if (res && res.ok !== undefined && res.data) return res.data;
    return res; // raw doc
  },
  async changePassword(id: string, _newPassword: string) {
    // For demo: toggle mustChangePassword=false
    const current = await this.getById(id);
    const updated = { ...current, mustChangePassword: false };
    await request(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(updated) });
    return true;
  },
};

function makeCrud(resource: string) {
  return {
    async list() {
      const res = await request<{ ok: boolean; data: any[] }>(`/${resource}/`);
      return res.data;
    },
    async create(item: any) {
      return request<{ ok: boolean; id: string }>(`/${resource}/`, { method: 'POST', body: JSON.stringify(item) });
    },
    async update(id: string, item: any) {
      return request<{ ok: boolean }>(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(item) });
    },
    async remove(id: string) {
      return request<{ ok: boolean }>(`/${resource}/${id}`, { method: 'DELETE' });
    },
  };
}

export const assetsApi = makeCrud('assets');
export const ticketsApi = makeCrud('tickets');
export const maintenanceApi = makeCrud('maintenance');

export const dashboardApi = {
  async summary() {
    const res = await request<{ ok: boolean; data: { assets: number; employees: number; ticketsOpen: number; maintenance: number } }>(`/dashboard/summary`);
    return res.data;
  },
};
