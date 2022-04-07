import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { useState } from 'react'
import { dataPropType } from '@/constants/declarations/AppProps'

function MyApp({ Component, pageProps }: AppProps) {
  
  const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player | null>(null)
  const [currentContext, setCurrentContext] = useState<Spotify.PlaybackState | null>(null)
  const dataProps: dataPropType = {
    spotifyPlayer: {
      state: spotifyPlayer,
      stateSetter: setSpotifyPlayer
    },
    currentContext: {
      state: currentContext,
      stateSetter: setCurrentContext
    }
  }

  return (
    <div>
      <div>
        <Script defer src="https://sdk.scdn.co/spotify-player.js" />
      </div>

      <div>
        <Component {...pageProps} dataProps={dataProps} />
      </div>
    </div>
  )
}

export default MyApp