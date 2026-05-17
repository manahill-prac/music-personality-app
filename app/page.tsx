import { SpotifyConnectButton } from "@/components/spotify-connect-button"

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
  ]

  const steps = [
    "Connect your Spotify",
    "Analyze your music DNA",
    "Share your alter ego",
  ]

  const previewStats = [
    { label: "Energy",       value: "68%", width: "68%", gradient: "from-fuchsia-500 to-violet-500" },
    { label: "Emotion",      value: "91%", width: "91%", gradient: "from-violet-500 to-cyan-500" },
    { label: "Danceability", value: "42%", width: "42%", gradient: "from-cyan-500 to-fuchsia-500" },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white selection:bg-fuchsia-500/30">

      {/* ── Background atmosphere ── */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.13),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.09),transparent_38%)]" />
      <div className="pointer-events-none absolute top-0 left-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-32 right-[-4rem] h-96 w-96 rounded-full bg-cyan-500/12 blur-[140px] animate-pulse [animation-delay:1.5s]" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-violet-500/14 blur-[130px] animate-pulse [animation-delay:2s]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* ── Musical DNA — soft vinyl ring field, desktop only ── */}
      <div className="pointer-events-none absolute right-[2%] top-[4%] hidden lg:block" aria-hidden>
        <div className="relative h-[420px] w-[420px]">
          <div className="absolute inset-0       rounded-full border border-fuchsia-300/[0.055] animate-breathe-slow" />
          <div className="absolute inset-[30px]  rounded-full border border-violet-300/[0.050]  animate-breathe"      style={{ animationDelay: '0.7s',  animationDuration: '9s'  }} />
          <div className="absolute inset-[60px]  rounded-full border border-fuchsia-200/[0.045] animate-breathe-slow" style={{ animationDelay: '1.4s'                           }} />
          <div className="absolute inset-[90px]  rounded-full border border-violet-200/[0.040]  animate-breathe"      style={{ animationDelay: '0.3s',  animationDuration: '8s'  }} />
          <div className="absolute inset-[120px] rounded-full border border-cyan-300/[0.035]   animate-breathe-slow" style={{ animationDelay: '2.1s'                           }} />
          <div className="absolute inset-[150px] rounded-full border border-fuchsia-200/[0.030] animate-breathe"      style={{ animationDelay: '1.0s',  animationDuration: '10s' }} />
          <div className="absolute inset-[180px] rounded-full border border-violet-200/[0.025] animate-breathe-slow" style={{ animationDelay: '0.5s'                           }} />
          {/* Spectral centre — soft glow core */}
          <div className="absolute inset-[200px] rounded-full bg-gradient-to-br from-fuchsia-500/[0.07] to-violet-500/[0.04] blur-2xl animate-breathe" style={{ animationDelay: '0.9s' }} />
          <div className="absolute inset-[206px] rounded-full border border-white/[0.03]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">

        {/* ── Navigation ── */}
        <nav className="mb-14 flex items-center justify-between sm:mb-20">
          <div className="text-lg font-bold tracking-[0.06em] text-white sm:text-xl">
            VibePrint
          </div>
          <SpotifyConnectButton
            variant="nav"
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_40px_rgba(139,92,246,0.12)] sm:px-6 sm:py-3 sm:text-sm"
          >
            Connect Spotify
          </SpotifyConnectButton>
        </nav>

        {/* ── Hero ── */}
        <section className="mb-20 text-center sm:mb-36">
          <div className="mx-auto max-w-5xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/[0.08] px-4 py-1.5 text-[9px] uppercase tracking-[0.28em] text-fuchsia-200/70 backdrop-blur-sm sm:mb-8 sm:gap-3 sm:px-5 sm:py-2 sm:text-[11px] sm:tracking-[0.32em]">
              <div className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.8)] sm:h-2 sm:w-2" />
              YOUR PLAYLIST HAS BEEN TALKING ABOUT YOU
            </div>

            <h1 className="mx-auto mb-6 max-w-5xl text-[2.75rem] font-black leading-[0.92] tracking-tight text-white sm:mb-8 sm:text-6xl md:text-8xl">
              The version of you
              <br />
              <span className="bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
                only your music knows.
              </span>
            </h1>

            <p className="mb-4 text-base font-medium text-white/60 sm:mb-6 sm:text-2xl">
              Discover the personality hiding in your listening history.
            </p>

            <p className="mx-auto mb-8 max-w-2xl text-sm leading-[1.8] text-zinc-400/80 sm:mb-12 sm:text-base">
              VibePrint reads your Spotify like a diary — then turns it into a cinematic identity card
              you&apos;ll actually want to post. Archetypes, mood aura, genre DNA, and an alter ego built for your feed.
            </p>

            <SpotifyConnectButton
              variant="hero"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-[0_0_60px_rgba(217,70,239,0.35)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_90px_rgba(217,70,239,0.5)] sm:px-10 sm:py-5 sm:text-lg"
            >
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                Analyze My Music DNA
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] transition-transform duration-1000 group-hover:translate-x-[120%]" />
            </SpotifyConnectButton>

          </div>
        </section>

        {/* ── Preview card ── */}
        <section className="mb-20 sm:mb-32">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
              PREVIEW — THIS IS WHAT HITS THE GROUP CHAT
            </p>
          </div>

          <div className="relative mx-auto flex max-w-5xl items-center justify-center">

            {/* Aura orb — desktop only */}
            <div className="absolute left-[8%] top-1/2 hidden -translate-y-1/2 lg:block">
              <div className="relative h-72 w-72">
                <div className="absolute inset-0 rounded-full border border-fuchsia-500/10" />
                <div className="absolute inset-8 rounded-full border border-violet-500/10" />
                <div className="absolute inset-16 rounded-full border border-cyan-500/10" />
                <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#170c28] to-[#090611] shadow-[0_0_35px_rgba(217,70,239,0.3),0_0_70px_rgba(168,85,247,0.1)]">
                  <div className="absolute inset-5 rounded-full border border-white/5" />
                  <div className="absolute inset-9 rounded-full border border-white/5" />
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-fuchsia-200 to-violet-300" />
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0a1a]/90 p-5 shadow-[0_0_120px_rgba(139,92,246,0.16)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8">
              <div className="absolute inset-0 opacity-60">
                <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-b from-fuchsia-400/25 via-violet-400/12 to-cyan-400/8 blur-2xl sm:w-32" />
              </div>

              <div className="relative z-10">

                {/* Header */}
                <div className="mb-5 flex items-start justify-between sm:mb-8">
                  <div>
                    <p className="mb-2 text-[8px] uppercase tracking-[0.28em] text-white/35 sm:mb-3 sm:text-[9px] sm:tracking-[0.3em]">
                      YOUR SONIC IDENTITY
                    </p>
                    <h3 className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-xl font-bold text-transparent sm:text-[1.75rem]">
                      Midnight Dreamer
                    </h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/50 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                    Share ready
                  </div>
                </div>

                {/* Aura */}
                <div className="mb-5 rounded-2xl border border-white/8 bg-gradient-to-r from-violet-600/20 via-fuchsia-500/14 to-cyan-500/10 p-4 backdrop-blur-sm sm:mb-8 sm:rounded-3xl sm:p-5">
                  <p className="mb-1.5 text-[8px] uppercase tracking-[0.25em] text-white/35 sm:mb-2 sm:text-[9px] sm:tracking-[0.28em]">
                    Aura
                  </p>
                  <p className="text-lg font-bold tracking-tight text-white sm:text-3xl">
                    Emotional Synthwave Soul
                  </p>
                </div>

                {/* Genres */}
                <div className="mb-5 sm:mb-8">
                  <p className="mb-3 text-[8px] uppercase tracking-[0.25em] text-white/35 sm:mb-4 sm:text-[9px] sm:tracking-[0.28em]">
                    Genres
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {["Synthwave", "Indie Pop", "Ambient"].map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/75 backdrop-blur-sm sm:px-4 sm:py-2"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats grid */}
                <div className="mb-5 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-5">
                    <p className="mb-1.5 text-[8px] uppercase tracking-[0.25em] text-white/35 sm:mb-2 sm:text-[9px]">
                      Compatibility
                    </p>
                    <p className="text-4xl font-black tracking-tight text-fuchsia-200 sm:text-6xl">
                      92%
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-5">
                    <p className="mb-1.5 text-[8px] uppercase tracking-[0.25em] text-white/35 sm:mb-2 sm:text-[9px]">
                      Listening Mood
                    </p>
                    <p className="text-base font-semibold text-cyan-200 sm:text-2xl">
                      Late-night introspection
                    </p>
                  </div>
                </div>

                {/* Trait bars */}
                <div className="space-y-3 border-t border-white/10 pt-4 sm:space-y-4 sm:pt-5">
                  {previewStats.map((stat) => (
                    <div key={stat.label}>
                      <div className="mb-1.5 flex justify-between text-xs">
                        <p className="text-white/55">{stat.label}</p>
                        <p className="font-semibold text-white">{stat.value}</p>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${stat.gradient}`}
                          style={{ width: stat.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Identity reveal ── */}
        <section className="relative mb-20 overflow-hidden px-4 py-16 sm:mb-32 sm:px-6 sm:py-28">

          {/* Atmosphere */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[12%] top-[12%] h-[20rem] w-[20rem] rounded-full bg-fuchsia-500/10 blur-[140px] animate-pulse sm:h-[26rem] sm:w-[26rem]" />
            <div className="absolute right-[10%] bottom-[10%] h-[18rem] w-[18rem] rounded-full bg-cyan-500/10 blur-[150px] animate-pulse [animation-delay:1.7s] sm:h-[24rem] sm:w-[24rem]" />
            <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[170px] animate-pulse [animation-delay:0.8s] sm:h-[32rem] sm:w-[32rem]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl text-center">

            <p className="mb-6 text-[10px] uppercase tracking-[0.38em] text-white/25 sm:mb-8 sm:text-[11px] sm:tracking-[0.42em]">
              YOUR IDENTITY READ
            </p>

            {/* Giant archetype title */}
            <div className="relative mx-auto mb-7 max-w-5xl sm:mb-10">
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/2 h-[14rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/12 blur-[120px] sm:h-[18rem] sm:w-[44rem]" />
                <div className="absolute left-[35%] top-[45%] h-[10rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[100px] sm:h-[14rem] sm:w-[18rem]" />
              </div>
              <h2
                className="select-none text-[3.25rem] font-bold leading-[0.88] tracking-[-0.04em] sm:text-[4.5rem] md:text-[7rem] lg:text-[8rem]"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(240,220,255,0.96) 42%, rgba(217,190,255,0.92) 72%, rgba(188,235,255,0.88) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  WebkitMaskImage: "radial-gradient(ellipse 78% 100% at 50% 50%, black 62%, transparent 100%)",
                  textShadow: "0 0 60px rgba(168,85,247,0.18), 0 0 140px rgba(217,70,239,0.10)",
                }}
              >
                Midnight
                <br />
                Dreamer
              </h2>
            </div>

            {/* Archetype label */}
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/28 sm:mb-6 sm:gap-3 sm:text-[11px] sm:tracking-[0.35em]">
              <span>YOUR ARCHETYPE</span>
              <span className="h-px w-4 bg-white/10 sm:w-6" />
              <span>98% MATCH</span>
            </div>

            {/* Quote */}
            <div className="relative mx-auto mb-10 max-w-sm px-4 sm:mb-16 sm:max-w-2xl sm:px-0">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/6 blur-[80px] sm:h-20 sm:w-64" />
              <p className="relative text-base font-light leading-relaxed text-white/58 sm:text-lg md:text-[1.35rem]">
                &ldquo;Your playlist sounds like memories that never left.&rdquo;
              </p>
            </div>

            {/* Signal stats */}
            <div className="mx-auto flex max-w-xs items-center justify-center gap-4 sm:max-w-2xl sm:gap-8 md:gap-12">
              <div className="text-center">
                <div className="mb-1 text-xl font-semibold tracking-[-0.03em] text-fuchsia-100/92 sm:text-3xl">94%</div>
                <div className="text-[9px] uppercase tracking-[0.22em] text-white/24 sm:text-[10px] sm:tracking-[0.28em]">Night Energy</div>
              </div>
              <div className="h-6 w-px bg-white/8 sm:h-8" />
              <div className="text-center">
                <div className="mb-1 text-xl font-semibold tracking-[-0.03em] text-violet-100/92 sm:text-3xl">Top 2%</div>
                <div className="text-[9px] uppercase tracking-[0.22em] text-white/24 sm:text-[10px] sm:tracking-[0.28em]">Emotional Depth</div>
              </div>
              <div className="h-6 w-px bg-white/8 sm:h-8" />
              <div className="text-center">
                <div className="mb-1 text-xl font-semibold tracking-[-0.03em] text-cyan-100/92 sm:text-3xl">11 pm</div>
                <div className="text-[9px] uppercase tracking-[0.22em] text-white/24 sm:text-[10px] sm:tracking-[0.28em]">Peak Listening</div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Archetype cards ── */}
        <section className="mb-20 sm:mb-32">
          <div className="mb-10 text-center sm:mb-14">
            <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/30 sm:mb-4">
              CHOOSE YOUR ALTER EGO
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Every playlist becomes a personality.
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl sm:rounded-[2rem] sm:p-8 ${card.glow}`}
              >
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${card.gradient}`}
                  style={{ filter: "blur(120px)" }}
                />
                <div className="relative z-10">
                  <div className={`mb-4 inline-flex rounded-full bg-gradient-to-r px-3 py-1.5 text-xs font-semibold text-white sm:mb-6 sm:px-4 sm:py-2 ${card.gradient}`}>
                    AI ARCHETYPE
                  </div>
                  <h3 className="mb-3 text-2xl font-bold tracking-tight text-white sm:mb-5 sm:text-3xl">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                    {card.text}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/45 sm:mt-8">
                    Discover identity
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="mb-20 sm:mb-32">
          <div className="mb-10 text-center sm:mb-16">
            <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/30 sm:mb-4">
              HOW IT WORKS
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Three steps to your music identity.
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_60px_rgba(139,92,246,0.12)] sm:rounded-[2rem] sm:p-8"
              >
                <div
                  className={`absolute inset-0 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                    i === 0 ? "bg-fuchsia-500/10" : i === 1 ? "bg-violet-500/10" : "bg-cyan-500/10"
                  }`}
                />
                <div
                  className={`relative mb-4 text-5xl font-black transition-all duration-500 group-hover:scale-110 sm:mb-6 sm:text-6xl ${
                    i === 0
                      ? "text-fuchsia-400/25 group-hover:text-fuchsia-300/50"
                      : i === 1
                      ? "text-violet-400/25 group-hover:text-violet-300/50"
                      : "text-cyan-400/25 group-hover:text-cyan-300/50"
                  }`}
                >
                  0{i + 1}
                </div>
                <h3 className="relative mb-3 text-xl font-semibold text-white sm:mb-4 sm:text-2xl">
                  {step}
                </h3>
                <p className="relative text-sm leading-relaxed text-white/55 sm:text-base">
                  Experience AI-powered music psychology designed to transform
                  listening history into cinematic identity storytelling.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="pb-16 pt-6 text-center sm:pb-24 sm:pt-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-14 backdrop-blur-2xl sm:rounded-[2.5rem] sm:px-8 sm:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[140px] sm:h-72 sm:w-72" />

            <div className="relative z-10">
              <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/30 sm:mb-5">
                READY TO SEE WHO YOU SOUND LIKE?
              </p>

              <h2 className="mx-auto mb-5 max-w-4xl text-[2.5rem] font-black leading-[0.95] tracking-tight text-white sm:mb-6 sm:text-5xl md:text-7xl">
                Your playlist already
                <br />
                knows the answer.
              </h2>

              <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/60 sm:mb-10 sm:text-lg">
                Connect Spotify. Generate your cinematic music identity. Share
                the version of yourself your headphones already understand.
              </p>

              <SpotifyConnectButton
                variant="hero"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-[0_0_60px_rgba(217,70,239,0.35)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_90px_rgba(217,70,239,0.5)] sm:px-10 sm:py-5 sm:text-lg"
              >
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  Generate My VibePrint
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] transition-transform duration-1000 group-hover:translate-x-[120%]" />
              </SpotifyConnectButton>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="relative pb-10 pt-12">
          {/* Atmospheric top fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" aria-hidden />
          <div className="pointer-events-none absolute -top-6 left-1/2 h-12 w-48 -translate-x-1/2 rounded-full bg-violet-500/[0.05] blur-2xl" aria-hidden />

          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-white/20">
              VibePrint
            </p>
            <p className="text-[9px] leading-relaxed tracking-[0.06em] text-white/13">
              Your music knows you better than you do.
            </p>
            <div className="mt-1 flex items-center gap-4 text-[8px] uppercase tracking-[0.24em] text-white/[0.12]">
              <a href="/privacy" className="transition-colors duration-300 hover:text-white/30">Privacy</a>
              <span className="h-px w-2.5 bg-white/[0.07]" aria-hidden />
              <a href="/terms" className="transition-colors duration-300 hover:text-white/30">Terms</a>
            </div>
          </div>
        </footer>

      </div>
    </main>
  )
}
