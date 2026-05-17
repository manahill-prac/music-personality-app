/**
 * Music DNA Analysis Engine
 *
 * Transforms raw Spotify data into a psychologically grounded identity profile.
 * All outputs are deterministic — derived from real listening behavior.
 * No random generation. No generic summaries.
 */

import type { SpotifyMusicData } from "@/lib/spotify/client"
import {
  extractAudioSignals,
  extractArtistSignals,
  extractBehaviorSignals,
  extractTrackSignals,
  clamp100,
  clamp01,
  stableNoise,
  type SignalBundle,
} from "./signals"

// ── Output types ───────────────────────────────────────────────────────────

/**
 * Named personality scores — each 0–100.
 * These are the "dimensions" of the identity, not raw audio features.
 */
export interface PersonalityScores {
  /** How much of the listening happens at night and in emotional darkness */
  nightEnergy: number
  /** Depth of emotional processing — low valence + repetition + acousticness */
  emotionalDepth: number
  /** Unpredictability — genre diversity + low repetition + high energy variance */
  chaosLevel: number
  /** Attachment to the past — repetition + low popularity + acoustic warmth */
  nostalgiaIndex: number
  /** Confidence and outward energy — high valence + energy + mainstream taste */
  mainCharacterEnergy: number
  /** Private, inward listening — acoustic + instrumental + night + low social signals */
  introvertScore: number
  /** Physical movement energy */
  danceability: number
  /** How underground vs mainstream the taste is (100 = fully underground) */
  undergroundScore: number
  /** Emotional intensity — how extreme the feelings in the music are */
  emotionalIntensity: number
  /** Introspection — slow, acoustic, lyric-forward, low danceability */
  introspectionLevel: number
}

export interface MusicDNA {
  signals: SignalBundle
  scores: PersonalityScores
  topGenres: string[]
  compatibilityScore: number  // 0–100: how strongly the identity converges
  listeningMood: string       // short label for the dominant listening state
  aura: string                // cinematic aura title
  peakHour: number            // 0–23
  nightRatioPct: number       // 0–100
  repetitionPct: number       // 0–100
}

// ── Score derivation ───────────────────────────────────────────────────────

function deriveScores(bundle: SignalBundle): PersonalityScores {
  const { audio, artists, behavior, tracks, userId } = bundle
  const noise = stableNoise(userId) * 4 // max ±4 point micro-variation

  // Night energy: night listening ratio is the primary driver
  // Secondary: dark valence, high energy (night music tends to be intense)
  const nightEnergy = clamp100(
    behavior.nightRatio * 55 +
    behavior.lateNightRatio * 20 +
    audio.darkRatio * 15 +
    audio.intenseRatio * 5 +
    noise,
  )

  // Emotional depth: the "feeling deeply" dimension
  // Low valence + repetition (returning to same songs) + acoustic texture + long tracks
  const emotionalDepth = clamp100(
    audio.darkRatio * 30 +
    (1 - audio.valence) * 20 +
    behavior.repetitionScore * 25 +
    audio.acousticness * 15 +
    (tracks.avgDuration > 240000 ? 5 : 0) + // long tracks = patient, deep listener
    noise,
  )

  // Chaos level: unpredictability and genre-fluidity
  // High energy variance + low repetition + genre diversity + high tempo
  const chaosLevel = clamp100(
    audio.energyVariance * 80 +           // high variance = chaotic taste
    (1 - behavior.repetitionScore) * 30 + // low repetition = always seeking new
    (1 - artists.genreConcentration) * 25 +
    (audio.tempo > 140 ? 10 : 0) +
    noise,
  )

  // Nostalgia index: attachment to familiar, warm, repeated sounds
  // Repetition + acoustic warmth + underground (pre-mainstream) taste
  const nostalgiaIndex = clamp100(
    behavior.repetitionScore * 40 +
    audio.acousticness * 20 +
    behavior.sessionDepth * 20 +          // deep artist sessions = loyalty
    artists.undergroundRatio * 10 +       // underground = pre-discovery nostalgia
    (1 - audio.danceability) * 10 +
    noise,
  )

  // Main character energy: outward, confident, high-energy listening
  // High valence + energy + mainstream taste + danceability
  const mainCharacterEnergy = clamp100(
    audio.brightRatio * 30 +
    audio.valence * 25 +
    audio.energy * 20 +
    artists.mainstreamRatio * 15 +
    audio.danceability * 10 +
    noise,
  )

  // Introvert score: private, inward, solo listening
  // Acoustic + instrumental + night + low danceability + underground
  const introvertScore = clamp100(
    audio.acousticness * 25 +
    audio.instrumentalness * 20 +
    behavior.nightRatio * 20 +
    (1 - audio.danceability) * 20 +
    artists.undergroundRatio * 10 +
    noise,
  )

  // Danceability: direct from audio features
  const danceability = clamp100(audio.danceability * 100)

  // Underground score: how far from mainstream the taste is
  const undergroundScore = clamp100(
    artists.undergroundRatio * 50 +
    tracks.obscurityRatio * 30 +
    (1 - artists.mainstreamRatio) * 20 +
    noise,
  )

  // Emotional intensity: how extreme the emotional content is
  // High dark OR high bright (not middle) + high energy + loud
  const polarization = Math.max(audio.darkRatio, audio.brightRatio) // extreme in either direction
  const emotionalIntensity = clamp100(
    polarization * 40 +
    audio.intenseRatio * 30 +
    (1 - audio.moodVariance * 2) * 15 + // consistent mood = intentional emotional state
    Math.abs(audio.loudness + 8) * 0.5 + // louder = more intense
    noise,
  )

  // Introspection level: slow, thoughtful, lyric-forward listening
  // Low energy + acoustic + low danceability + long tracks + speechiness (lyrics matter)
  const introspectionLevel = clamp100(
    (1 - audio.energy) * 30 +
    audio.acousticness * 25 +
    (1 - audio.danceability) * 20 +
    audio.speechiness * 15 +
    (tracks.avgDuration > 240000 ? 10 : 0) +
    noise,
  )

  return {
    nightEnergy,
    emotionalDepth,
    chaosLevel,
    nostalgiaIndex,
    mainCharacterEnergy,
    introvertScore,
    danceability,
    undergroundScore,
    emotionalIntensity,
    introspectionLevel,
  }
}

// ── Listening mood ─────────────────────────────────────────────────────────

function deriveListeningMood(bundle: SignalBundle, scores: PersonalityScores): string {
  const { audio, behavior } = bundle

  // Priority order: most specific first
  if (behavior.lateNightRatio > 0.3 && audio.darkRatio > 0.4)
    return "Late-night emotional processing"
  if (behavior.nightRatio > 0.5 && audio.valence < 0.4)
    return "Nocturnal introspection"
  if (scores.chaosLevel > 65 && audio.energyVariance > 0.2)
    return "Controlled emotional chaos"
  if (audio.instrumentalness > 0.4 && audio.energy < 0.5)
    return "Deep focus immersion"
  if (audio.energy > 0.75 && audio.danceability > 0.7)
    return "Kinetic euphoria"
  if (audio.acousticness > 0.6 && audio.valence < 0.5)
    return "Quiet emotional processing"
  if (behavior.repetitionScore > 0.5 && audio.darkRatio > 0.3)
    return "Emotional anchor seeking"
  if (audio.valence > 0.7 && audio.energy > 0.65)
    return "Radiant forward momentum"
  if (scores.introspectionLevel > 65)
    return "Reflective solitude"
  if (audio.danceability > 0.7)
    return "Joyful physical release"
  return "Layered emotional wandering"
}

// ── Aura title ─────────────────────────────────────────────────────────────

function deriveAura(bundle: SignalBundle, scores: PersonalityScores): string {
  const { audio, artists, behavior } = bundle

  // Aura is derived from the intersection of genre + emotional profile + behavior
  // Each combination produces a specific cinematic label

  if (behavior.nightRatio > 0.45 && audio.darkRatio > 0.4) {
    if (artists.hasElectronic) return "Emotional Synthwave Soul"
    if (artists.hasRnb) return "Velvet Midnight Frequency"
    if (artists.hasAcoustic) return "Midnight Acoustic Reverie"
    if (artists.hasRap) return "Nocturnal Street Consciousness"
    return "Cinematic Heartbreak Energy"
  }

  if (scores.chaosLevel > 65) {
    if (artists.hasElectronic) return "Electric Chaos Frequency"
    if (artists.hasRap) return "Kinetic Street Energy"
    return "Neon Memory Frequency"
  }

  if (audio.acousticness > 0.55 && audio.valence < 0.5) {
    if (artists.hasJazz) return "Warm Jazz Melancholia"
    if (artists.hasClassical) return "Orchestral Emotional Depth"
    return "Warm Analog Intimacy"
  }

  if (audio.instrumentalness > 0.35) {
    if (artists.hasClassical) return "Ambient Classical Consciousness"
    if (artists.hasElectronic) return "Ambient Consciousness Stream"
    return "Textural Emotional Depth"
  }

  if (audio.valence > 0.65 && audio.energy > 0.65) {
    if (artists.hasLatin) return "Solar Latin Euphoria"
    if (artists.hasPop) return "Radiant Pop Frequency"
    return "Radiant Emotional Frequency"
  }

  if (artists.hasRnb && audio.valence > 0.45) return "Velvet Soul Resonance"
  if (artists.hasRock && audio.energy > 0.6) return "Raw Electric Catharsis"
  if (artists.hasMetal) return "Controlled Sonic Intensity"
  if (scores.nostalgiaIndex > 65) return "Nostalgic Analog Warmth"
  if (scores.undergroundScore > 65) return "Underground Emotional Current"

  return "Layered Emotional Spectrum"
}

// ── Compatibility score ────────────────────────────────────────────────────

/**
 * How "readable" the identity is — how strongly the signals converge.
 * High when scores are extreme and consistent. Low when everything is average.
 * This is the "match percentage" shown to the user.
 */
function deriveCompatibility(scores: PersonalityScores, userId: string): number {
  const values = Object.values(scores)
  // Measure how far scores deviate from the neutral midpoint (50)
  const avgDeviation = values.reduce((sum, v) => sum + Math.abs(v - 50), 0) / values.length
  // More deviation = stronger identity signal = higher compatibility
  const base = 55 + avgDeviation * 0.7
  // Add small stable per-user offset so it feels personal
  const noise = stableNoise(userId + "compat") * 6
  return clamp100(base + noise)
}

// ── Main export ────────────────────────────────────────────────────────────

export function analyzeMusicDNA(data: SpotifyMusicData): MusicDNA {
  // Build all genre strings for signal extraction
  const allGenreStrings: string[] = []
  for (const artist of data.topArtists) {
    allGenreStrings.push(...artist.genres)
  }

  const bundle: SignalBundle = {
    audio: extractAudioSignals(data.audioFeatures),
    artists: extractArtistSignals(data.topArtists, allGenreStrings),
    behavior: extractBehaviorSignals(data.recentTracks),
    tracks: extractTrackSignals(data.topTracks),
    userId: data.profile.id,
  }

  const scores = deriveScores(bundle)
  const listeningMood = deriveListeningMood(bundle, scores)
  const aura = deriveAura(bundle, scores)
  const compatibilityScore = deriveCompatibility(scores, data.profile.id)

  return {
    signals: bundle,
    scores,
    topGenres: bundle.artists.dominantGenres.slice(0, 6),
    compatibilityScore,
    listeningMood,
    aura,
    peakHour: bundle.behavior.peakHour,
    nightRatioPct: clamp100(bundle.behavior.nightRatio * 100),
    repetitionPct: clamp100(bundle.behavior.repetitionScore * 100),
  }
}
