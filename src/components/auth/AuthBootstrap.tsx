"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthBootstrap() {
  const token = useAuthStore((state) => state.token);
  const syncProfile = useAuthStore((state) => state.syncProfile);

  useEffect(() => {
    if (token) {
      syncProfile();
    }
  }, [syncProfile, token]);

  return null;
}
