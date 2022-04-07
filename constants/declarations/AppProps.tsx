
export interface dataPropType {
    spotifyPlayer: {
        state: Spotify.Player | null,
        stateSetter: (state: Spotify.Player | null) => void
    },
    currentContext: {
        state: Spotify.PlaybackState | null,
        stateSetter: (state: Spotify.PlaybackState | null) => void
    }
}