import KantoMapExplorer from "@/components/journey/KantoMapExplorer";

export default function JourneyMapPage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-16 text-white">
      <div className="mx-auto w-full max-w-7xl">
        <section className="mb-6 rounded-3xl border border-white/25 bg-white/10 p-5 backdrop-blur-xl">
          <h1 className="text-3xl font-black uppercase tracking-wide md:text-4xl">Kanto Interactive Map</h1>
          <p className="mt-2 text-sm text-white/80">
            Select any zone on the map to inspect landmarks and version-specific wild encounters.
          </p>
        </section>

        <KantoMapExplorer />
      </div>
    </main>
  );
}
