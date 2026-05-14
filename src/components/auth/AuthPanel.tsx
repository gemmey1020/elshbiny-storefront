"use client";

import { type FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";

type AuthMode = "login" | "register";

export function AuthPanel({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const isAuthenticating = useAuthStore((state) => state.isAuthenticating);
  const authError = useAuthStore((state) => state.error);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    try {
      if (mode === "register") {
        await register(name, email, password);
      } else {
        await login(email, password);
      }

      router.replace("/dashboard");
    } catch {
      setFormError(mode === "register" ? "Unable to create the B2B profile." : "Unable to authorize this profile.");
    }
  }

  const title = mode === "register" ? "Create B2B access" : "B2B Portal";
  const subtitle =
    mode === "register"
      ? "Register a buying profile for quote history and gated pricing."
      : "Authorize your corporate profile and return to your quote history.";

  return (
    <main className="grid min-h-screen place-items-center px-5 py-16 text-text-primary">
      <section className="grid w-full max-w-5xl overflow-hidden border border-border-metallic lg:grid-cols-[0.9fr_1fr]">
        <div className="hidden bg-white/[0.02] p-10 lg:block">
          <p className="text-xs font-semibold uppercase text-accent-steel">Elshbiny B2B</p>
          <h1 className="mt-4 font-headline text-6xl text-white">Secure quote workspace.</h1>
          <p className="mt-6 text-text-secondary">
            Bearer-token Sanctum auth is the verified backend contract for this wave. Cookie SPA auth stays documented as a non-blocking divergence.
          </p>
        </div>

        <div className="glass-panel p-6 md:p-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase text-accent-platinum">{mode === "register" ? "New buyer" : "Returning buyer"}</p>
            <h2 className="mt-3 font-headline text-5xl text-white">{title}</h2>
            <p className="mt-4 text-sm text-text-secondary">{subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" ? (
              <label className="block">
                <span className="text-xs font-semibold uppercase text-text-secondary">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="mt-2 h-12 w-full border border-border-metallic bg-white/[0.03] px-4 text-white outline-none transition focus:border-accent-white"
                  autoComplete="name"
                />
              </label>
            ) : null}

            <label className="block">
              <span className="text-xs font-semibold uppercase text-text-secondary">Corporate Email</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                className="mt-2 h-12 w-full border border-border-metallic bg-white/[0.03] px-4 text-white outline-none transition focus:border-accent-white"
                autoComplete="email"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase text-text-secondary">Security Password</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                type="password"
                className="mt-2 h-12 w-full border border-border-metallic bg-white/[0.03] px-4 text-white outline-none transition focus:border-accent-white"
                autoComplete={mode === "register" ? "new-password" : "current-password"}
              />
            </label>

            {formError || authError ? <p className="border border-border-metallic p-3 text-sm text-text-secondary">{formError ?? authError}</p> : null}

            <Button type="submit" icon={mode === "register" ? UserPlus : LockKeyhole} disabled={isAuthenticating} className="w-full">
              {isAuthenticating ? "Authorizing" : mode === "register" ? "Create Profile" : "Authorize Access"}
            </Button>
          </form>

          <div className="mt-6 border-t border-border-metallic pt-6 text-sm text-text-secondary">
            {mode === "register" ? (
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold uppercase hover:text-white">
                Already registered
                <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            ) : (
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold uppercase hover:text-white">
                Create B2B access
                <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
