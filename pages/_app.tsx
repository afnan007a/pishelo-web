import '../styles/globals.css'
import * as api from '@/clients/apiPublic'
import { useEffect, useState } from 'react'
import { dataPropType } from '@/constants/declarations/AppProps'
import type { Users } from "@prisma/client";

function MyApp({ Component, pageProps }) {
  
  const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player | null>(null)
  const [currentContext, setCurrentContext] = useState<Spotify.PlaybackState | null>(null)
  const [userData, setUserData] = useState<Users | null>(null)
  const dataProps: dataPropType = {
    spotifyPlayer: {
      state: spotifyPlayer,
      stateSetter: setSpotifyPlayer
    },
    currentContext: {
      state: currentContext,
      stateSetter: setCurrentContext
    },
    userData: {
      state: userData,
      stateSetter: setUserData
    }
  }

  useEffect(() => {
    api.userData().then((userData) => {
      setUserData(userData)
    })
  }, [])
  

  return (
    <div>
      <div>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        {/* <Script defer src="https://sdk.scdn.co/spotify-player.js" /> */}
      </div>

      <div>
        <Component {...pageProps} dataProps={dataProps} />
      </div>
    </div>
  )
}

export default MyApp