/**
 * Spotify Web API client
 * Uses the access token stored in the Supabase session (provider_token)
 * after the user authenticates via Spotify OAuth.
 */

const SPOTIFY_BASE = "https://api.spotify.com/v1"

async function spotifyFetch<T>(
  endpoint: string,
  token: string,
  params?: Record<string, string | number>,
): Promise<T> {
  const url = new URL(`${SPOTIFY_BASE}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Spotify API error ${res.status}: ${body}`)
  }

  return res.json() as Promise<T>
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface SpotifyImage {
  url: string
  width: number | null
  height: number | null
}

export interface SpotifyArtist {
  id: string
  name: string
  genres: string[]
  popularity: number
  images: SpotifyImage[]
}

export interface SpotifyTrack {
  id: string
  name: string
  artists: { id: string; name: string }[]
  album: { name: string; images: SpotifyImage[] }
  popularity: number
  duration_ms: number
}

export interface SpotifyAudioFeatures {
  id: string
  energy: number
  valence: number
  danceability: number
  acousticness: number
  instrumentalness: number
  speechiness: number
  tempo: number
  loudness: number
  mode: number
  key: number
  time_signature: number
}

export interface SpotifyRecentTrack {
  track: SpotifyTrack
  played_at: string
}

export interface SpotifyProfile {
  id: string
  display_name: string
  email: string
  images: SpotifyImage[]
  followers: { total: number }
  country: string
}

// ── API calls ──────────────────────────────────────────────────────────────

export async function getProfile(token: string): Promise<SpotifyProfile> {
  return spotifyFetch<SpotifyProfile>("/me", token)
}

export async function getTopArtists(
  token: string,
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
  limit = 20,
): Promise<{ items: SpotifyArtist[] }> {
  return spotifyFetch("/me/top/artists", token, { time_range: timeRange, limit })
}

export async function getTopTracks(
  token: string,
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
  limit = 50,
): Promise<{ items: SpotifyTrack[] }> {
  return spotifyFetch("/me/top/tracks", token, { time_range: timeRange, limit })
}

export async function getRecentlyPlayed(
  token: string,
  limit = 50,
): Promise<{ items: SpotifyRecentTrack[] }> {
  return spotifyFetch("/me/player/recently-played", token, { limit })
}

export async function getAudioFeatures(
  token: string,
  trackIds: string[],
): Promise<{ audio_features: SpotifyAudioFeatures[] }> {
  // Spotify allows max 100 IDs per request
  const ids = trackIds.slice(0, 100).join(",")
  return spotifyFetch("/audio-features", token, { ids })
}

// ── Aggregate fetch — everything needed for analysis ──────────────────────

export interface SpotifyMusicData {
  profile: SpotifyProfile
  topArtists: SpotifyArtist[]
  topTracks: SpotifyTrack[]
  recentTracks: SpotifyRecentTrack[]
  audioFeatures: SpotifyAudioFeatures[]
  genres: string[]
}

export async function fetchMusicData(token: string): Promise<SpotifyMusicData> {
  const [profile, topArtistsRes, topTracksRes, recentRes] = await Promise.all([
    getProfile(token),
    getTopArtists(token, "medium_term", 20),
    getTopTracks(token, "medium_term", 50),
    getRecentlyPlayed(token, 50),
  ])

  const trackIds = topTracksRes.items.map((t) => t.id)
  const featuresRes = await getAudioFeatures(token, trackIds)

  // Flatten all genres from top artists, deduplicated
  const genreMap = new Map<string, number>()
  for (const artist of topArtistsRes.items) {
    for (const genre of artist.genres) {
      genreMap.set(genre, (genreMap.get(genre) ?? 0) + 1)
    }
  }
  const genres = [...genreMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([g]) => g)
    .slice(0, 12)

  return {
    profile,
    topArtists: topArtistsRes.items,
    topTracks: topTracksRes.items,
    recentTracks: recentRes.items,
    audioFeatures: featuresRes.audio_features.filter(Boolean),
    genres,
  }
}
