"use client"

import { supabase } from "@/lib/supabase/client"

interface Props {
  variant?: "nav" | "hero"
  className?: string
  children?: React.ReactNode
}

export function SpotifyConnectButton({ variant = "nav", className, children }: Props) {
  const handleConnect = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/spotify/callback`,
        scopes: [
          "user-read-private",
          "user-read-email",
          "user-top-read",
          "user-read-recently-played",
          "user-read-playback-state",
        ].join(" "),
        queryParams: {
          show_dialog: "true",
        },
      },
    })
    if (error) {
      // OAuth redirect failed — surface to user rather than silently swallowing
      window.location.href = "/?error=spotify_connect_failed"
    }
  }

  if (variant === "hero") {
    return (
      <button
        type="button"
        aria-label="Connect your Spotify account to analyze your music identity"
        onClick={handleConnect}
        className={className}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label="Connect Spotify"
      onClick={handleConnect}
      className={className}
    >
      {children ?? "Connect Spotify"}
    </button>
  )
}
