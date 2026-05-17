import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

/**
 * Supabase OAuth callback handler.
 * Supabase redirects here after Spotify authentication.
 * The code is exchanged for a session which includes provider_token (Spotify access token).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/result"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }

    console.error("[Spotify callback] Exchange error:", error)
  }

  // On error, redirect to home with error param
  return NextResponse.redirect(`${origin}/?error=spotify_auth_failed`)
}
