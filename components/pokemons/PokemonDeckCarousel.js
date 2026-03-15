"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function getArtworkUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function getWrappedIndex(index, total) {
  return (index + total) % total;
}

export default function PokemonDeckCarousel({ cards = [], sectionTitle, sectionEyebrow }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(1);
  const [animationCycle, setAnimationCycle] = useState(0);

  useEffect(() => {
    if (cards.length <= 1) return undefined;

    const timeoutId = window.setTimeout(() => {
      setAnimationDirection(1);
      setIsAnimating(true);
      setAnimationCycle((current) => current + 1);
      setActiveIndex((current) => (current + 1) % cards.length);
    }, 5400);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, cards.length]);

  useEffect(() => {
    if (!isAnimating) return undefined;
    const timeoutId = window.setTimeout(() => {
      setIsAnimating(false);
    }, 1080);
    return () => window.clearTimeout(timeoutId);
  }, [isAnimating]);

  if (cards.length === 0) return null;

  const activeCard = cards[activeIndex] || null;
  const nextCard = cards[getWrappedIndex(activeIndex + 1, cards.length)] || activeCard;
  const cardMotionClass =
    animationCycle === 0 ? "" : animationDirection > 0 ? "deck-panel-enter-forward" : "deck-panel-enter-backward";
  const copyMotionClass =
    animationCycle === 0 ? "" : animationDirection > 0 ? "deck-copy-enter-forward" : "deck-copy-enter-backward";
  const spriteMotionClass =
    animationCycle === 0 ? "" : animationDirection > 0 ? "deck-sprite-enter-forward" : "deck-sprite-enter-backward";
  const deckLayerCount = Math.min(Math.max(cards.length + 3, 5), 7);
  const deckLayers = Array.from({ length: deckLayerCount }, (_, index) => deckLayerCount - index);

  const showPrevious = () => {
    if (cards.length <= 1) return;
    setAnimationDirection(-1);
    setIsAnimating(true);
    setAnimationCycle((current) => current + 1);
    setActiveIndex((current) => (current - 1 + cards.length) % cards.length);
  };

  const showNext = () => {
    if (cards.length <= 1) return;
    setAnimationDirection(1);
    setIsAnimating(true);
    setAnimationCycle((current) => current + 1);
    setActiveIndex((current) => (current + 1) % cards.length);
  };

  const deckOnRight = activeCard?.deckSide !== "left";
  return (
    <section
      className={`relative overflow-hidden rounded-[2.6rem] border border-white/12 px-5 py-6 shadow-[0_34px_100px_rgba(2,8,20,0.32)] md:px-10 md:py-8 ${activeCard?.sectionClass}`}
    >
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_42%)] opacity-60`} />
      <div className="absolute inset-x-[8%] top-[-10%] h-56 rounded-full bg-white/10 blur-3xl" />
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

      <div className={`relative z-10 grid min-h-[39rem] items-center gap-8 ${deckOnRight ? "xl:grid-cols-[0.82fr_1.18fr]" : "xl:grid-cols-[1.18fr_0.82fr]"}`}>
        <div
          key={`copy-${activeCard?.id}-${animationCycle}`}
          className={`space-y-6 ${deckOnRight ? "order-1" : "order-2 xl:order-1"} ${copyMotionClass}`}
        >
          <div className="inline-flex rounded-full border border-white/16 bg-black/18 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/80">
            {activeCard?.label}
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.34em] text-white/65">
              #{String(activeCard?.id || 0).padStart(3, "0")}
            </div>
            <h2 className="mt-2 text-5xl font-black uppercase tracking-tight text-white md:text-7xl xl:text-[5.5rem]">
              {activeCard?.name}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/84 md:text-lg">
              {activeCard?.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {activeCard?.stats?.map((item) => (
              <div key={item.label} className="rounded-[1.4rem] border border-white/14 bg-black/18 px-4 py-4 backdrop-blur-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">{item.label}</div>
                <div className="mt-2 text-2xl font-black text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`relative h-[31rem] ${deckOnRight ? "order-2" : "order-1 xl:order-2"}`}>
          <div className={`absolute inset-y-2 ${deckOnRight ? "right-[2%]" : "left-[2%]"} w-[92%] [perspective:2200px]`}>
            {deckLayers.map((depth) => {
              const layerCard = cards[getWrappedIndex(activeIndex + depth, cards.length)] || nextCard;
              return (
                <div
                  key={depth}
                  className={`pointer-events-none absolute top-1/2 h-[23rem] w-[82%] -translate-y-1/2 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] shadow-[0_22px_52px_rgba(0,0,0,0.22)] deck-layer-transition ${
                    deckOnRight ? "right-0 origin-right" : "left-0 origin-left"
                  }`}
                  style={{
                    transform: `translateX(${deckOnRight ? depth * 26 : depth * -26}px) rotateY(${deckOnRight ? depth * -18 : depth * 18}deg) scale(${0.98 - depth * 0.035})`,
                    opacity: Math.max(0.16, 0.54 - depth * 0.055),
                    filter: `blur(${Math.max(0, depth - 1) * 0.35}px) saturate(${Math.max(0.58, 0.98 - depth * 0.055)}) brightness(${Math.max(0.76, 0.98 - depth * 0.04)})`,
                    zIndex: 12 - depth,
                  }}
                >
                  <div
                    className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${layerCard?.accent || activeCard?.accent}`}
                    style={{ opacity: Math.max(0.18, 0.42 - depth * 0.035) }}
                  />
                  <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(180deg,rgba(10,14,24,0.02),rgba(10,14,24,0.18))]" />
                </div>
              );
            })}

            <div
              key={`card-${activeCard?.id}-${animationCycle}`}
              className={`absolute top-1/2 isolate h-[25rem] w-full -translate-y-1/2 overflow-hidden rounded-[2.2rem] border border-white/24 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.14))] shadow-[0_40px_95px_rgba(0,0,0,0.34)] backdrop-blur-[14px] deck-main-card-transition ${
                deckOnRight ? "right-0 origin-right" : "left-0 origin-left"
              } ${cardMotionClass}`}
            >
              <div className="absolute inset-0 bg-[#0b1220]/16 backdrop-blur-[10px]" />
              <div className={`absolute inset-0 bg-gradient-to-br ${activeCard?.accent} opacity-76`} />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(15,23,42,0.06)_40%,rgba(15,23,42,0.22)_100%)]" />
              <div className="absolute inset-[1px] rounded-[2rem] border border-white/10" />
              <div className="relative z-10 flex h-full items-center justify-center px-6 py-6 md:px-10">
                <div className="relative flex h-[18rem] w-full max-w-[30rem] items-center justify-center md:h-[21rem] xl:h-[22rem]">
                  <div className="absolute inset-x-10 inset-y-6 rounded-full bg-white/14 blur-3xl" />
                  <div className={`relative z-10 flex items-center justify-center ${spriteMotionClass}`}>
                    <Image
                      src={getArtworkUrl(activeCard?.id)}
                      alt={activeCard?.name || "Pokemon"}
                      width={720}
                      height={720}
                      className="relative z-10 h-auto w-[17rem] object-contain drop-shadow-[0_40px_36px_rgba(0,0,0,0.52)] md:w-[20rem] xl:w-[24rem]"
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
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.28em] text-white/68">
            {String(activeIndex + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.22em] text-white/56">
            Next card: {nextCard?.name}
          </div>
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
