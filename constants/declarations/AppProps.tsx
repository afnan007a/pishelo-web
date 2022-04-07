import type { Users } from "@prisma/client";
export interface dataPropType {
    spotifyPlayer: {
        state: Spotify.Player | null,
        stateSetter: (state: Spotify.Player | null) => void
    },
    currentContext: {
        state: Spotify.PlaybackState | null,
        stateSetter: (state: Spotify.PlaybackState | null) => void
    },
    userData: {
        state: Users | null,
        stateSetter: (state: Users | null) => void
    }
}