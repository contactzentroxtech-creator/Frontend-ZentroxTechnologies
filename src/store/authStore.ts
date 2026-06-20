import { create } from 'zustand';
import api, { saveToken, clearToken } from '@/lib/api';
import { User } from '@/types/index';


interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  initialized: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      console.log("Here is from login comp from authstore : ", data);
      saveToken(data.accessToken);
      set({ user: data.user, loading: false });
    } catch (err: any) {
      set({ loading: false });
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  },

  register: async (formData) => {
    set({ loading: true });
    try {
      const { data } = await api.post('/auth/register', formData);
      saveToken(data.accessToken);
      set({ user: data.user, loading: false });
    } catch (err: any) {
      set({ loading: false });
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  },

  logout: async () => {
    try { await api.post('/auth/logout'); } catch {}
    clearToken();
    set({ user: null });
  },

  fetchMe: async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('zt_access_token') : null;
    if (!token) { set({ initialized: true }); return; }
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data.user, initialized: true });
    } catch {
      clearToken();
      set({ user: null, initialized: true });
    }
  },
}));
