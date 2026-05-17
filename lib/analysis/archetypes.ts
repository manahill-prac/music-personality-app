/**
 * Archetype Engine
 *
 * 12 archetypes, each with a distinct emotional fingerprint.
 * Matching uses weighted scoring against PersonalityScores + SignalBundle.
 * Archetypes are designed to be mutually exclusive at the extremes
 * and meaningfully differentiated in the middle.
 */

import type { MusicDNA, PersonalityScores } from "./engine"
import type { SignalBundle } from "./signals"

// ── Archetype definitions ──────────────────────────────────────────────────

export interface Archetype {
  id: string
  title: string
  auraLabel: string
  /** One-line emotional tone */
  tone: string
  /** The short cinematic quote — the "wow" moment */
  identityQuote: string
  /** Longer behavioral observation — 2–3 sentences */
  behaviorInsight: string
  /** Tailwind gradient for visual card */
  gradient: string
  /** Named personality traits */
  traits: string[]
}

export const ARCHETYPES: Archetype[] = [
  {
    id: "midnight-dreamer",
    title: "Midnight Dreamer",
    auraLabel: "Emotional Synthwave Soul",
    tone: "Introspective, emotionally deep, private",
    identityQuote: "Your playlist sounds like memories that never left.",
    behaviorInsight: "You don't just listen to music. You disappear into it — usually after midnight, usually alone, usually feeling something you haven't named yet. The songs you return to aren't favorites. They're anchors.",
    gradient: "from-violet-500 to-cyan-500",
    traits: ["night listener", "emotionally deep", "nostalgic by nature", "private world"],
  },
  {
    id: "indie-philosopher",
    title: "Indie Philosopher",
    auraLabel: "Warm Analog Intimacy",
    tone: "Thoughtful, lyric-first, quietly intense",
    identityQuote: "You hear the lyric before the beat.",
    behaviorInsight: "Your music taste is a private language. You've recommended songs to people who didn't get it, and that told you everything you needed to know about them. You find albums before they're popular and feel slightly betrayed when everyone else catches up.",
    gradient: "from-emerald-400 to-teal-500",
    traits: ["lyric-first", "artist loyal", "underground taste", "emotionally precise"],
  },
  {
    id: "hype-beast",
    title: "Hype Beast",
    auraLabel: "Kinetic Street Energy",
    tone: "Confident, high-energy, unapologetic",
    identityQuote: "Your playlist doesn't warm up. It arrives.",
    behaviorInsight: "You use music like a weapon. Every track is a statement. You've never once skipped the intro because the intro is the whole point — it's the moment before you walk in.",
    gradient: "from-pink-500 to-orange-400",
    traits: ["main character energy", "high intensity", "movement-driven", "zero apology"],
  },
  {
    id: "neon-romantic",
    title: "Neon Romantic",
    auraLabel: "Velvet Soul Resonance",
    tone: "Emotionally expressive, nostalgic, cinematic",
    identityQuote: "You replay songs like unfinished conversations.",
    behaviorInsight: "Every song in your library is attached to a feeling, a person, or a version of yourself you're not ready to let go of. You've made playlists for people who will never hear them. That's not sad — that's just how you love.",
    gradient: "from-rose-400 to-fuchsia-500",
    traits: ["emotionally attached", "nostalgic", "cinematic listener", "deeply feeling"],
  },
  {
    id: "bedroom-poet",
    title: "Bedroom Poet",
    auraLabel: "Midnight Acoustic Reverie",
    tone: "Sensitive, creative, emotionally honest",
    identityQuote: "Your music sounds like 3am feels.",
    behaviorInsight: "You listen with headphones even when you're alone. Not because you need to — because the music is for you, not the room. Your taste is a diary that only you can read.",
    gradient: "from-indigo-400 to-violet-500",
    traits: ["headphones only", "emotionally honest", "late-night creative", "acoustic soul"],
  },
  {
    id: "chaos-listener",
    title: "Chaos Listener",
    auraLabel: "Electric Euphoria Field",
    tone: "Unpredictable, genre-fluid, high-stimulation",
    identityQuote: "Your playlist has no genre. It has moods.",
    behaviorInsight: "You've gone from classical to drill to bossa nova in the same hour and felt completely fine about it. The algorithm has given up trying to understand you. That's a compliment. Your taste isn't scattered — it's just operating on a frequency most people can't track.",
    gradient: "from-lime-400 to-cyan-500",
    traits: ["genre-fluid", "high stimulation", "unpredictable", "mood-driven"],
  },
  {
    id: "velvet-static",
    title: "Velvet Static",
    auraLabel: "Ambient Consciousness Stream",
    tone: "Atmospheric, cerebral, texture-obsessed",
    identityQuote: "You listen to music the way other people stare out windows.",
    behaviorInsight: "You're not looking for a song to sing along to. You're looking for a frequency that matches the inside of your head. Texture matters more than melody. Atmosphere matters more than lyrics. You use music to think.",
    gradient: "from-slate-500 to-violet-600",
    traits: ["texture over melody", "cerebral listener", "ambient immersion", "focus-driven"],
  },
  {
    id: "lunar-introvert",
    title: "Lunar Introvert",
    auraLabel: "Nocturnal Emotional Depth",
    tone: "Quiet, deeply feeling, self-contained",
    identityQuote: "Your music is a private world. You built it alone.",
    behaviorInsight: "You've never once put your music on at a party. Not because you're ashamed — because it's yours. Some things aren't meant to be shared. Your listening history is the most honest version of you that exists.",
    gradient: "from-blue-500 to-violet-500",
    traits: ["private listener", "solo sessions", "emotionally self-contained", "night world"],
  },
  {
    id: "sunset-runner",
    title: "Sunset Runner",
    auraLabel: "Radiant Emotional Frequency",
    tone: "Optimistic, kinetic, emotionally open",
    identityQuote: "Your music sounds like the moment before something good happens.",
    behaviorInsight: "You use music to move forward. Every playlist is a version of yourself you're running toward. You don't listen to process — you listen to propel. The right song at the right moment can change the entire trajectory of your day.",
    gradient: "from-orange-400 to-yellow-400",
    traits: ["forward momentum", "emotionally open", "movement-based", "optimistic energy"],
  },
  {
    id: "digital-melancholic",
    title: "Digital Melancholic",
    auraLabel: "Cinematic Heartbreak Energy",
    tone: "Emotionally intense, aesthetically precise, quietly devastated",
    identityQuote: "You've built a whole emotional life inside your headphones.",
    behaviorInsight: "Your music is the place where you're allowed to feel things you can't say out loud. The songs you love most are the ones that articulate something you thought was untranslatable. You don't listen to feel better. You listen to feel understood.",
    gradient: "from-violet-600 to-blue-600",
    traits: ["emotionally intense", "aesthetically precise", "introspective", "deeply private"],
  },
  {
    id: "echo-heart",
    title: "Echo Heart",
    auraLabel: "Layered Emotional Spectrum",
    tone: "Empathetic, emotionally complex, deeply human",
    identityQuote: "Your music taste contains multitudes.",
    behaviorInsight: "You feel music differently depending on the day. The same song can destroy you in October and save you in March. You've made peace with that. Your taste isn't inconsistent — it's emotionally honest.",
    gradient: "from-teal-400 to-rose-400",
    traits: ["emotionally complex", "mood-matched", "deeply empathetic", "multidimensional"],
  },
  {
    id: "underground-oracle",
    title: "Underground Oracle",
    auraLabel: "Underground Emotional Current",
    tone: "Discerning, ahead of the curve, quietly superior",
    identityQuote: "You heard it before it had a name.",
    behaviorInsight: "You don't follow the algorithm — you precede it. Your listening history reads like a map of where culture is going, not where it's been. You've recommended artists to people who came back six months later saying 'have you heard of...' and you just smiled.",
    gradient: "from-zinc-600 to-violet-700",
    traits: ["underground taste", "ahead of the curve", "discerning", "culturally precise"],
  },
]

// ── Matching logic ─────────────────────────────────────────────────────────

/**
 * Score each archetype against the user's MusicDNA.
 * Each archetype has a unique scoring formula that emphasizes
 * the signals most characteristic of that identity.
 */
export function matchArchetype(dna: MusicDNA): { archetype: Archetype; score: number }[] {
  const { scores, signals } = dna
  const { audio, artists, behavior } = signals

  const results = ARCHETYPES.map((archetype) => {
    let score = 0

    switch (archetype.id) {

      case "midnight-dreamer":
        // Night + emotional depth + introversion + dark valence
        score =
          scores.nightEnergy * 0.30 +
          scores.emotionalDepth * 0.30 +
          scores.introvertScore * 0.20 +
          audio.darkRatio * 100 * 0.15 +
          behavior.lateNightRatio * 100 * 0.05
        break

      case "indie-philosopher":
        // Acoustic + underground + introspection + low danceability
        score =
          audio.acousticness * 100 * 0.30 +
          scores.undergroundScore * 0.25 +
          scores.introspectionLevel * 0.25 +
          (1 - audio.danceability) * 100 * 0.20
        break

      case "hype-beast":
        // Energy + danceability + mainstream + main character
        score =
          audio.energy * 100 * 0.30 +
          audio.danceability * 100 * 0.25 +
          scores.mainCharacterEnergy * 0.25 +
          artists.mainstreamRatio * 100 * 0.20
        break

      case "neon-romantic":
        // Repetition (attachment) + nostalgia + emotional depth + moderate valence
        score =
          behavior.repetitionScore * 100 * 0.30 +
          scores.nostalgiaIndex * 0.30 +
          scores.emotionalDepth * 0.25 +
          (audio.valence > 0.3 && audio.valence < 0.7 ? 15 : 0) // mid-valence = bittersweet
        break

      case "bedroom-poet":
        // Acoustic + instrumental + low energy + introvert + night
        score =
          audio.acousticness * 100 * 0.25 +
          audio.instrumentalness * 100 * 0.20 +
          (1 - audio.energy) * 100 * 0.20 +
          scores.introvertScore * 0.20 +
          scores.introspectionLevel * 0.15
        break

      case "chaos-listener":
        // Energy variance + low repetition + genre diversity + high chaos
        score =
          scores.chaosLevel * 0.35 +
          audio.energyVariance * 100 * 0.25 +
          (1 - behavior.repetitionScore) * 100 * 0.25 +
          (1 - artists.genreConcentration) * 100 * 0.15
        break

      case "velvet-static":
        // Instrumentalness + low valence + acoustic + low danceability
        score =
          audio.instrumentalness * 100 * 0.35 +
          (1 - audio.valence) * 100 * 0.25 +
          audio.acousticness * 100 * 0.20 +
          (1 - audio.danceability) * 100 * 0.20
        break

      case "lunar-introvert":
        // Introvert + night + low chaos + emotional depth + low mainstream
        score =
          scores.introvertScore * 0.30 +
          scores.nightEnergy * 0.25 +
          (100 - scores.chaosLevel) * 0.20 +
          scores.emotionalDepth * 0.15 +
          scores.undergroundScore * 0.10
        break

      case "sunset-runner":
        // High valence + energy + danceability + main character + morning listening
        score =
          audio.valence * 100 * 0.30 +
          audio.energy * 100 * 0.25 +
          scores.mainCharacterEnergy * 0.20 +
          audio.danceability * 100 * 0.15 +
          behavior.morningRatio * 100 * 0.10
        break

      case "digital-melancholic":
        // Dark ratio + emotional intensity + introspection + low chaos + electronic
        score =
          audio.darkRatio * 100 * 0.30 +
          scores.emotionalIntensity * 0.25 +
          scores.introspectionLevel * 0.25 +
          (artists.hasElectronic ? 15 : 0) +
          (100 - scores.chaosLevel) * 0.05
        break

      case "echo-heart":
        // High mood variance (feels everything) + balanced scores + nostalgia
        score =
          audio.moodVariance * 200 * 0.30 + // high variance = feels many things
          scores.nostalgiaIndex * 0.25 +
          scores.emotionalDepth * 0.25 +
          (Math.abs(scores.introvertScore - 50) < 20 ? 20 : 0) // balanced introvert/extrovert
        break

      case "underground-oracle":
        // Underground score + obscurity + low mainstream + genre diversity
        score =
          scores.undergroundScore * 0.40 +
          artists.undergroundRatio * 100 * 0.25 +
          (1 - artists.mainstreamRatio) * 100 * 0.20 +
          (1 - artists.genreConcentration) * 100 * 0.15
        break
    }

    return { archetype, score: Math.round(score) }
  })

  return results.sort((a, b) => b.score - a.score)
}

export function getPrimaryArchetype(dna: MusicDNA): Archetype {
  return matchArchetype(dna)[0].archetype
}

/**
 * Match percentage: how strongly the top archetype dominates.
 * Expressed as a percentage of the theoretical maximum score.
 * Capped at 99 — nobody is 100% anything.
 */
export function getMatchPercentage(dna: MusicDNA): number {
  const ranked = matchArchetype(dna)
  const top = ranked[0].score
  const second = ranked[1]?.score ?? 0
  // Gap between 1st and 2nd place amplifies the match confidence
  const gap = top - second
  const base = Math.min(top, 85)
  const bonus = Math.min(gap * 0.3, 14)
  return Math.min(99, Math.round(base + bonus))
}
