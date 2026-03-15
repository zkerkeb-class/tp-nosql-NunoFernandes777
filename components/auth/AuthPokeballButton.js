"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPokeballButton() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadAuthState() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await response.json();
        if (mounted) {
          setAuthenticated(Boolean(data?.authenticated));
        }
      } catch (_error) {
        if (mounted) setAuthenticated(false);
      }
    }

    loadAuthState();
    return () => {
      mounted = false;
    };
  }, []);

  const onClick = async () => {
    if (loading) return;
    if (!authenticated) {
      router.push("/connexion");
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setAuthenticated(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-changed"));
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      aria-label={authenticated ? "Logout" : "Connexion"}
      onClick={onClick}
      className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-gradient-to-b from-gray-900 from-0% via-gray-900 via-48% to-gray-100 to-52% shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 disabled:opacity-70"
      disabled={loading}
    >
      <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/90" />
      <span className="pointer-events-none absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-gray-950 shadow-inner" />
      <span className="relative z-10 inline-flex h-5 w-5 items-center justify-center text-white">
        {authenticated ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
            <path d="M14 17l-5-5 5-5" />
            <path d="M9 12h12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
          </svg>
        )}
      </span>
    </button>
  );
}
