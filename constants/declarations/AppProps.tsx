import type { TypeUsers, TypeChannels } from '@/constants/database/Types'
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
        state: TypeUsers | null,
        stateSetter: (state: TypeUsers | null) => void
    },
    usersData: {
        state: Array<TypeUsers> | null,
        stateSetter: (state: Array<TypeUsers> | null) => void
    },
    conversationsData: {
        state: Array<TypeChannels> | null,
        stateSetter: (state: Array<TypeChannels> | null) => void
    },
    appReady: {
        state: boolean,
        stateSetter: (state: boolean) => void
    },
    cacheManager: {
        getCache: (key: string) => any,
        updateCache: (key: string, data: any) => any,
    }
}