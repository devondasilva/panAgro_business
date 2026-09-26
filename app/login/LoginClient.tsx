"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "investor" | "admin";

export default function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");

  const [mode, setMode] = useState<Mode>(next === "/admin" ? "admin" : "investor");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleInvestorSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/investor-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      router.push(next && next !== "/admin" ? next : "/dashboard");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdminSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] bg-[#F8FAF5] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8DC63F] mb-3">
          Connexion
        </p>
        <h1 className="text-4xl font-black tracking-tight text-[#1A2F15]">Accédez à votre espace</h1>

        <div className="mt-8 grid grid-cols-2 rounded-2xl border border-[#1A2F15]/15 overflow-hidden text-sm font-black uppercase tracking-widest">
          <button
            type="button"
            onClick={() => setMode("investor")}
            className={`py-3 transition-all ${
              mode === "investor" ? "bg-[#1A2F15] text-white" : "bg-white text-[#1A2F15]/50 hover:text-[#1A2F15]"
            }`}
          >
            Investisseur
          </button>
          <button
            type="button"
            onClick={() => setMode("admin")}
            className={`py-3 transition-all ${
              mode === "admin" ? "bg-[#1A2F15] text-white" : "bg-white text-[#1A2F15]/50 hover:text-[#1A2F15]"
            }`}
          >
            Administration
          </button>
        </div>

        {mode === "investor" ? (
          <form onSubmit={handleInvestorSubmit} className="mt-8 space-y-4">
            <p className="text-sm text-[#1A2F15]/60">
              Entrez vos coordonnées. Si c&rsquo;est votre première connexion,
              votre espace investisseur est créé automatiquement.
            </p>
            <input
              required
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border-2 border-[#1A2F15]/10 px-4 py-3 focus:border-[#8DC63F] outline-none transition-colors"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border-2 border-[#1A2F15]/10 px-4 py-3 focus:border-[#8DC63F] outline-none transition-colors"
            />
            <input
              required
              placeholder="Téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-2xl border-2 border-[#1A2F15]/10 px-4 py-3 focus:border-[#8DC63F] outline-none transition-colors"
            />
            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-2xl px-4 py-3">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#8DC63F] text-[#1A2F15] font-black uppercase tracking-widest py-3.5 hover:bg-[#1A2F15] hover:text-white transition-all disabled:opacity-60"
            >
              {loading ? "Connexion…" : "Accéder à mon espace"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleAdminSubmit} className="mt-8 space-y-4">
            <p className="text-sm text-[#1A2F15]/60">Accès réservé à l&rsquo;équipe Panagro.</p>
            <input
              required
              placeholder="Identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-2xl border-2 border-[#1A2F15]/10 px-4 py-3 focus:border-[#8DC63F] outline-none transition-colors"
            />
            <input
              required
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border-2 border-[#1A2F15]/10 px-4 py-3 focus:border-[#8DC63F] outline-none transition-colors"
            />
            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-2xl px-4 py-3">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#1A2F15] text-white font-black uppercase tracking-widest py-3.5 hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all disabled:opacity-60"
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
