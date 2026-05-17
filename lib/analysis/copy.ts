/**
 * Cinematic Copy Generator
 *
 * Generates emotionally precise, non-generic identity copy from a MusicDNA profile.
 * Tone: Spotify Wrapped meets A24 emotional storytelling.
 *
 * Rules:
 * - No generic AI phrasing ("your music reflects your personality")
 * - No therapy language ("you process emotions through music")
 * - No horoscope vagueness ("you are a complex person")
 * - Every line should feel: specific, observational, slightly uncomfortable in its accuracy
 */

import type { MusicDNA } from "./engine"
import type { Archetype } from "./archetypes"
import { stableNoise } from "./signals"

// ── Copy pools ─────────────────────────────────────────────────────────────
// Each pool is for a specific behavioral signal combination.
// Selection is deterministic — based on the user's actual signal values.

// Night + emotional depth
const NIGHT_DEEP_QUOTES = [
  "Your playlist sounds like memories that never left.",
  "You built a whole emotional life inside your headphones.",
  "Some people use music as background. You use it as a mirror.",
  "You don't listen to feel better. You listen to feel understood.",
  "Your music is the place where you're allowed to feel things you can't say out loud.",
]

// Night + moderate emotion (not as dark)
const NIGHT_MODERATE_QUOTES = [
  "You come alive after dark. Your music knows this.",
  "The best version of your playlist only exists after 10pm.",
  "You've had conversations with songs that you couldn't have with people.",
]

// High repetition (attachment)
const REPETITION_QUOTES = [
  "You replay songs like unfinished conversations.",
  "The songs you return to aren't favorites. They're anchors.",
  "You've listened to certain tracks so many times they've stopped being songs and started being feelings.",
  "Your most-played songs are the ones you needed, not the ones you chose.",
]

// High chaos / genre diversity
const CHAOS_QUOTES = [
  "Your playlist has no genre. It has moods.",
  "The algorithm has given up trying to understand you. That's a compliment.",
  "You've gone from classical to drill to bossa nova in the same hour and felt completely fine about it.",
  "Your taste isn't scattered — it's operating on a frequency most people can't track.",
]

// High acoustic / introspective
const ACOUSTIC_QUOTES = [
  "You hear the lyric before the beat.",
  "Your music sounds like 3am feels.",
  "You find songs before they're popular and feel slightly betrayed when everyone else catches up.",
  "Your taste is a diary that only you can read.",
]

// High energy / mainstream / danceability
const ENERGY_QUOTES = [
  "Your playlist doesn't warm up. It arrives.",
  "Your music sounds like the moment before something good happens.",
  "You use music to move forward. Every playlist is a version of yourself you're running toward.",
  "The right song at the right moment can change the entire trajectory of your day.",
]

// Underground / obscure taste
const UNDERGROUND_QUOTES = [
  "You heard it before it had a name.",
  "Your listening history reads like a map of where culture is going, not where it's been.",
  "You've recommended artists to people who came back six months later saying 'have you heard of...' and you just smiled.",
]

// High emotional intensity
const INTENSITY_QUOTES = [
  "Your music taste contains multitudes — and you've stopped apologizing for it.",
  "You feel music differently depending on the day. The same song can destroy you in October and save you in March.",
  "Every song in your library is attached to a feeling you haven't fully processed yet.",
  "You've made playlists for versions of yourself that no longer exist.",
]

// ── Behavioral observation pools ───────────────────────────────────────────

const NIGHT_OBSERVATIONS = [
  "Your listening peaks after 10pm. The world gets quieter and your music gets louder.",
  "You've built a whole emotional life after midnight that most people don't know about.",
  "Late-night listening isn't a habit for you. It's a ritual.",
  "The version of you that exists at 2am has a completely different playlist than the version that exists at 2pm.",
]

const LATE_NIGHT_OBSERVATIONS = [
  "You're most yourself between midnight and 4am. Your music knows this.",
  "The songs you play at 3am are the ones that tell the truth.",
  "There's a version of your listening history that only exists in the dark.",
]

const REPETITION_OBSERVATIONS = [
  "You return to the same songs the way other people return to old journals.",
  "Your most-played tracks aren't your favorites. They're the ones that said something you needed to hear again.",
  "You've listened to certain songs so many times they've become part of your internal monologue.",
  "The songs you repeat are the ones still working something out.",
]

const INTROVERT_OBSERVATIONS = [
  "You've never once put your music on at a party. Not because you're ashamed — because it's yours.",
  "Your headphones aren't accessories. They're a boundary.",
  "You share playlists with very few people. That's intentional.",
  "Your listening history is the most honest version of you that exists.",
]

const CHAOS_OBSERVATIONS = [
  "Your listening history looks like a personality test that breaks the algorithm.",
  "You don't have a genre. You have a mood for every hour of the day.",
  "The people who've seen your full playlist history know something about you that most people don't.",
]

const UNDERGROUND_OBSERVATIONS = [
  "You've been listening to artists for years before they got their moment.",
  "Your taste is a few months ahead of the culture. You've accepted this.",
  "You don't follow trends. You occasionally create them without meaning to.",
]

const ENERGY_OBSERVATIONS = [
  "You use music like a weapon. Every track is a statement.",
  "You've never skipped a song because it was too intense.",
  "Your playlist is a mood board for a life you're actively building.",
]

const ACOUSTIC_OBSERVATIONS = [
  "You listen to albums the way other people read books — start to finish, no skipping.",
  "You've cried to songs that most people would describe as 'chill'.",
  "The songs that hit you hardest are the ones that sound like they were made in a room, not a studio.",
]

// ── Personality trait labels ───────────────────────────────────────────────

const NIGHT_TRAITS = ["night listener", "midnight processor", "nocturnal soul"]
const DEEP_TRAITS = ["emotionally deep", "feeling-first", "emotionally intense"]
const NOSTALGIC_TRAITS = ["nostalgic by nature", "emotionally attached", "memory-driven"]
const CHAOS_TRAITS = ["genre-fluid", "mood-driven", "unpredictable taste"]
const INTROVERT_TRAITS = ["private listener", "solo sessions", "headphones-only"]
const UNDERGROUND_TRAITS = ["underground taste", "ahead of the curve", "culturally precise"]
const ENERGY_TRAITS = ["main character energy", "movement-driven", "high intensity"]
const ACOUSTIC_TRAITS = ["lyric-first", "acoustic soul", "texture listener"]
const INTROSPECTIVE_TRAITS = ["deeply introspective", "slow listener", "patient with music"]

// ── Selector ───────────────────────────────────────────────────────────────

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(Math.abs(seed) * arr.length) % arr.length]
}

/** Multi-dimensional seed — combines several signal values for uniqueness */
function makeSeed(dna: MusicDNA): number {
  const { audio, behavior } = dna.signals
  return (
    audio.valence * 1000 +
    audio.energy * 100 +
    behavior.nightRatio * 10 +
    behavior.repetitionScore
  )
}

// ── Trait selection ────────────────────────────────────────────────────────

function selectTraits(dna: MusicDNA): string[] {
  const { scores, signals } = dna
  const { audio, behavior, artists } = signals
  const traits: Array<{ label: string; weight: number }> = []

  // Score each trait pool by relevance
  if (scores.nightEnergy > 60) traits.push({ label: pick(NIGHT_TRAITS, scores.nightEnergy), weight: scores.nightEnergy })
  if (scores.emotionalDepth > 60) traits.push({ label: pick(DEEP_TRAITS, scores.emotionalDepth), weight: scores.emotionalDepth })
  if (scores.nostalgiaIndex > 55) traits.push({ label: pick(NOSTALGIC_TRAITS, scores.nostalgiaIndex), weight: scores.nostalgiaIndex })
  if (scores.chaosLevel > 55) traits.push({ label: pick(CHAOS_TRAITS, scores.chaosLevel), weight: scores.chaosLevel })
  if (scores.introvertScore > 60) traits.push({ label: pick(INTROVERT_TRAITS, scores.introvertScore), weight: scores.introvertScore })
  if (scores.undergroundScore > 55) traits.push({ label: pick(UNDERGROUND_TRAITS, scores.undergroundScore), weight: scores.undergroundScore })
  if (scores.mainCharacterEnergy > 60) traits.push({ label: pick(ENERGY_TRAITS, scores.mainCharacterEnergy), weight: scores.mainCharacterEnergy })
  if (audio.acousticness > 0.5) traits.push({ label: pick(ACOUSTIC_TRAITS, audio.acousticness * 100), weight: audio.acousticness * 100 })
  if (scores.introspectionLevel > 60) traits.push({ label: pick(INTROSPECTIVE_TRAITS, scores.introspectionLevel), weight: scores.introspectionLevel })

  // Sort by weight, take top 4, deduplicate
  return traits
    .sort((a, b) => b.weight - a.weight)
    .map((t) => t.label)
    .filter((label, i, arr) => arr.indexOf(label) === i)
    .slice(0, 4)
}

// ── Quote selection ────────────────────────────────────────────────────────

function selectIdentityQuote(dna: MusicDNA, archetype: Archetype): string {
  const { scores, signals } = dna
  const { audio, behavior } = signals
  const seed = makeSeed(dna)

  // Use the archetype's own quote as the primary — it's already tuned to the identity
  // But override with a more specific quote when a strong signal dominates

  if (behavior.lateNightRatio > 0.25 && scores.emotionalDepth > 65)
    return pick(NIGHT_DEEP_QUOTES, seed)

  if (scores.chaosLevel > 70)
    return pick(CHAOS_QUOTES, seed)

  if (behavior.repetitionScore > 0.5 && scores.nostalgiaIndex > 60)
    return pick(REPETITION_QUOTES, seed)

  if (scores.undergroundScore > 70)
    return pick(UNDERGROUND_QUOTES, seed)

  if (audio.acousticness > 0.6 && scores.introspectionLevel > 60)
    return pick(ACOUSTIC_QUOTES, seed)

  if (scores.emotionalIntensity > 70)
    return pick(INTENSITY_QUOTES, seed)

  if (audio.energy > 0.7 && audio.valence > 0.6)
    return pick(ENERGY_QUOTES, seed)

  if (behavior.nightRatio > 0.4)
    return pick(NIGHT_MODERATE_QUOTES, seed)

  // Fall back to archetype's own quote
  return archetype.identityQuote
}

// ── Behavioral observation selection ──────────────────────────────────────

function selectBehaviorObservation(dna: MusicDNA): string {
  const { scores, signals } = dna
  const { audio, behavior } = signals
  const seed = makeSeed(dna) + 0.37 // offset so it differs from quote selection

  // Pick the observation that matches the strongest behavioral signal
  const candidates: Array<{ pool: string[]; weight: number }> = [
    { pool: LATE_NIGHT_OBSERVATIONS, weight: behavior.lateNightRatio * 100 },
    { pool: NIGHT_OBSERVATIONS, weight: scores.nightEnergy },
    { pool: REPETITION_OBSERVATIONS, weight: behavior.repetitionScore * 100 },
    { pool: INTROVERT_OBSERVATIONS, weight: scores.introvertScore },
    { pool: CHAOS_OBSERVATIONS, weight: scores.chaosLevel },
    { pool: UNDERGROUND_OBSERVATIONS, weight: scores.undergroundScore },
    { pool: ENERGY_OBSERVATIONS, weight: scores.mainCharacterEnergy },
    { pool: ACOUSTIC_OBSERVATIONS, weight: audio.acousticness * 100 },
  ]

  const top = candidates.sort((a, b) => b.weight - a.weight)[0]
  return pick(top.pool, seed)
}

// ── Playlist personality sentence ─────────────────────────────────────────

function buildPlaylistPersonality(dna: MusicDNA): string {
  const { scores, signals } = dna
  const { audio, behavior, artists } = signals

  // Find the two most dominant signals and combine them into a sentence
  const dominantSignals: Array<{ phrase: string; weight: number }> = [
    { phrase: "a night listener", weight: scores.nightEnergy },
    { phrase: "emotionally deep", weight: scores.emotionalDepth },
    { phrase: "drawn to underground music", weight: scores.undergroundScore },
    { phrase: "genre-fluid", weight: scores.chaosLevel },
    { phrase: "nostalgic by nature", weight: scores.nostalgiaIndex },
    { phrase: "a private listener", weight: scores.introvertScore },
    { phrase: "drawn to high energy", weight: scores.mainCharacterEnergy },
    { phrase: "texture-obsessed", weight: audio.instrumentalness * 100 },
    { phrase: "lyric-first", weight: audio.speechiness * 100 },
    { phrase: "someone who returns to the same songs", weight: behavior.repetitionScore * 100 },
  ]

  const top = dominantSignals
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2)

  if (top.length === 2) {
    return `You are ${top[0].phrase} and ${top[1].phrase}.`
  }
  return `You are ${top[0]?.phrase ?? "a complex listener"}.`
}

// ── Main export ────────────────────────────────────────────────────────────

export interface GeneratedCopy {
  /** The short cinematic quote — the "wow" moment */
  identityQuote: string
  /** The archetype's behavioral insight paragraph */
  behaviorInsight: string
  /** A specific behavioral observation derived from listening patterns */
  listeningObservation: string
  /** A two-signal personality sentence */
  playlistPersonality: string
  /** Named personality traits (3–4) */
  traits: string[]
}

export function generateCopy(dna: MusicDNA, archetype: Archetype): GeneratedCopy {
  return {
    identityQuote: selectIdentityQuote(dna, archetype),
    behaviorInsight: archetype.behaviorInsight,
    listeningObservation: selectBehaviorObservation(dna),
    playlistPersonality: buildPlaylistPersonality(dna),
    traits: selectTraits(dna),
  }
}

/**
 * The single quote shown on the share card.
 * Slightly different selection logic — optimized for social shareability.
 * Should be short, punchy, and feel eerily personal.
 */
export function getShareCardQuote(dna: MusicDNA, archetype: Archetype): string {
  const { scores, signals } = dna
  const { audio, behavior } = signals
  const seed = makeSeed(dna) + 0.71

  // For the share card, prioritize the most "screenshot-worthy" quote
  // — the one that makes someone think "how did it know that"

  if (behavior.lateNightRatio > 0.25 && scores.emotionalDepth > 65)
    return pick(NIGHT_DEEP_QUOTES, seed)

  if (behavior.repetitionScore > 0.5)
    return pick(REPETITION_QUOTES, seed)

  if (scores.chaosLevel > 65)
    return pick(CHAOS_QUOTES, seed)

  if (scores.undergroundScore > 65)
    return pick(UNDERGROUND_QUOTES, seed)

  if (audio.acousticness > 0.55)
    return pick(ACOUSTIC_QUOTES, seed)

  if (scores.emotionalIntensity > 65)
    return pick(INTENSITY_QUOTES, seed)

  if (audio.energy > 0.7 && audio.valence > 0.6)
    return pick(ENERGY_QUOTES, seed)

  return archetype.identityQuote
}
