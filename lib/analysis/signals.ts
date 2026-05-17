/**
 * Signal extraction utilities
 *
 * Pure functions that extract named behavioral signals from raw Spotify data.
 * Each signal is a 0–1 float derived deterministically from real data.
 * These are the atomic units the engine and archetype matcher consume.
 */

import type {
  SpotifyAudioFeatures,
  SpotifyArtist,
  SpotifyTrack,
  SpotifyRecentTrack,
} from "@/lib/spotify/client"

// ── Helpers ────────────────────────────────────────────────────────────────

export function avg(values: number[]): number {
  if (!values.length) return 0
  return values.reduce((a, b) => a + b, 0) / values.length
}

export function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v))
}

export function clamp100(v: number): number {
  return Math.round(Math.max(0, Math.min(100, v)))
}

/** Standard deviation of an array */
export function stddev(values: number[]): number {
  if (values.length < 2) return 0
  const mean = avg(values)
  return Math.sqrt(avg(values.map((v) => (v - mean) ** 2)))
}

/**
 * Deterministic per-user noise: stable float 0–1 from a string seed.
 * Used to break ties and add micro-variation without randomness.
 */
export function stableNoise(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (Math.abs(h) % 10000) / 10000
}

// ── Audio feature signals ──────────────────────────────────────────────────

export interface AudioSignals {
  energy: number           // avg energy 0–1
  valence: number          // avg valence (happiness) 0–1
  danceability: number     // avg danceability 0–1
  acousticness: number     // avg acousticness 0–1
  instrumentalness: number // avg instrumentalness 0–1
  speechiness: number      // avg speechiness 0–1
  tempo: number            // avg BPM
  loudness: number         // avg loudness dB (typically -60 to 0)
  moodVariance: number     // stddev of valence — how consistent the emotional tone is
  energyVariance: number   // stddev of energy — how consistent the intensity is
  darkRatio: number        // proportion of tracks with valence < 0.35
  brightRatio: number      // proportion of tracks with valence > 0.65
  intenseRatio: number     // proportion of tracks with energy > 0.75
  calmRatio: number        // proportion of tracks with energy < 0.35
}

export function extractAudioSignals(features: SpotifyAudioFeatures[]): AudioSignals {
  if (!features.length) {
    return {
      energy: 0.5, valence: 0.5, danceability: 0.5, acousticness: 0.3,
      instrumentalness: 0.1, speechiness: 0.1, tempo: 120, loudness: -8,
      moodVariance: 0.15, energyVariance: 0.15,
      darkRatio: 0.3, brightRatio: 0.3, intenseRatio: 0.3, calmRatio: 0.2,
    }
  }

  const valences = features.map((f) => f.valence)
  const energies = features.map((f) => f.energy)

  return {
    energy: avg(energies),
    valence: avg(valences),
    danceability: avg(features.map((f) => f.danceability)),
    acousticness: avg(features.map((f) => f.acousticness)),
    instrumentalness: avg(features.map((f) => f.instrumentalness)),
    speechiness: avg(features.map((f) => f.speechiness)),
    tempo: avg(features.map((f) => f.tempo)),
    loudness: avg(features.map((f) => f.loudness)),
    moodVariance: stddev(valences),
    energyVariance: stddev(energies),
    darkRatio: valences.filter((v) => v < 0.35).length / valences.length,
    brightRatio: valences.filter((v) => v > 0.65).length / valences.length,
    intenseRatio: energies.filter((e) => e > 0.75).length / energies.length,
    calmRatio: energies.filter((e) => e < 0.35).length / energies.length,
  }
}

// ── Artist / genre signals ─────────────────────────────────────────────────

export interface ArtistSignals {
  avgPopularity: number      // 0–100: how mainstream the taste is
  undergroundRatio: number   // 0–1: proportion of artists with popularity < 40
  mainstreamRatio: number    // 0–1: proportion of artists with popularity > 70
  genreConcentration: number // 0–1: how focused the genre taste is (1 = one genre, 0 = all genres)
  dominantGenres: string[]   // top genres by frequency
  hasElectronic: boolean
  hasAcoustic: boolean
  hasRnb: boolean
  hasRap: boolean
  hasRock: boolean
  hasMetal: boolean
  hasClassical: boolean
  hasJazz: boolean
  hasLatin: boolean
  hasPop: boolean
}

export function extractArtistSignals(
  artists: SpotifyArtist[],
  allGenres: string[],
): ArtistSignals {
  if (!artists.length) {
    return {
      avgPopularity: 50, undergroundRatio: 0.3, mainstreamRatio: 0.3,
      genreConcentration: 0.3, dominantGenres: [],
      hasElectronic: false, hasAcoustic: false, hasRnb: false, hasRap: false,
      hasRock: false, hasMetal: false, hasClassical: false, hasJazz: false,
      hasLatin: false, hasPop: false,
    }
  }

  const popularities = artists.map((a) => a.popularity)
  const avgPopularity = avg(popularities)
  const undergroundRatio = popularities.filter((p) => p < 40).length / popularities.length
  const mainstreamRatio = popularities.filter((p) => p > 70).length / popularities.length

  // Genre concentration: if top genre accounts for >40% of all genre mentions, taste is focused
  const genreMap = new Map<string, number>()
  for (const g of allGenres) genreMap.set(g, (genreMap.get(g) ?? 0) + 1)
  const totalGenreMentions = [...genreMap.values()].reduce((a, b) => a + b, 0)
  const topGenreCount = Math.max(...genreMap.values(), 1)
  const genreConcentration = totalGenreMentions > 0 ? topGenreCount / totalGenreMentions : 0

  const g = allGenres.join(" ")
  const has = (terms: string[]) => terms.some((t) => g.includes(t))

  return {
    avgPopularity,
    undergroundRatio,
    mainstreamRatio,
    genreConcentration,
    dominantGenres: [...genreMap.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k).slice(0, 8),
    hasElectronic: has(["electronic", "synth", "edm", "techno", "house", "ambient", "idm", "drum and bass", "dubstep"]),
    hasAcoustic: has(["acoustic", "folk", "singer-songwriter", "indie folk", "country"]),
    hasRnb: has(["r&b", "soul", "neo soul", "rhythm and blues", "contemporary r&b"]),
    hasRap: has(["rap", "hip hop", "hip-hop", "trap", "drill", "grime"]),
    hasRock: has(["rock", "alternative", "indie rock", "post-rock", "shoegaze", "grunge"]),
    hasMetal: has(["metal", "hardcore", "post-hardcore", "screamo", "deathcore"]),
    hasClassical: has(["classical", "orchestral", "chamber", "opera", "baroque"]),
    hasJazz: has(["jazz", "bebop", "fusion", "bossa nova", "swing"]),
    hasLatin: has(["latin", "reggaeton", "salsa", "cumbia", "bachata"]),
    hasPop: has(["pop", "dance pop", "electropop", "synth-pop", "indie pop"]),
  }
}

// ── Listening behavior signals ─────────────────────────────────────────────

export interface BehaviorSignals {
  nightRatio: number        // 0–1: proportion of listening 10pm–4am
  lateNightRatio: number    // 0–1: proportion of listening 12am–4am (deeper night)
  morningRatio: number      // 0–1: proportion of listening 6am–10am
  peakHour: number          // 0–23: most common listening hour
  repetitionScore: number   // 0–1: how often same tracks repeat in recent history
  sessionDepth: number      // 0–1: avg consecutive plays of same artist (loyalty signal)
  recentDiversity: number   // 0–1: unique tracks / total plays in recent history
}

export function extractBehaviorSignals(recent: SpotifyRecentTrack[]): BehaviorSignals {
  if (!recent.length) {
    return {
      nightRatio: 0.4, lateNightRatio: 0.2, morningRatio: 0.15,
      peakHour: 22, repetitionScore: 0.3, sessionDepth: 0.4, recentDiversity: 0.6,
    }
  }

  const hours: number[] = []
  const trackCounts = new Map<string, number>()
  const artistSequence: string[] = []

  for (const item of recent) {
    const h = new Date(item.played_at).getHours()
    hours.push(h)
    trackCounts.set(item.track.id, (trackCounts.get(item.track.id) ?? 0) + 1)
    artistSequence.push(item.track.artists[0]?.id ?? "")
  }

  const nightRatio = hours.filter((h) => h >= 22 || h <= 3).length / hours.length
  const lateNightRatio = hours.filter((h) => h >= 0 && h <= 4).length / hours.length
  const morningRatio = hours.filter((h) => h >= 6 && h <= 10).length / hours.length

  const hourFreq = new Array(24).fill(0)
  hours.forEach((h) => hourFreq[h]++)
  const peakHour = hourFreq.indexOf(Math.max(...hourFreq))

  const repeated = [...trackCounts.values()].filter((c) => c > 1).length
  const repetitionScore = repeated / Math.max(trackCounts.size, 1)

  // Session depth: count consecutive same-artist runs, normalize
  let consecutiveRuns = 0
  for (let i = 1; i < artistSequence.length; i++) {
    if (artistSequence[i] === artistSequence[i - 1]) consecutiveRuns++
  }
  const sessionDepth = clamp01(consecutiveRuns / Math.max(artistSequence.length - 1, 1))

  const recentDiversity = clamp01(trackCounts.size / Math.max(recent.length, 1))

  return {
    nightRatio,
    lateNightRatio,
    morningRatio,
    peakHour,
    repetitionScore,
    sessionDepth,
    recentDiversity,
  }
}

// ── Track-level signals ────────────────────────────────────────────────────

export interface TrackSignals {
  avgPopularity: number      // 0–100
  obscurityRatio: number     // 0–1: tracks with popularity < 30
  hitRatio: number           // 0–1: tracks with popularity > 75
  avgDuration: number        // ms — longer = more patient/immersive listener
}

export function extractTrackSignals(tracks: SpotifyTrack[]): TrackSignals {
  if (!tracks.length) {
    return { avgPopularity: 50, obscurityRatio: 0.2, hitRatio: 0.3, avgDuration: 210000 }
  }

  const popularities = tracks.map((t) => t.popularity)
  return {
    avgPopularity: avg(popularities),
    obscurityRatio: popularities.filter((p) => p < 30).length / popularities.length,
    hitRatio: popularities.filter((p) => p > 75).length / popularities.length,
    avgDuration: avg(tracks.map((t) => t.duration_ms)),
  }
}

// ── Composite signal bundle ────────────────────────────────────────────────

export interface SignalBundle {
  audio: AudioSignals
  artists: ArtistSignals
  behavior: BehaviorSignals
  tracks: TrackSignals
  userId: string
}
