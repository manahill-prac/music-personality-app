import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { fetchMusicData } from "@/lib/spotify/client"
import { analyzeMusicDNA } from "@/lib/analysis/engine"
import { getPrimaryArchetype, getMatchPercentage, matchArchetype } from "@/lib/analysis/archetypes"
import { generateCopy, getShareCardQuote } from "@/lib/analysis/copy"

/**
 * POST /api/analyze
 *
 * Fetches Spotify data using the session's provider_token,
 * runs the full analysis pipeline, and returns the VibePrint result.
 *
 * Pipeline:
 *   Spotify data → signal extraction → score derivation →
 *   archetype matching → copy generation → response
 */
export async function POST() {
  const supabase = await createClient()

  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError || !session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const spotifyToken = session.provider_token
  if (!spotifyToken) {
    return NextResponse.json(
      { error: "No Spotify token. Please reconnect your Spotify account." },
      { status: 401 },
    )
  }

  try {
    const musicData = await fetchMusicData(spotifyToken)
    const dna = analyzeMusicDNA(musicData)
    const archetype = getPrimaryArchetype(dna)
    const matchPct = getMatchPercentage(dna)
    const topMatches = matchArchetype(dna).slice(0, 3)
    const copy = generateCopy(dna, archetype)
    const shareQuote = getShareCardQuote(dna, archetype)

    return NextResponse.json({
      profile: {
        id: musicData.profile.id,
        name: musicData.profile.display_name,
        image: musicData.profile.images[0]?.url ?? null,
      },
      archetype,
      matchPercentage: matchPct,
      topMatches: topMatches.map((m) => ({
        id: m.archetype.id,
        title: m.archetype.title,
        score: m.score,
      })),
      dna: {
        scores: dna.scores,
        topGenres: dna.topGenres,
        compatibilityScore: dna.compatibilityScore,
        listeningMood: dna.listeningMood,
        aura: dna.aura,
        peakHour: dna.peakHour,
        nightRatioPct: dna.nightRatioPct,
        repetitionPct: dna.repetitionPct,
        // Expose key audio signals for the UI
        audio: {
          energy: dna.signals.audio.energy,
          valence: dna.signals.audio.valence,
          danceability: dna.signals.audio.danceability,
          acousticness: dna.signals.audio.acousticness,
        },
      },
      copy,
      shareQuote,
      topTracks: musicData.topTracks.slice(0, 5).map((t) => ({
        name: t.name,
        artist: t.artists[0]?.name ?? "",
        image: t.album.images[0]?.url ?? null,
      })),
      topArtists: musicData.topArtists.slice(0, 5).map((a) => ({
        name: a.name,
        image: a.images[0]?.url ?? null,
        genres: a.genres.slice(0, 2),
      })),
    })
  } catch (err) {
    // Server-side error logging — intentional for production observability
    if (process.env.NODE_ENV !== "test") {
      console.error("[/api/analyze]", err instanceof Error ? err.message : err)
    }
    const message = err instanceof Error ? err.message : "Analysis failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
