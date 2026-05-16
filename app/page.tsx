export default function Home() {
  const cards = [
    {
      title: "Midnight Dreamer",
      text: "You don't listen at night — you feel. Every track is a mood you almost texted someone.",
      gradient: "from-violet-500 to-cyan-500",
      glow: "group-hover:shadow-violet-500/30",
    },
    {
      title: "Hype Beast",
      text: "Your playlist doesn't warm up. It arrives. Main-character energy, zero apology.",
      gradient: "from-pink-500 to-orange-400",
      glow: "group-hover:shadow-pink-500/30",
    },
    {
      title: "Indie Philosopher",
      text: "You hear the lyric before the beat. Rainy windows, deep thoughts, immaculate taste.",
      gradient: "from-emerald-400 to-teal-500",
      glow: "group-hover:shadow-emerald-500/30",
    },
  ];

  const steps = [
    "Connect your Spotify",
    "Analyze your music DNA",
    "Share your alter ego",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white selection:bg-fuchsia-500/30">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.2),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(139,92,246,0.06),transparent)]" />

      <div className="pointer-events-none absolute top-0 left-0 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute top-32 right-[-4rem] h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px] animate-pulse [animation-delay:1.5s]" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-violet-500/20 blur-[120px] animate-pulse [animation-delay:2s]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[100px] animate-pulse [animation-delay:3s]" />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816]/80" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 py-10">
        {/* Navbar */}
        <header className="mb-24 flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-white via-fuchsia-100 to-cyan-100 bg-clip-text text-2xl font-black tracking-wide text-transparent">
            VibePrint
          </h1>

          <button className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-zinc-200 backdrop-blur-sm transition-all duration-300 hover:border-fuchsia-400/30 hover:bg-white/10 hover:text-white hover:shadow-[0_0_28px_rgba(217,70,239,0.15)]">
            Connect Spotify
          </button>
        </header>

        {/* Hero */}
        <section className="relative mb-28 text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-cyan-500/20 blur-[90px]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-full max-w-3xl -translate-x-1/2 bg-gradient-to-b from-fuchsia-500/10 to-transparent blur-2xl" />

          <div className="relative">
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-5 py-2 text-[11px] uppercase tracking-[0.28em] text-fuchsia-200 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
              </span>
              Your playlist has been talking about you
            </p>

            <h2 className="mx-auto mb-6 max-w-5xl font-serif text-5xl font-black leading-[1.02] tracking-tight md:text-7xl md:leading-[0.98]">
              <span className="block text-white/95">The version of you</span>
              <span className="mt-2 block bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
                only your music knows.
              </span>
            </h2>

            <p className="mx-auto mb-4 max-w-xl text-base font-medium tracking-wide text-fuchsia-200/80 md:text-lg">
              Discover the personality hiding in your listening history.
            </p>

            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl md:leading-relaxed">
              VibePrint reads your Spotify like a diary — then turns it into a
              cinematic identity card you&apos;ll actually want to post. Archetypes,
              mood aura, genre DNA, and an alter ego built for your feed.
            </p>

            <div className="flex flex-col items-center gap-5">
              <button
                type="button"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 px-11 py-4 text-lg font-semibold shadow-[0_0_40px_rgba(217,70,239,0.45)] ring-1 ring-white/10 transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_80px_rgba(217,70,239,0.7)] hover:ring-white/25 active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/35 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="relative flex items-center justify-center gap-2.5">
                  Analyze My Music DNA
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </button>

              <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
                Free · Under a minute · Built to be screenshotted
              </p>
            </div>
          </div>
        </section>

        {/* Music Aura Visualization */}
        <div
          aria-hidden
          className="relative z-0 mx-auto -mt-4 mb-12 flex h-52 w-full max-w-4xl items-center justify-center md:-mt-8 md:mb-16 md:h-64"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="absolute h-56 w-56 rounded-full border border-fuchsia-500/15 bg-gradient-to-tr from-fuchsia-500/10 via-transparent to-cyan-500/10 shadow-[0_0_80px_rgba(217,70,239,0.15)] animate-[spin_30s_linear_infinite] md:h-64 md:w-64" />
            <div className="absolute h-48 w-48 rounded-full border border-dashed border-violet-400/20 animate-[spin_24s_linear_infinite_reverse] md:h-56 md:w-56" />
            <div className="absolute h-40 w-40 rounded-full border border-cyan-400/15 opacity-60 animate-[spin_18s_linear_infinite] md:h-48 md:w-48" />

            <div className="absolute h-36 w-36 rounded-full bg-gradient-to-br from-fuchsia-500/35 via-violet-600/25 to-cyan-500/35 blur-2xl animate-pulse md:h-40 md:w-40" />

            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#1a0f2e] via-[#140a22] to-[#0a1528] shadow-[0_0_50px_rgba(139,92,246,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] md:h-36 md:w-36">
              <div className="absolute inset-2 rounded-full border border-white/8" />
              <div className="absolute inset-4 rounded-full border border-white/6" />
              <div className="absolute inset-6 rounded-full border border-white/5" />
              <div className="absolute inset-8 rounded-full border border-white/4" />
              <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-fuchsia-300 to-cyan-300 shadow-[0_0_16px_rgba(217,70,239,0.9)] animate-pulse" />
            </div>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-end justify-center gap-1 md:bottom-8 md:gap-1.5">
              <div className="w-1 rounded-full bg-gradient-to-t from-fuchsia-500/20 to-fuchsia-400/80 animate-pulse [animation-delay:0ms] h-7 md:h-8 md:w-1.5" />
              <div className="w-1 rounded-full bg-gradient-to-t from-violet-500/20 to-violet-400/80 animate-pulse [animation-delay:150ms] h-11 md:h-12 md:w-1.5" />
              <div className="w-1 rounded-full bg-gradient-to-t from-fuchsia-500/20 to-fuchsia-300/90 animate-pulse [animation-delay:300ms] h-14 md:h-[3.75rem] md:w-1.5" />
              <div className="w-1 rounded-full bg-gradient-to-t from-cyan-500/20 to-cyan-400/80 animate-pulse [animation-delay:450ms] h-9 md:h-10 md:w-1.5" />
              <div className="w-1 rounded-full bg-gradient-to-t from-violet-500/20 to-violet-300/90 animate-pulse [animation-delay:600ms] h-12 md:h-[3.25rem] md:w-1.5" />
              <div className="w-1 rounded-full bg-gradient-to-t from-fuchsia-500/20 to-cyan-400/80 animate-pulse [animation-delay:750ms] h-8 md:h-9 md:w-1.5" />
              <div className="w-1 rounded-full bg-gradient-to-t from-cyan-500/20 to-cyan-300/90 animate-pulse [animation-delay:900ms] h-11 md:h-12 md:w-1.5" />
            </div>

            <div className="absolute left-[12%] top-1/2 h-1.5 w-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent opacity-60 animate-pulse [animation-delay:200ms] md:w-10" />
            <div className="absolute right-[12%] top-1/2 h-1.5 w-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-60 animate-pulse [animation-delay:500ms] md:w-10" />
          </div>
        </div>

        {/* Music Personality Preview Card */}
        <section className="relative mx-auto mb-32 w-full max-w-lg">
          <p className="mb-5 text-center text-xs uppercase tracking-[0.25em] text-white/40">
            Preview — this is what hits the group chat
          </p>

          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 opacity-80 blur-md transition-opacity duration-500" />

          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/50 via-fuchsia-500/30 to-cyan-500/40 opacity-60 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_36px_110px_rgba(139,92,246,0.4)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/30 blur-3xl transition-opacity duration-500" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative mb-6 flex items-start justify-between">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
                  Your sonic identity
                </p>

                <h3 className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-3xl font-black text-transparent">
                  Midnight Dreamer
                </h3>
              </div>

              <div className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200 backdrop-blur-sm">
                Share ready
              </div>
            </div>

            <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/40 via-fuchsia-600/20 to-cyan-600/30 p-4 transition-colors duration-300 hover:border-white/20">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
                Aura
              </p>

              <p className="text-lg font-semibold leading-snug text-white">
                Emotional Synthwave Soul
              </p>
            </div>

            <div className="mb-6">
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/50">
                Genres
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-violet-400/30 bg-violet-500/20 px-3 py-1 text-xs text-violet-100 transition-colors duration-300 hover:bg-violet-500/30">
                  Synthwave
                </span>

                <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/20 px-3 py-1 text-xs text-fuchsia-100 transition-colors duration-300 hover:bg-fuchsia-500/30">
                  Indie Pop
                </span>

                <span className="rounded-full border border-cyan-400/30 bg-cyan-500/20 px-3 py-1 text-xs text-cyan-100 transition-colors duration-300 hover:bg-cyan-500/30">
                  Ambient
                </span>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 transition-all duration-300 hover:border-fuchsia-400/20 hover:bg-white/[0.08]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Compatibility
                </p>

                <p className="mt-1 bg-gradient-to-r from-fuchsia-300 to-violet-300 bg-clip-text text-4xl font-black text-transparent">
                  92%
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.08]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Listening Mood
                </p>

                <p className="mt-2 text-sm font-semibold leading-snug text-cyan-200">
                  Late-night introspection
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-5">
              {[
                {
                  label: "Energy",
                  value: "68%",
                  width: "68%",
                  gradient: "from-fuchsia-500 to-violet-500",
                },
                {
                  label: "Emotion",
                  value: "91%",
                  width: "91%",
                  gradient: "from-violet-500 to-cyan-500",
                },
                {
                  label: "Danceability",
                  value: "42%",
                  width: "42%",
                  gradient: "from-cyan-500 to-fuchsia-500",
                },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="mb-2 flex justify-between text-xs">
                    <p className="text-white/60">{stat.label}</p>
                    <p className="font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-700`}
                      style={{ width: stat.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personality Cards */}
        <section className="mb-28">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-fuchsia-300/80">
              Archetype gallery
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Which one is{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                actually you?
              </span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-white/25 hover:shadow-2xl ${card.glow}`}
              >
                <div
                  className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${card.gradient} opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-50 group-hover:blur-3xl`}
                />

                <div
                  className={`relative mb-6 h-36 overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} shadow-inner transition-transform duration-500 group-hover:scale-[1.03]`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />
                </div>

                <h3 className="relative mb-3 text-2xl font-bold transition-colors duration-300 group-hover:text-white">
                  {card.title}
                </h3>

                <p className="relative text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-28 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-colors duration-300 hover:border-white/15 md:grid-cols-3">
          <div className="transition-all duration-300 hover:scale-105">
            <h3 className="bg-gradient-to-b from-fuchsia-300 to-fuchsia-500 bg-clip-text text-5xl font-black text-transparent">
              12+
            </h3>

            <p className="mt-2 text-zinc-400">
              Archetypes that feel uncomfortably accurate
            </p>
          </div>

          <div className="transition-all duration-300 hover:scale-105">
            <h3 className="bg-gradient-to-b from-cyan-300 to-cyan-500 bg-clip-text text-5xl font-black text-transparent">
              100%
            </h3>

            <p className="mt-2 text-zinc-400">
              Built for stories, feeds, and bragging rights
            </p>
          </div>

          <div className="transition-all duration-300 hover:scale-105">
            <h3 className="bg-gradient-to-b from-violet-300 to-violet-500 bg-clip-text text-5xl font-black text-transparent">
              ∞
            </h3>

            <p className="mt-2 text-zinc-400">Vibes you didn&apos;t know you had</p>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-28">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-cyan-300/80">
              Three steps to your alter ego
            </p>
            <h2 className="text-4xl font-bold tracking-tight">
              How It Works
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="group rounded-2xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.08] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="mb-4 bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-5xl font-black text-transparent transition-transform duration-500 group-hover:scale-110">
                  0{index + 1}
                </div>

                <p className="text-lg font-medium text-zinc-100 transition-colors duration-300 group-hover:text-white">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-10 text-center">
          <p className="text-sm text-zinc-500">
            Built for music lovers, identity explorers, and everyone who
            screenshots their Wrapped.
          </p>
        </footer>
      </div>
    </main>
  );
}
