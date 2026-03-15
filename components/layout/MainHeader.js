"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthPokeballButton from "@/components/auth/AuthPokeballButton";

export default function MainHeader() {
  const pathname = usePathname();
  const isJourneyPage = pathname === "/journey";
  const hideHeader =
    pathname === "/connexion" || pathname?.startsWith("/pokemon/");

  if (hideHeader) return null;

  return (
    <header className="relative z-20 mx-auto max-w-7xl px-4 pt-8 md:px-6 xl:px-0">
      <div className="mb-8 rounded-[2rem] border border-white/12 bg-[#0d1828] p-4 shadow-[0_18px_55px_rgba(3,10,22,0.22)] md:p-5">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[auto_auto_auto_1fr_auto_auto_auto]">
        <div className="md:justify-self-start justify-self-center">
          <Link
            href="/"
            aria-label="Home"
            className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-gradient-to-b from-slate-900 from-0% via-slate-900 via-48% to-slate-100 to-52% shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105"
          >
            <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/90" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-950 shadow-inner" />
            <span className="relative z-10 inline-flex h-4 w-4 items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 11l9-8 9 8" />
                <path d="M5 10v10h14V10" />
              </svg>
            </span>
          </Link>
        </div>
        <div className="md:justify-self-start justify-self-center">
          <Link
            href="/team"
            aria-label="My Team"
            className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-gradient-to-b from-slate-900 from-0% via-slate-900 via-48% to-slate-100 to-52% shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105"
          >
            <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/90" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-950 shadow-inner" />
            <span className="relative z-10 inline-flex h-4 w-4 items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="7" cy="8" r="2.2" />
                <circle cx="17" cy="8" r="2.2" />
                <path d="M3.5 18a3.5 3.5 0 0 1 7 0" />
                <path d="M13.5 18a3.5 3.5 0 0 1 7 0" />
              </svg>
            </span>
          </Link>
        </div>
        <div className="md:justify-self-start justify-self-center">
          <Link
            href="/journey"
            aria-label="Journey Tracker"
            className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-gradient-to-b from-slate-900 from-0% via-slate-900 via-48% to-slate-100 to-52% shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105"
          >
            <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/90" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-950 shadow-inner" />
            <span className="relative z-10 inline-flex h-4 w-4 items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 20l6-6 4 4 8-8" />
                <circle cx="3" cy="20" r="1" fill="currentColor" stroke="none" />
                <circle cx="9" cy="14" r="1" fill="currentColor" stroke="none" />
                <circle cx="13" cy="18" r="1" fill="currentColor" stroke="none" />
                <circle cx="21" cy="10" r="1" fill="currentColor" stroke="none" />
              </svg>
            </span>
          </Link>
        </div>
        <div className="text-center">
          <div className="bg-white/15 backdrop-blur-xl rounded-full px-8 py-4 border border-white/35 shadow-[0_8px_30px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.35)]">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-gray-500 to-white bg-clip-text text-transparent mb-2">
              {isJourneyPage ? "JOURNEY TRACK" : "Pokedex"}
            </h1>
            {!isJourneyPage && (
              <p className="text-lg md:text-xl text-gray-300 font-semibold">
                Discover all Pokemon
              </p>
            )}
          </div>
        </div>
        <div className="md:justify-self-end justify-self-center">
          <Link
            href="/type-chart"
            aria-label="Type Chart"
            className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-gradient-to-b from-slate-900 from-0% via-slate-900 via-48% to-slate-100 to-52% shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105"
          >
            <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/90" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-950 shadow-inner" />
            <span className="relative z-10 inline-flex h-4 w-4 items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </span>
          </Link>
        </div>
        <div className="md:justify-self-end justify-self-center">
          <Link
            href="/forum"
            aria-label="Forum"
            className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-gradient-to-b from-slate-900 from-0% via-slate-900 via-48% to-slate-100 to-52% shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105"
          >
            <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/90" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-950 shadow-inner" />
            <span className="relative z-10 inline-flex h-4 w-4 items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 5h16v10H8l-4 4z" />
              </svg>
            </span>
          </Link>
        </div>
        <div className="md:justify-self-end justify-self-center">
          <AuthPokeballButton />
        </div>
        </div>
      </div>
    </header>
  );
}
