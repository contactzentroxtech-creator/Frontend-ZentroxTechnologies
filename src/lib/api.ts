import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-zentroxtechnologies.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  withCredentials: true, // required for refresh token cookie to be sent
});

// ─── Attach access token to every request ───────────────────────────────────
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('zt_access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Auto-refresh on 401 (access token expired) ─────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{ resolve: (v: string) => void; reject: (e: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
};

// Routes that must NEVER trigger an auto-refresh attempt
const NO_REFRESH_URLS = ['/auth/refresh', '/auth/login', '/auth/register', '/auth/me'];

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // FIX: Skip refresh logic entirely for auth endpoints and already-retried requests.
    // Previously, a 401 on /auth/me (no token) would trigger /auth/refresh,
    // which would fail (no cookie), which would redirect to /auth/login —
    // breaking any public page that tried to silently check auth.
    const url: string = original?.url || '';
    const isAuthEndpoint = NO_REFRESH_URLS.some((u) => url.includes(u));

    if (err.response?.status === 401 && !original._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post('/auth/refresh');
        const newToken = data.accessToken;
        localStorage.setItem('zt_access_token', newToken);
        processQueue(null, newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem('zt_access_token');
        // FIX: Only redirect to login if user was on a protected page, not everywhere.
        // Check if we're already on a public page before forcing redirect.
        if (typeof window !== 'undefined') {
          const path = window.location.pathname;
          const isProtected = path.startsWith('/admin') || path.startsWith('/dashboard');
          if (isProtected) {
            window.location.href = '/auth/login';
          }
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') localStorage.setItem('zt_access_token', token);
};
export const clearToken = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('zt_access_token');
};

export default api;
