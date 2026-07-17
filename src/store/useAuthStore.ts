"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { apiFetch } from "@/lib/api";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role?: "buyer" | "super_admin";
  phone?: string | null;
  company_name?: string | null;
  address?: string | null;
};

type AuthProfileResponse = {
  data: AuthUser;
};

type AuthSessionResponse = {
  data: {
    user: AuthUser;
    access_token: string;
    token_type: "Bearer";
  };
};

type AuthStore = {
  user: AuthUser | null;
  token: string | null;
  isSyncing: boolean;
  isAuthenticating: boolean;
  error: string | null;
  setAuthSession: (user: AuthUser, token: string | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  syncProfile: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Pick<AuthUser, "phone" | "company_name" | "address">) => Promise<void>;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isSyncing: false,
      isAuthenticating: false,
      error: null,
      setAuthSession: (user, token) => set({ user, token, error: null }),
      setToken: (token) => set({ token }),
      login: async (email, password) => {
        set({ isAuthenticating: true, error: null });

        try {
          const response = await apiFetch<AuthSessionResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
              token_name: "elshbiny-storefront",
            }),
          });

          set({
            user: response.data.user,
            token: response.data.access_token,
            isAuthenticating: false,
            error: null,
          });
        } catch (error) {
          set({
            isAuthenticating: false,
            error: error instanceof Error ? error.message : "Unable to login.",
          });
          throw error;
        }
      },
      register: async (name, email, password) => {
        set({ isAuthenticating: true, error: null });

        try {
          const response = await apiFetch<AuthSessionResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify({
              name,
              email,
              password,
              token_name: "elshbiny-storefront",
            }),
          });

          set({
            user: response.data.user,
            token: response.data.access_token,
            isAuthenticating: false,
            error: null,
          });
        } catch (error) {
          set({
            isAuthenticating: false,
            error: error instanceof Error ? error.message : "Unable to register.",
          });
          throw error;
        }
      },
      syncProfile: async () => {
        const token = get().token;

        if (!token) {
          set({ user: null, isSyncing: false });
          return;
        }

        set({ isSyncing: true, error: null });

        try {
          const response = await apiFetch<AuthProfileResponse>("/auth/me", { token });
          set({ user: response.data, isSyncing: false });
        } catch (error) {
          set({
            user: null,
            token: null,
            isSyncing: false,
            error: error instanceof Error ? error.message : "Unable to sync profile.",
          });
        }
      },
      logout: async () => {
        const token = get().token;

        if (token) {
          try {
            await apiFetch("/auth/logout", {
              method: "POST",
              token,
            });
          } catch {
            // Local session must still clear when the token is already invalid.
          }
        }

        set({ user: null, token: null, error: null, isSyncing: false, isAuthenticating: false });
      },
      updateProfile: async (profile) => {
        const token = get().token;

        if (!token) {
          throw new Error("Missing auth token.");
        }

        const response = await apiFetch<AuthProfileResponse>("/auth/profile", {
          method: "PATCH",
          token,
          body: JSON.stringify(profile),
        });

        set({ user: response.data, error: null });
      },
      clearAuth: () =>
        set({
          user: null,
          token: null,
          error: null,
          isSyncing: false,
          isAuthenticating: false,
        }),
    }),
    {
      name: "elshbiny-b2b-session",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);
