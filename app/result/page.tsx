"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { getArchetypeTheme } from "@/lib/themes/archetypeThemes"

// ── Types ──────────────────────────────────────────────────────────────────

interface AnalysisResult {
  profile: { id: string; name: string; image: string | null }
  archetype: {
    id: string
    title: string
    auraLabel: string
    tone: string
    identityQuote: string
    behaviorInsight: string
    gradient: string
    traits: string[]
  }
  matchPercentage: number
  topMatches: { id: string; title: string; score: number }[]
  dna: {
    scores: {
      nightEnergy: number
      emotionalDepth: number
      chaosLevel: number
      nostalgiaIndex: number
      mainCharacterEnergy: number
      introvertScore: number
      danceability: number
      undergroundScore: number
      emotionalIntensity: number
      introspectionLevel: number
    }
    topGenres: string[]
    compatibilityScore: number
    listeningMood: string
    aura: string
    peakHour: number
    nightRatioPct: number
    repetitionPct: number
    audio: {
      energy: number
      valence: number
      danceability: number
      acousticness: number
    }
  }
  copy: {
    identityQuote: string
    behaviorInsight: string
    listeningObservation: string
    playlistPersonality: string
    traits: string[]
  }
  shareQuote: string
  topTracks: { name: string; artist: string; image: string | null }[]
  topArtists: { name: string; image: string | null; genres: string[] }[]
}

type Status = "loading" | "analyzing" | "done" | "error"

// ── Loading screen ─────────────────────────────────────────────────────────

const LOADING_MESSAGES = [
  "Reading your listening history…",
  "Extracting emotional signals…",
  "Mapping your archetype…",
  "Generating your identity…",
] as const

function LoadingScreen({ status }: { status: "loading" | "analyzing" }) {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    if (status !== "analyzing") return
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [status])

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#04061a] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/8 blur-[150px] animate-pulse" />
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-fuchsia-500/6 blur-[110px] animate-pulse [animation-delay:1.1s]" />
        <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-cyan-500/5 blur-[100px] animate-pulse [animation-delay:2.3s]" />
      </div>

      <div className="relative text-center">
        {/* Animated rings */}
        <div className="relative mx-auto mb-10 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-violet-400/15 animate-[spin_8s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-dashed border-fuchsia-400/12 animate-[spin_12s_linear_infinite_reverse]" />
          <div className="absolute inset-4 rounded-full border border-cyan-400/10 animate-[spin_6s_linear_infinite]" />
          <div className="h-3 w-3 rounded-full bg-gradient-to-br from-fuchsia-300 to-violet-400 shadow-[0_0_12px_rgba(217,70,239,0.8)] animate-pulse" />
        </div>

        <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.4em] text-white/25">
          {status === "loading" ? "Connecting" : "Analyzing"}
        </p>
        <p className="text-base font-light text-white/55 transition-all duration-700">
          {status === "loading" ? "Checking your session…" : LOADING_MESSAGES[msgIndex]}
        </p>
      </div>
    </main>
  )
}

// ── Error screen ───────────────────────────────────────────────────────────

function ErrorScreen({ error, onBack }: { error: string; onBack: () => void }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#04061a] text-white">
      <div className="relative max-w-md px-6 text-center">
        <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.4em] text-white/25">
          Something went wrong
        </p>
        <p className="mb-8 text-sm leading-relaxed text-white/50">{error}</p>
        <button
          onClick={onBack}
          className="rounded-full border border-white/12 bg-white/[0.04] px-6 py-2.5 text-sm text-zinc-300 transition-all hover:bg-white/[0.07] hover:text-white"
        >
          Back to home
        </button>
      </div>
    </main>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatPeakHour(h: number): string {
  if (h === 0) return "12 am"
  if (h === 12) return "12 pm"
  return h > 12 ? `${h - 12} pm` : `${h} am`
}

// ── Main result page ───────────────────────────────────────────────────────

export default function ResultPage() {
  const [status, setStatus] = useState<Status>("loading")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const router = useRouter()

  const runAnalysis = useCallback(async () => {
    setStatus("analyzing")
    try {
      const res = await fetch("/api/analyze", { method: "POST" })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error ?? "Analysis failed")
      }
      const data = await res.json()
      setResult(data)
      setStatus("done")
      // Stagger the reveal slightly for cinematic effect
      setTimeout(() => setRevealed(true), 120)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setStatus("error")
    }
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/"); return }
      runAnalysis()
    })
  }, [runAnalysis, router])

  if (status === "loading" || status === "analyzing") return <LoadingScreen status={status} />
  if (status === "error") return <ErrorScreen error={error!} onBack={() => router.push("/")} />
  if (!result) return null

  const { archetype, dna, copy, topTracks, topArtists, matchPercentage, topMatches } = result
  const theme = getArchetypeTheme(archetype.id)

  // Cinematic signal stats shown in the identity reveal
  const signalStats = [
    { value: `${dna.scores.nightEnergy}%`, label: "Night energy" },
    { value: formatPeakHour(dna.peakHour), label: "Peak hour" },
    { value: `${dna.compatibilityScore}%`, label: "Identity match" },
  ]

  // DNA bars — the 5 most emotionally resonant scores for this archetype
  const dnaBars = [
    { label: "Night Energy",       value: dna.scores.nightEnergy },
    { label: "Emotional Depth",    value: dna.scores.emotionalDepth },
    { label: "Nostalgia",          value: dna.scores.nostalgiaIndex },
    { label: "Introspection",      value: dna.scores.introspectionLevel },
    { label: "Chaos",              value: dna.scores.chaosLevel },
  ]

  return (
    <main
      className={`relative min-h-screen overflow-hidden text-white ${theme.selectionBg}`}
      style={{ backgroundColor: theme.pageBg }}
    >
      {/* ── Dynamic atmospheric background ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        {/* Primary field — breathes slowly */}
        <div
          className="absolute left-1/2 top-0 h-[56rem] w-[56rem] -translate-x-1/2 rounded-full blur-[160px] animate-breathe-slow"
          style={{ backgroundColor: theme.glowPrimary }}
        />
        {/* Secondary — drifts upper left */}
        <div
          className="absolute -left-24 top-[10%] h-96 w-[30rem] rounded-full blur-[120px] animate-drift-slow"
          style={{ backgroundColor: theme.glowSecondary, animationDelay: "0.8s" }}
        />
        {/* Tertiary — drifts lower right */}
        <div
          className="absolute -right-24 bottom-[10%] h-80 w-96 rounded-full blur-[120px] animate-drift-medium"
          style={{ backgroundColor: theme.glowTertiary, animationDelay: "2.1s" }}
        />
        {/* Horizontal haze — breathes offset */}
        <div
          className="absolute left-1/2 top-[28%] h-40 w-full max-w-4xl -translate-x-1/2 rounded-full blur-[70px] animate-breathe"
          style={{ backgroundColor: theme.glowHaze, animationDelay: "1.4s" }}
        />
      </div>

      <div
        className={`relative z-10 mx-auto max-w-xl px-6 py-14 transition-opacity duration-1000 ${revealed ? "opacity-100" : "opacity-0"}`}
      >

        {/* ── Nav ── */}
        <header className="mb-16 flex items-center justify-between animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="text-lg font-bold tracking-[0.06em] text-white/80">
            VibePrint
          </span>
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push("/") }}
            aria-label="Sign out of VibePrint"
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/40 transition-all duration-300 hover:border-white/20 hover:text-white/70 sm:py-1.5"
          >
            Sign out
          </button>
        </header>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 1 — CINEMATIC IDENTITY REVEAL
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative mb-20 overflow-visible py-10 text-center">

          {/* Glow blobs behind the title — breathe at different rates */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-[28%] top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] animate-breathe"
              style={{ backgroundColor: theme.glowSecondary, animationDelay: "0.4s" }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] animate-breathe-slow"
              style={{ backgroundColor: theme.glowPrimary, animationDelay: "1.6s" }}
            />
            <div
              className="absolute left-[72%] top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] animate-breathe"
              style={{ backgroundColor: theme.glowTertiary, animationDelay: "0.9s" }}
            />
          </div>

          {/* Label */}
          <p
            className={`relative mb-10 text-[9px] font-medium uppercase tracking-[0.4em] ${theme.accentColor} animate-fade-in`}
            style={{ animationDelay: "0.2s" }}
          >
            Your identity read
          </p>

          {/* Archetype title — scale-in, the cinematic centerpiece */}
          <div
            className="relative mx-auto mb-6 max-w-5xl animate-scale-in"
            style={{ animationDelay: "0.35s" }}
          >
            <h1
              className="relative font-serif text-[3.5rem] font-bold leading-[1.0] tracking-tight md:text-[5.5rem] lg:text-[7rem]"
              style={{
                WebkitMaskImage: "radial-gradient(ellipse 88% 100% at 50% 50%, black 48%, transparent 100%)",
                maskImage: "radial-gradient(ellipse 88% 100% at 50% 50%, black 48%, transparent 100%)",
                textShadow: theme.titleShadow,
              }}
            >
              {archetype.title.split(" ").map((word, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  <span
                    style={{
                      background: i === 0 ? theme.titleGradientLine1 : theme.titleGradientLine2,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className={`relative mt-5 text-[9px] font-medium uppercase tracking-[0.38em] ${theme.accentColor} animate-fade-in`}
              style={{ animationDelay: "0.7s" }}
            >
              {archetype.tone} · {matchPercentage}% match
            </p>
          </div>

          {/* Identity quote — fades up after title settles */}
          <blockquote
            className="relative mx-auto mb-12 max-w-xs px-4 animate-fade-up"
            style={{ animationDelay: "0.85s" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: theme.glowHaze }}
            />
            <p className="relative text-[0.95rem] font-light leading-[1.9] text-white/50">
              &ldquo;{copy.identityQuote}&rdquo;
            </p>
          </blockquote>

          {/* Signal stats — last to appear */}
          <div
            className="mx-auto flex max-w-xs items-center justify-center sm:max-w-sm animate-fade-in"
            style={{ animationDelay: "1.1s" }}
          >
            {signalStats.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="px-4 text-center sm:px-5 md:px-7">
                  <p className="text-sm font-semibold text-white/60 sm:text-base md:text-lg">{s.value}</p>
                  <p className={`mt-1 text-[8px] font-medium uppercase tracking-[0.18em] sm:mt-1.5 sm:text-[9px] sm:tracking-[0.22em] ${theme.accentColor}`}>
                    {s.label}
                  </p>
                </div>
                {i < 2 && <div className="h-4 w-px bg-white/[0.07] sm:h-5" />}
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2 — AURA + BEHAVIORAL INSIGHT
        ══════════════════════════════════════════════════════════════ */}
        <section
          className={`relative mb-8 overflow-hidden rounded-2xl border p-7 vp-card animate-fade-up ${theme.cardBorder}`}
          style={{ backgroundColor: theme.cardBg, animationDelay: "1.25s" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl"
            style={{ backgroundColor: theme.glowPrimary }}
          />
          <div className="relative">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className={`mb-1.5 text-[9px] font-medium uppercase tracking-[0.3em] ${theme.accentColor}`}>
                  Aura
                </p>
                <p className="text-lg font-semibold text-white/90">{dna.aura}</p>
              </div>
              <div
                className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-medium ${theme.traitBorder} ${theme.traitText} ${theme.traitBg}`}
              >
                {dna.listeningMood}
              </div>
            </div>
            <p className="text-sm leading-[1.8] text-white/45">{copy.behaviorInsight}</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 3 — LISTENING OBSERVATION (the eerily personal line)
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="relative mb-8 px-1 animate-fade-up"
          style={{ animationDelay: "1.4s" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 h-16 w-full -translate-y-1/2 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: theme.glowHaze }}
          />
          <p className="relative text-center text-sm font-light leading-[1.9] text-white/40 italic">
            &ldquo;{copy.listeningObservation}&rdquo;
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 4 — PERSONALITY TRAITS
        ══════════════════════════════════════════════════════════════ */}
        <section className="mb-8 animate-fade-up" style={{ animationDelay: "1.55s" }}>
          <p className={`mb-4 text-[9px] font-medium uppercase tracking-[0.3em] ${theme.accentColor}`}>
            Your traits
          </p>
          <div className="flex flex-wrap gap-2">
            {copy.traits.map((trait) => (
              <span
                key={trait}
                className={`vp-trait rounded-full border px-4 py-1.5 text-[11px] font-medium tracking-wide cursor-default ${theme.traitBorder} ${theme.traitText} ${theme.traitBg}`}
              >
                {trait}
              </span>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 5 — MUSIC DNA BARS
        ══════════════════════════════════════════════════════════════ */}
        <section
          className={`relative mb-8 overflow-hidden rounded-2xl border p-7 vp-card animate-fade-up ${theme.cardBorder}`}
          style={{ backgroundColor: theme.cardBg, animationDelay: "1.65s" }}
        >
          <p className={`mb-6 text-[9px] font-medium uppercase tracking-[0.3em] ${theme.accentColor}`}>
            Music DNA
          </p>
          <div className="space-y-4">
            {dnaBars.map((bar, i) => (
              <div key={bar.label}>
                <div className="mb-1.5 flex justify-between">
                  <p className="text-[11px] font-medium text-white/40">{bar.label}</p>
                  <p className="text-[11px] font-semibold text-white/60">{bar.value}%</p>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${theme.barGradient} opacity-75 animate-bar-fill`}
                    style={{
                      width: `${bar.value}%`,
                      animationDelay: `${1.8 + i * 0.12}s`,
                      animationDuration: "1.1s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 6 — GENRES
        ══════════════════════════════════════════════════════════════ */}
        {dna.topGenres.length > 0 && (
          <section className="mb-8 animate-fade-up" style={{ animationDelay: "1.9s" }}>
            <p className={`mb-4 text-[9px] font-medium uppercase tracking-[0.3em] ${theme.accentColor}`}>
              Your genres
            </p>
            <div className="flex flex-wrap gap-2">
              {dna.topGenres.map((genre) => (
                <span
                  key={genre}
                  className={`vp-trait rounded-full border px-3 py-1 text-xs capitalize cursor-default ${theme.genreBorder} ${theme.genreText} ${theme.genreBg}`}
                >
                  {genre}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════
            SECTION 7 — TOP ARTISTS
        ══════════════════════════════════════════════════════════════ */}
        {topArtists.length > 0 && (
          <section className="mb-8 animate-fade-up" style={{ animationDelay: "2.0s" }}>
            <p className={`mb-4 text-[9px] font-medium uppercase tracking-[0.3em] ${theme.accentColor}`}>
              Your artists
            </p>
            <div className="flex flex-wrap gap-3">
              {topArtists.map((artist) => (
                <div
                  key={artist.name}
                  className={`vp-trait flex items-center gap-2.5 rounded-full border px-3 py-1.5 cursor-default ${theme.cardBorder}`}
                  style={{ backgroundColor: theme.cardBg }}
                >
                  {artist.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="h-5 w-5 rounded-full object-cover opacity-80"
                    />
                  )}
                  <span className="text-xs font-medium text-white/65">{artist.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════
            SECTION 8 — TOP TRACKS
        ══════════════════════════════════════════════════════════════ */}
        {topTracks.length > 0 && (
          <section className="mb-12 animate-fade-up" style={{ animationDelay: "2.1s" }}>
            <p className={`mb-4 text-[9px] font-medium uppercase tracking-[0.3em] ${theme.accentColor}`}>
              Top tracks
            </p>
            <div className="space-y-2">
              {topTracks.map((track, i) => (
                <div
                  key={i}
                  className={`vp-track-row flex items-center gap-3 rounded-xl border px-4 py-3 ${theme.cardBorder}`}
                  style={{ backgroundColor: theme.cardBg }}
                >
                  {track.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={track.image}
                      alt={track.name}
                      className="h-9 w-9 rounded-lg object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-90"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white/70">{track.name}</p>
                    <p className="truncate text-xs text-white/30">{track.artist}</p>
                  </div>
                  <span className={`text-[10px] ${theme.accentColor}`}>{i + 1}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════
            SECTION 9 — OTHER ARCHETYPES YOU ALMOST WERE
        ══════════════════════════════════════════════════════════════ */}
        {topMatches.length > 1 && (
          <section className="mb-14 animate-fade-up" style={{ animationDelay: "2.2s" }}>
            <p className={`mb-4 text-[9px] font-medium uppercase tracking-[0.3em] ${theme.accentColor}`}>
              You also carry traces of
            </p>
            <div className="flex gap-3">
              {topMatches.slice(1, 3).map((match) => {
                const matchTheme = getArchetypeTheme(match.id)
                return (
                  <div
                    key={match.id}
                    className={`vp-card flex-1 rounded-xl border px-4 py-3 text-center ${matchTheme.cardBorder}`}
                    style={{ backgroundColor: matchTheme.cardBg }}
                  >
                    <p className="text-sm font-medium text-white/60">{match.title}</p>
                    <p className={`mt-1 text-[9px] uppercase tracking-[0.2em] ${matchTheme.accentColor}`}>
                      {match.score}% signal
                    </p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════
            SECTION 10 — SHARE CTA
        ══════════════════════════════════════════════════════════════ */}
        <section className="text-center animate-fade-up" style={{ animationDelay: "2.3s" }}>
          <p className={`mb-6 text-[9px] font-medium uppercase tracking-[0.3em] ${theme.accentColor}`}>
            Built to be screenshotted
          </p>
          <button
            onClick={() => router.push("/share")}
            aria-label="View your VibePrint share card"
            className={`group relative overflow-hidden rounded-full bg-gradient-to-r ${theme.ctaGradient} px-10 py-4 text-base font-semibold tracking-wide ring-1 ring-white/10 transition-all duration-500 hover:scale-[1.04] hover:ring-white/20 active:scale-[0.97] sm:py-3.5`}
            style={{
              boxShadow: theme.ctaShadow.replace(/_/g, " "),
              transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, ring 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const shadow = theme.ctaShadow.replace(/_/g, " ").replace(/0\.40\)|0\.35\)|0\.45\)/, "0.65)")
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = shadow
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = theme.ctaShadow.replace(/_/g, " ")
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative">View Share Card →</span>
          </button>
        </section>

      </div>
    </main>
  )
}
