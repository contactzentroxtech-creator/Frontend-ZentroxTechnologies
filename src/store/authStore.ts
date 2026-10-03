import { create } from "zustand";
import api, { saveToken, clearToken } from "@/lib/api";
import { User } from "@/types/index";

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  initialized: false,

  /* ═══════════════════════════════════════════════════════════════
     LOGIN — Backend both 'token' and 'accessToken' bhejta hai
  ═══════════════════════════════════════════════════════════════ */
  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data } = await api.post("/auth/login", { email, password });
      console.log("LOGIN RESPONSE:", data);

      // Backend 'accessToken' ya 'token' — dono try karo
      const token = data.accessToken || data.token;

      if (!token) {
        throw new Error("No token received from server");
      }

      saveToken(token);

      set({
        user: data.user,
        loading: false,
        initialized: true,
      });

      console.log("✅ Login successful, token saved");
    } catch (err: any) {
      console.error("LOGIN ERROR:", err.message);
      set({ loading: false });
      throw new Error(err.response?.data?.message || "Login failed");
    }
  },

  /* ═══════════════════════════════════════════════════════════════
     REGISTER
  ═══════════════════════════════════════════════════════════════ */
  register: async (formData) => {
    set({ loading: true });
    try {
      const { data } = await api.post("/auth/register", formData);

      const token = data.accessToken || data.token;

      if (!token) {
        throw new Error("No token received from server");
      }

      saveToken(token);

      set({
        user: data.user,
        loading: false,
        initialized: true,
      });
    } catch (err: any) {
      set({ loading: false });
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  },

  /* ═══════════════════════════════════════════════════════════════
     LOGOUT
  ═══════════════════════════════════════════════════════════════ */
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore logout API errors
    }
    clearToken();
    set({ user: null });
  },

  /* ═══════════════════════════════════════════════════════════════
     FETCH ME — Verify token and get current user
  ═══════════════════════════════════════════════════════════════ */
  fetchMe: async () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("zt_access_token")
        : null;

    if (!token) {
      set({ user: null, initialized: true });
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      if (data?.success && data.user) {
        set({ user: data.user, initialized: true });
      } else {
        clearToken();
        set({ user: null, initialized: true });
      }
    } catch (err) {
      // Token invalid / expired
      clearToken();
      set({ user: null, initialized: true });
    }
  },
}));
