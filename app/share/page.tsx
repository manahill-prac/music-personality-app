"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { getArchetypeTheme, type ArchetypeTheme } from "@/lib/themes/archetypeThemes"

// ── Types ──────────────────────────────────────────────────────────────────

interface ShareData {
  archetype: { id: string; title: string; tone: string }
  matchPercentage: number
  shareQuote: string
  dna: {
    scores: { nightEnergy: number; emotionalDepth: number; introspectionLevel: number }
    peakHour: number
    topGenres: string[]
    aura: string
    listeningMood: string
  }
  copy: { traits: string[] }
  profile: { name: string }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatPeakHour(h: number): string {
  if (h === 0) return "12 am"
  if (h === 12) return "12 pm"
  return h > 12 ? `${h - 12} pm` : `${h} am`
}

/** Extract the raw RGBA string from a theme glow value for inline use */
function rawColor(rgba: string): string {
  return rgba
}

// ── The poster — fixed 390×693 (9:16), self-contained for export ──────────

interface PosterProps {
  data: ShareData
  theme: ArchetypeTheme
  posterRef: React.RefObject<HTMLDivElement | null>
}

function Poster({ data, theme, posterRef }: PosterProps) {
  const { archetype, matchPercentage, shareQuote, dna, copy, profile } = data
  const words = archetype.title.split(" ")

  return (
    <div
      ref={posterRef}
      style={{
        width: 390,
        height: 693,
        backgroundColor: theme.pageBg,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        flexShrink: 0,
      }}
    >
      {/* ── Atmospheric depth layers ── */}

      {/* Primary field — large centered violet/color bloom */}
      <div style={{
        position: "absolute", top: "-10%", left: "50%",
        transform: "translateX(-50%)",
        width: 500, height: 500,
        borderRadius: "50%",
        backgroundColor: rawColor(theme.glowPrimary),
        filter: "blur(100px)",
      }} />

      {/* Secondary — upper left warmth */}
      <div style={{
        position: "absolute", top: -40, left: -60,
        width: 280, height: 280,
        borderRadius: "50%",
        backgroundColor: rawColor(theme.glowSecondary),
        filter: "blur(80px)",
        transform: "rotate(-12deg)",
      }} />

      {/* Tertiary — lower right cool */}
      <div style={{
        position: "absolute", bottom: -40, right: -60,
        width: 240, height: 240,
        borderRadius: "50%",
        backgroundColor: rawColor(theme.glowTertiary),
        filter: "blur(80px)",
        transform: "rotate(12deg)",
      }} />

      {/* Horizontal haze — behind the title zone */}
      <div style={{
        position: "absolute", top: "28%", left: "50%",
        transform: "translateX(-50%)",
        width: 380, height: 120,
        borderRadius: "50%",
        backgroundColor: rawColor(theme.glowHaze),
        filter: "blur(50px)",
      }} />

      {/* Bottom warmth — grounds the composition */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: 300, height: 160,
        borderRadius: "50%",
        backgroundColor: rawColor(theme.glowSecondary),
        filter: "blur(70px)",
        opacity: 0.5,
      }} />

      {/* Top edge highlight */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(to right, transparent, ${theme.glowHaze}, transparent)`,
      }} />

      {/* ── Content ── */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column",
        height: "100%", padding: "36px 32px 28px",
      }}>

        {/* Brand */}
        <div style={{
          fontSize: 9, fontFamily: "system-ui, sans-serif",
          fontWeight: 500, letterSpacing: "0.4em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.28)",
          marginBottom: 0,
        }}>
          VibePrint
        </div>

        {/* ── ARCHETYPE TITLE — the poster moment ── */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          textAlign: "center", paddingTop: 8, paddingBottom: 8,
        }}>

          {/* Label */}
          <div style={{
            fontSize: 8, fontFamily: "system-ui, sans-serif",
            fontWeight: 500, letterSpacing: "0.38em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.22)",
            marginBottom: 20,
          }}>
            Your archetype
          </div>

          {/* Title — each word on its own line with distinct gradient */}
          <div style={{
            textShadow: theme.titleShadow,
            WebkitMaskImage: "radial-gradient(ellipse 90% 100% at 50% 50%, black 45%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 90% 100% at 50% 50%, black 45%, transparent 100%)",
            lineHeight: 0.95,
            marginBottom: 16,
          }}>
            {words.map((word, i) => (
              <div key={i} style={{
                fontSize: words.length > 2 ? 68 : 80,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                background: i === 0 ? theme.titleGradientLine1 : theme.titleGradientLine2,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "block",
              }}>
                {word}
              </div>
            ))}
          </div>

          {/* Match */}
          <div style={{
            fontSize: 8, fontFamily: "system-ui, sans-serif",
            fontWeight: 500, letterSpacing: "0.35em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.20)",
            marginBottom: 28,
          }}>
            {matchPercentage}% match
          </div>

          {/* Quote */}
          <div style={{
            fontSize: 13, fontFamily: "Georgia, serif",
            fontWeight: 300, lineHeight: 1.75,
            color: "rgba(255,255,255,0.45)",
            fontStyle: "italic",
            maxWidth: 280, textAlign: "center",
            marginBottom: 28,
          }}>
            &ldquo;{shareQuote}&rdquo;
          </div>

          {/* Aura pill */}
          <div style={{
            display: "inline-block",
            border: `1px solid ${theme.glowHaze}`,
            borderRadius: 100,
            padding: "6px 16px",
            fontSize: 10, fontFamily: "system-ui, sans-serif",
            fontWeight: 500, letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.55)",
            backgroundColor: `${theme.glowPrimary}`,
            marginBottom: 24,
          }}>
            {dna.aura}
          </div>

          {/* Traits */}
          {copy.traits.length > 0 && (
            <div style={{
              display: "flex", flexWrap: "wrap",
              gap: 6, justifyContent: "center",
              marginBottom: 24,
            }}>
              {copy.traits.slice(0, 3).map((trait) => (
                <div key={trait} style={{
                  border: `1px solid rgba(255,255,255,0.10)`,
                  borderRadius: 100,
                  padding: "4px 12px",
                  fontSize: 9, fontFamily: "system-ui, sans-serif",
                  fontWeight: 500, letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.38)",
                }}>
                  {trait}
                </div>
              ))}
            </div>
          )}

          {/* Stats row */}
          <div style={{
            display: "flex", alignItems: "center",
            gap: 0, justifyContent: "center",
          }}>
            {[
              { value: `${dna.scores.nightEnergy}%`, label: "Night energy" },
              { value: formatPeakHour(dna.peakHour), label: "Peak hour" },
              { value: `${dna.scores.emotionalDepth}%`, label: "Depth" },
            ].map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ textAlign: "center", padding: "0 16px" }}>
                  <div style={{
                    fontSize: 14, fontFamily: "system-ui, sans-serif",
                    fontWeight: 600, color: "rgba(255,255,255,0.55)",
                    letterSpacing: "-0.01em",
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontSize: 7, fontFamily: "system-ui, sans-serif",
                    fontWeight: 500, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.22)",
                    marginTop: 3,
                  }}>
                    {s.label}
                  </div>
                </div>
                {i < 2 && (
                  <div style={{
                    width: 1, height: 20,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 14,
          display: "flex", justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{
            fontSize: 8, fontFamily: "system-ui, sans-serif",
            fontWeight: 500, letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.22)",
          }}>
            {profile.name}
          </div>
          <div style={{
            fontSize: 8, fontFamily: "system-ui, sans-serif",
            fontWeight: 500, letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.18)",
          }}>
            vibeprint.app
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Export button ──────────────────────────────────────────────────────────

interface ExportButtonProps {
  posterRef: React.RefObject<HTMLDivElement | null>
  theme: ArchetypeTheme
  archetypeId: string
}

function ExportButton({ posterRef, theme, archetypeId }: ExportButtonProps) {
  const [exporting, setExporting] = useState<"idle" | "working" | "done" | "error">("idle")

  const handleExport = async () => {
    if (!posterRef.current || exporting === "working") return
    setExporting("working")

    try {
      const { toPng } = await import("html-to-image")

      const dataUrl = await toPng(posterRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        style: { transform: "none" },
      })

      const link = document.createElement("a")
      link.download = `vibeprint-${archetypeId}.png`
      link.href = dataUrl
      link.click()

      setExporting("done")
      setTimeout(() => setExporting("idle"), 2500)
    } catch {
      setExporting("error")
      setTimeout(() => setExporting("idle"), 2500)
    }
  }

  const baseShadow = theme.ctaShadow.replace(/_/g, " ")
  // Bloom: increase the opacity value in the shadow string for hover
  const bloomShadow = baseShadow.replace(/rgba\(([^)]+),\s*([\d.]+)\)/, (_, rgb, alpha) =>
    `rgba(${rgb}, ${Math.min(parseFloat(alpha) * 1.8, 0.9)})`
  )

  const label = {
    idle: "Download poster",
    working: "Generating…",
    done: "Downloaded ✓",
    error: "Try again",
  }[exporting]

  return (
    <button
      onClick={handleExport}
      disabled={exporting === "working"}
      aria-label={exporting === "done" ? "Poster downloaded" : exporting === "working" ? "Generating poster…" : "Download your VibePrint poster"}
      className={`group relative overflow-hidden rounded-full bg-gradient-to-r ${theme.ctaGradient} px-8 py-3.5 text-sm font-semibold tracking-wide text-white ring-1 ring-white/10 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3`}
      style={{
        boxShadow: baseShadow,
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, opacity 0.3s ease",
      }}
      onMouseEnter={(e) => {
        if (exporting === "working") return
        const el = e.currentTarget as HTMLButtonElement
        el.style.transform = "scale(1.04)"
        el.style.boxShadow = bloomShadow
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.transform = "scale(1)"
        el.style.boxShadow = baseShadow
      }}
      onMouseDown={(e) => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.transform = "scale(0.97)"
      }}
      onMouseUp={(e) => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.transform = "scale(1.04)"
      }}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative flex items-center gap-2.5">
        {exporting === "working" && (
          <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        )}
        {exporting === "done" && (
          <span className="text-white/80">✓</span>
        )}
        <span className="transition-all duration-300">{label}</span>
      </span>
    </button>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function SharePage() {
  const [data, setData] = useState<ShareData | null>(null)
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading")
  const [revealed, setRevealed] = useState(false)
  const posterRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const load = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push("/"); return }

    const res = await fetch("/api/analyze", { method: "POST" })
    if (!res.ok) { setStatus("error"); return }

    setData(await res.json())
    setStatus("done")
    setTimeout(() => setRevealed(true), 100)
  }, [router])

  useEffect(() => { load() }, [load])

  // ── Loading ──
  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#04061a] text-white">
        <div className="text-center">
          <div className="mx-auto mb-6 h-5 w-5 rounded-full border-2 border-violet-400/40 border-t-violet-400 animate-spin" />
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-white/25">
            Building your poster
          </p>
        </div>
      </main>
    )
  }

  // ── Error ──
  if (status === "error" || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#04061a] text-white">
        <div className="text-center">
          <p className="mb-4 text-sm text-white/40">Couldn&apos;t load your result.</p>
          <button
            onClick={() => router.push("/result")}
            className="text-sm text-white/35 hover:text-white/70 transition-colors"
          >
            ← Back to result
          </button>
        </div>
      </main>
    )
  }

  const theme = getArchetypeTheme(data.archetype.id)

  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: theme.pageBg }}
    >
      {/* Page atmosphere — drifting, not pulsing */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] animate-breathe-slow"
          style={{ backgroundColor: theme.glowPrimary }}
        />
        <div
          className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full blur-[140px] animate-drift-slow"
          style={{ backgroundColor: theme.glowSecondary, animationDelay: "1.1s" }}
        />
        <div
          className="absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full blur-[140px] animate-drift-medium"
          style={{ backgroundColor: theme.glowTertiary, animationDelay: "2.7s" }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex min-h-screen flex-col items-center justify-start px-4 py-12 transition-opacity duration-1000 ${revealed ? "opacity-100" : "opacity-0"}`}
      >
        {/* Nav */}
        <div className="mb-10 flex w-full max-w-sm items-center justify-between animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="text-sm font-bold tracking-[0.06em] text-white/60">
            VibePrint
          </span>
          <button
            onClick={() => router.push("/result")}
            className="text-xs text-white/30 transition-colors duration-300 hover:text-white/60"
          >
            ← Back to result
          </button>
        </div>

        {/* Poster — slides up cinematically, scales on small screens via CSS */}
        <div
          className="mb-8 w-full animate-fade-up"
          style={{ animationDelay: "0.25s", animationDuration: "1.0s" }}
        >
          {/* Outer div clamps to screen width; inner div scales the fixed 390px poster */}
          <div
            className="mx-auto overflow-hidden rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            style={{ width: "min(390px, calc(100vw - 32px))" }}
          >
            <div
              style={{
                width: 390,
                transformOrigin: "top left",
                transform: "scale(calc(min(390px, 100vw - 32px) / 390))",
              }}
            >
              <Poster data={data} theme={theme} posterRef={posterRef} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          <ExportButton
            posterRef={posterRef}
            theme={theme}
            archetypeId={data.archetype.id}
          />

          <p className={`text-[9px] font-medium uppercase tracking-[0.3em] ${theme.accentColor}`}>
            Or screenshot this page to share
          </p>
        </div>

        {/* Archetype hint */}
        <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <p className={`text-[9px] font-medium uppercase tracking-[0.3em] ${theme.accentColor} mb-1`}>
            Your archetype
          </p>
          <p className="text-sm font-light text-white/40">{data.archetype.title}</p>
        </div>
      </div>
    </main>
  )
}
