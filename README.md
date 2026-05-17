# VibePrint

A cinematic AI music identity experience. Connect your Spotify, get your emotional archetype, share your identity card.

---

## What I Built

VibePrint is a Spotify Wrapped-style product that analyzes a user's listening history and generates a cinematic emotional identity — an archetype, aura label, behavioral insights, and a shareable identity card.

**Core features:**
- Spotify OAuth via Supabase Auth (real OAuth, real token, real data)
- Music DNA analysis engine — derives personality scores from audio features, listening patterns, and genre data
- Archetype matching system — 10 archetypes scored against the user's actual profile
- Cinematic copy generator — emotionally precise, non-generic identity copy
- Result page with dynamic data from real Spotify API
- Share card — screenshot-ready identity poster

**Architecture:**
- `lib/spotify/client.ts` — Spotify Web API wrapper
- `lib/analysis/engine.ts` — Music DNA analysis (energy, valence, night patterns, repetition, etc.)
- `lib/analysis/archetypes.ts` — 10 archetypes with weighted scoring
- `lib/analysis/copy.ts` — Cinematic copy generation
- `app/api/analyze/route.ts` — Server-side analysis endpoint
- `app/result/page.tsx` — Dynamic result page
- `app/share/page.tsx` — Share card

---

## Local Setup

**Requirements:** Node.js 18+, pnpm, Docker

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start local Supabase

```bash
supabase start
```

This prints your local keys. Copy them.

### 3. Create `.env.local`

```bash
cp .env.example .env.local
```

Fill in the values from `supabase start` output:

```env
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="<anon key from supabase start>"
SUPABASE_SERVICE_ROLE_KEY="<service_role key from supabase start>"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Configure Spotify OAuth

1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Create an app
3. Add redirect URI: `http://localhost:3000/api/auth/spotify/callback`
4. Copy Client ID and Client Secret

In your **Supabase Dashboard** (local: http://127.0.0.1:54323):
- Authentication → Providers → Spotify
- Enable Spotify, paste Client ID and Client Secret
- Save

Add to `.env.local`:
```env
SPOTIFY_CLIENT_ID="your-client-id"
SPOTIFY_CLIENT_SECRET="your-client-secret"
```

### 5. Run migrations

```bash
supabase db reset
```

### 6. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## OAuth Flow

```
User clicks "Connect Spotify"
  → supabase.auth.signInWithOAuth({ provider: "spotify" })
  → Redirects to Spotify login
  → Spotify redirects to /api/auth/spotify/callback?code=...
  → Supabase exchanges code for session (includes provider_token = Spotify access token)
  → Redirects to /result
  → /result calls POST /api/analyze
  → Server reads session.provider_token
  → Fetches top artists, top tracks, audio features, recently played from Spotify API
  → Runs analysis engine → archetype matching → copy generation
  → Returns full VibePrint result
  → Page renders with real data
```

---

## Issues During Setup

- The starter template used `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (not the more common `NEXT_PUBLIC_SUPABASE_ANON_KEY`). All client files are consistent with this naming — no mismatch.
- The middleware previously redirected authenticated users to `/listen` which doesn't exist. Fixed to redirect to `/result`.
- Spotify images are served from `i.scdn.co` — added to `next.config.ts` `remotePatterns`.

---

## What I'd Improve With More Time

- **Caching the analysis result** — currently re-fetches Spotify on every `/result` load. Would store the result in Supabase after first analysis, keyed by user ID + timestamp.
- **Token refresh handling** — Spotify access tokens expire after 1 hour. Would implement refresh token flow via Supabase's `provider_refresh_token`.
- **Share card image export** — use `html2canvas` or a server-side Puppeteer route to generate a real PNG for native sharing.
- **More archetypes** — the scoring system is designed to be extended. Would add 5–10 more with more granular genre signals.
- **Mobile polish** — the identity reveal section needs responsive type scaling.
- **Error boundaries** — the result page needs graceful fallbacks if Spotify returns partial data.
- **Rate limiting** on `/api/analyze` — Spotify has API limits; would add per-user cooldowns.
