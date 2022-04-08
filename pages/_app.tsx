import '../styles/globals.css'
import * as api from '@/clients/apiPublic'
import { useEffect, useState } from 'react'
import { dataPropType } from '@/constants/declarations/AppProps'
import type { Users } from "@prisma/client";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  // Requires
  const needsUserAuth = [
    '/app'
  ]
  
  function checkIfNeed(array:Array<string>, url:string):boolean {
    let result = false
    for (const path of array) {
      if (url.includes(path)) {
        result = true
        break;
      }
    }
    return result
  }
  
  const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player | null>(null)
  const [currentContext, setCurrentContext] = useState<Spotify.PlaybackState | null>(null)
  const [userData, setUserData] = useState<Users | null>(null)
  const [appReady, setAppReady] = useState<boolean>(false)
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
    },
    appReady: {
      state: appReady,
      stateSetter: setAppReady
    }
  }

  useEffect(() => {
    async function checkIfPageNeedsData(url) {
      if (checkIfNeed(needsUserAuth, url)) {
        const user = await api.checkIfAuth()
        if (user) {
          const userData = await api.userData()
          setUserData(userData)
        } else {
          router.push('/auth')
        }
      }
      setAppReady(true)
    }
    checkIfPageNeedsData(router.pathname)

    function handleRouteChange(url) {
      checkIfPageNeedsData(url)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
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