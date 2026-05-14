"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, LogOut, Settings, User, WalletCards } from "lucide-react";
import { QuoteHistory } from "@/components/dashboard/QuoteHistory";
import { useAuthStore } from "@/store/useAuthStore";

const navItems = [
  { label: "Quote History", icon: WalletCards },
  { label: "Profile", icon: User },
  { label: "Company Settings", icon: Settings },
];

export function DashboardShell() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isSyncing = useAuthStore((state) => state.isSyncing);
  const logout = useAuthStore((state) => state.logout);
  const syncProfile = useAuthStore((state) => state.syncProfile);

  useEffect(() => {
    if (token && !user) {
      syncProfile();
    }
  }, [syncProfile, token, user]);

  useEffect(() => {
    if (!token && !isSyncing) {
      router.replace("/login");
    }
  }, [isSyncing, router, token]);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  if (!token) {
    return (
      <main className="grid min-h-screen place-items-center px-5 text-center text-text-primary">
        <div>
          <p className="text-xs font-semibold uppercase text-accent-steel">B2B Portal</p>
          <h1 className="mt-4 font-headline text-4xl text-white">Redirecting to secure access</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-text-primary">
      <div className="grid min-h-screen lg:grid-cols-[290px_1fr]">
        <aside className="border-b border-border-metallic bg-black/20 p-5 lg:border-b-0 lg:border-r">
          <Link href="/" className="font-headline text-2xl font-bold text-white">
            ELSHBINY
          </Link>
          <div className="mt-10 glass-panel rounded-md p-4">
            <Building2 aria-hidden className="h-7 w-7 text-accent-steel" strokeWidth={1.5} />
            <p className="mt-4 text-xs uppercase text-text-secondary">Authorized Profile</p>
            <h2 className="mt-1 text-lg font-semibold text-white">{user?.name ?? "Syncing profile"}</h2>
            <p className="mt-1 break-all text-sm text-text-secondary">{user?.email ?? "..."}</p>
          </div>

          <nav className="mt-8 grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <span
                  key={item.label}
                  className="flex h-12 items-center gap-3 border border-border-metallic bg-white/[0.02] px-4 text-sm font-semibold uppercase text-text-primary"
                >
                  <Icon aria-hidden className="h-4 w-4 text-accent-platinum" strokeWidth={1.8} />
                  {item.label}
                </span>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 flex h-12 w-full items-center justify-center gap-3 border border-border-metallic text-sm font-semibold uppercase text-white hover:border-white"
          >
            <LogOut aria-hidden className="h-4 w-4" strokeWidth={1.8} />
            Logout
          </button>
        </aside>

        <section className="px-5 py-10 md:px-10 lg:py-14">
          <div className="mb-10 border-b border-border-metallic pb-8">
            <p className="text-xs font-semibold uppercase text-accent-steel">B2B Dashboard</p>
            <h1 className="mt-4 max-w-4xl font-headline text-5xl text-white md:text-7xl">Procurement command room.</h1>
          </div>
          <QuoteHistory />
        </section>
      </div>
    </main>
  );
}
