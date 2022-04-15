import '../styles/globals.css'
import * as api from '@/clients/apiPublic'
import { useEffect, useState } from 'react'
import { dataPropType } from '@/constants/declarations/AppProps'
import type { TypeUsers, TypeChannels } from '@/constants/database/Types'
import { useRouter } from 'next/router';
import { logIt } from "@/clients/index";
import Tracker from '@openreplay/tracker/cjs';

const tracker = new Tracker({
  projectKey: (process.env['NEXT_PUBLIC_OPENREPLAY_KEY'] as string),
  revID: '1',
  __DISABLE_SECURE_MODE: true,
  __debug__: true,
  verbose: true,
  captureExceptions: true,
  captureIFrames: true,
  connAttemptCount: 16,
  connAttemptGap: 5000,
  respectDoNotTrack: false,
  obscureTextEmails: false,
  obscureTextNumbers: false,
  obscureInputEmails: false,
});

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  // Tracker
  useEffect(() => {
    tracker.start();
  }, []);


  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          async function (registration) {
            await window.Notification.requestPermission();
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])


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
  const [userData, setUserData] = useState<TypeUsers | null>(null)
  const [usersData, setUsersData] = useState<Array<TypeUsers> | null>(null)
  const [conversationsData, setConversationsData] = useState<Array<TypeChannels> | null>(null)
  const [appReady, setAppReady] = useState<boolean>(false)
  const [cacheData, setCacheData] = useState<Object>({})

  function updateCache(key, data) {

    let tempCache = cacheData
    tempCache[key] = data

    logIt(`Updating cache with key: ${key}`, {
      level: `info`,
      source: 'app_updateCache',
      raw: {
        key,
        afterdata: tempCache
      }
    })

    setCacheData(tempCache)
    return tempCache
  }
  function getCache(key) {

    const cached = cacheData[key]

    logIt(`Getting cache with key: ${key}`, {
      level: `info`,
      source: 'app_updateCache',
      raw: {
        key,
        data: cached
      }
    })

    if (!cached) return false
    return cached
  }

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
    usersData: {
      state: usersData,
      stateSetter: setUsersData
    },
    conversationsData: {
      state: conversationsData,
      stateSetter: setConversationsData
    },
    appReady: {
      state: appReady,
      stateSetter: setAppReady
    },
    cacheManager: {
      getCache: getCache,
      updateCache: updateCache,
    }
  }

  useEffect(() => {
    (async () => {
      const convodata = await api.conversationData()
      let userstofetch: Array<string> = []
      for (const conversation of convodata) {
        conversation.members.forEach((convomemberid) => {
          userstofetch.push(convomemberid)
        })
      }
      const users = await api.userDataMany(userstofetch)
      setUsersData(users)
      setConversationsData(convodata)

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
    })()
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