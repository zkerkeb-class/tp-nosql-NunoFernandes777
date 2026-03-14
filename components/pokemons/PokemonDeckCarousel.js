"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function getSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export default function PokemonDeckCarousel({ cards = [], sectionTitle, sectionEyebrow }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (cards.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setIsAnimating(true);
      setActiveIndex((current) => (current + 1) % cards.length);
    }, 3600);

    return () => window.clearInterval(intervalId);
  }, [cards.length]);

  useEffect(() => {
    if (!isAnimating) return undefined;
    const timeoutId = window.setTimeout(() => {
      setIsAnimating(false);
    }, 820);
    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, isAnimating]);

  const activeCard = cards[activeIndex] || null;
  const showPrevious = () => {
    setIsAnimating(true);
    setActiveIndex((current) => (current - 1 + cards.length) % cards.length);
  };

  const showNext = () => {
    setIsAnimating(true);
    setActiveIndex((current) => (current + 1) % cards.length);
  };

  if (cards.length === 0) return null;

  const deckOnRight = activeCard?.deckSide !== "left";
  return (
    <section
      className={`relative overflow-hidden rounded-[2.4rem] border border-white/12 px-6 py-8 shadow-[0_30px_90px_rgba(2,8,20,0.26)] md:px-10 md:py-10 ${activeCard?.sectionClass}`}
    >
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_42%)] opacity-60`} />
      <div
        className={`absolute inset-y-0 ${deckOnRight ? "right-0" : "left-0"} w-1/2`}
        style={{
          background: deckOnRight
            ? "linear-gradient(270deg, rgba(0,0,0,0.28), transparent)"
            : "linear-gradient(90deg, rgba(0,0,0,0.28), transparent)",
        }}
      />

      <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">
            {sectionEyebrow || "Type Feature"}
          </div>
          <div className="mt-1 text-3xl font-black uppercase tracking-tight text-white">
            {sectionTitle || activeCard?.headline}
          </div>
        </div>
        <div className="rounded-full border border-white/18 bg-black/18 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/85">
          {activeCard?.type}
        </div>
      </div>

      <div className={`relative z-10 grid min-h-[38rem] items-center gap-8 ${deckOnRight ? "xl:grid-cols-[0.9fr_1.1fr]" : "xl:grid-cols-[1.1fr_0.9fr]"}`}>
        <div className={`space-y-6 ${deckOnRight ? "order-1" : "order-2 xl:order-1"}`}>
          <div className="inline-flex rounded-full border border-white/16 bg-black/18 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/80">
            {activeCard?.label}
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.34em] text-white/65">
              #{String(activeCard?.id || 0).padStart(3, "0")}
            </div>
            <h2 className="mt-2 text-5xl font-black uppercase tracking-tight text-white md:text-7xl">
              {activeCard?.name}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/84 md:text-lg">
              {activeCard?.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {activeCard?.stats?.map((item) => (
              <div key={item.label} className="rounded-[1.4rem] border border-white/14 bg-black/16 px-4 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">{item.label}</div>
                <div className="mt-2 text-2xl font-black text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`relative h-[30rem] ${deckOnRight ? "order-2" : "order-1 xl:order-2"}`}>
          <div className={`absolute inset-y-3 ${deckOnRight ? "right-[4%]" : "left-[4%]"} w-[78%] [perspective:1800px]`}>
            {[2, 1, 0].map((depth) => (
              <div
                key={depth}
                className={`absolute top-1/2 h-[24rem] w-[88%] -translate-y-1/2 rounded-[2rem] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.08))] shadow-[0_26px_60px_rgba(0,0,0,0.28)] deck-layer-transition ${
                  deckOnRight ? "right-0 origin-right" : "left-0 origin-left"
                }`}
                style={{
                  transform: `translateX(${deckOnRight ? depth * 18 : depth * -18}px) rotateY(${deckOnRight ? depth * -16 : depth * 16}deg) scale(${1 - depth * 0.055})`,
                  opacity: 1 - depth * 0.18,
                  zIndex: 10 - depth,
                }}
              >
                <div
                  className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${activeCard?.accent}`}
                  style={{ opacity: depth === 0 ? 0.96 : 0.62 }}
                />
              </div>
            ))}

            <div
              className={`absolute top-1/2 h-[26rem] w-full -translate-y-1/2 overflow-hidden rounded-[2.2rem] border border-white/24 bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0.08))] shadow-[0_36px_90px_rgba(0,0,0,0.32)] deck-main-card-transition ${
                deckOnRight ? "right-0 origin-right" : "left-0 origin-left"
              }`}
              style={{
                transform: `translateX(${isAnimating ? (deckOnRight ? "8px" : "-8px") : "0"}) rotateY(0deg) scale(${isAnimating ? 1.01 : 1})`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${activeCard?.accent} opacity-100`} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
              <div className="relative z-10 grid h-full items-center gap-6 px-6 py-6 md:grid-cols-[0.82fr_1.18fr] md:px-8">
                <div className="self-end md:self-center">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/72">{activeCard?.type}</div>
                  <div className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">{activeCard?.name}</div>
                  <div className="mt-4 text-sm leading-6 text-white/78">
                    {activeCard?.label}
                  </div>
                </div>
                <div className="flex h-full items-center justify-center md:justify-end">
                  <div className="relative flex h-[17rem] w-full max-w-[24rem] items-center justify-center md:h-[20rem]">
                    <div className="absolute inset-6 rounded-full bg-white/12 blur-2xl" />
                    <Image
                      src={getSpriteUrl(activeCard?.id)}
                      alt={activeCard?.name || "Pokemon"}
                      width={380}
                      height={380}
                      className={`relative z-10 h-auto w-[13rem] object-contain drop-shadow-[0_28px_26px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-[18rem] ${isAnimating ? "scale-[1.04] translate-y-[-4px]" : "scale-100 translate-y-0"}`}
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between gap-4">
        <div className="text-sm font-semibold uppercase tracking-[0.28em] text-white/68">
          {String(activeIndex + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={showPrevious}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition-colors hover:bg-white/16"
            aria-label="Previous Pokemon"
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={showNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition-colors hover:bg-white/16"
            aria-label="Next Pokemon"
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
}
