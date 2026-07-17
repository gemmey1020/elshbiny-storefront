"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Globe2, LogOut, User, WalletCards } from "lucide-react";
import { ProfilePanel } from "@/components/dashboard/ProfilePanel";
import { QuoteHistory } from "@/components/dashboard/QuoteHistory";
import { pickLocalized } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useAuthStore } from "@/store/useAuthStore";

const navItems = [
  { key: "quotes", label: { en: "Quote History", ar: "سجل عروض السعر" }, icon: WalletCards },
  { key: "profile", label: { en: "Profile", ar: "الملف الشخصي" }, icon: User },
] as const;

type DashboardTab = (typeof navItems)[number]["key"];

export function DashboardShell() {
  const router = useRouter();
  const { locale, toggleLocale } = useLanguage();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isSyncing = useAuthStore((state) => state.isSyncing);
  const logout = useAuthStore((state) => state.logout);
  const syncProfile = useAuthStore((state) => state.syncProfile);
  const [activeTab, setActiveTab] = useState<DashboardTab>("quotes");

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
          <h1 className="mt-4 font-headline text-4xl text-white">
            {pickLocalized(locale, { en: "Redirecting to secure access", ar: "بنحولك لمنطقة الدخول الآمنة" })}
          </h1>
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
            <p className="mt-4 text-xs uppercase text-text-secondary">
              {pickLocalized(locale, { en: "Authorized Profile", ar: "ملف مشتري موثق" })}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              {user?.name ?? pickLocalized(locale, { en: "Syncing profile", ar: "جاري مزامنة الحساب" })}
            </h2>
            <p className="mt-1 break-all text-sm text-text-secondary">{user?.email ?? "..."}</p>
          </div>

          <nav className="mt-8 grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveTab(item.key)}
                  className={`flex h-12 items-center gap-3 border px-4 text-left text-sm font-semibold uppercase transition ${
                    activeTab === item.key
                      ? "border-accent-platinum bg-white/[0.08] text-white"
                      : "border-border-metallic bg-white/[0.02] text-text-primary hover:border-white"
                  }`}
                >
                  <Icon aria-hidden className="h-4 w-4 text-accent-platinum" strokeWidth={1.8} />
                  {pickLocalized(locale, item.label)}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={toggleLocale}
            className="mt-8 flex h-12 w-full items-center justify-center gap-3 border border-border-metallic text-sm font-semibold uppercase text-white hover:border-white"
          >
            <Globe2 aria-hidden className="h-4 w-4" strokeWidth={1.8} />
            {locale === "ar" ? "English" : "عربي"}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex h-12 w-full items-center justify-center gap-3 border border-border-metallic text-sm font-semibold uppercase text-white hover:border-white"
          >
            <LogOut aria-hidden className="h-4 w-4" strokeWidth={1.8} />
            {pickLocalized(locale, { en: "Logout", ar: "تسجيل الخروج" })}
          </button>
        </aside>

        <section className="px-5 py-10 md:px-10 lg:py-14">
          <div className="mb-10 border-b border-border-metallic pb-8">
            <p className="text-xs font-semibold uppercase text-accent-steel">
              {pickLocalized(locale, { en: "B2B Dashboard", ar: "لوحة المشتري" })}
            </p>
            <h1 className="mt-4 max-w-4xl font-headline text-5xl text-white md:text-7xl">
              {pickLocalized(locale, { en: "Procurement command room.", ar: "مكانك لمتابعة طلباتك مع الشبيني." })}
            </h1>
          </div>
          {activeTab === "quotes" ? <QuoteHistory /> : <ProfilePanel />}
        </section>
      </div>
    </main>
  );
}
