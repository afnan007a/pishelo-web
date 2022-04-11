import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { dataPropType } from '@/constants/declarations/AppProps'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/router'
import Bottombar from '@/components/Bottombar'
import Sidebar from '@/components/Sidebar'
import LoadingScreen from '@/components/LoadingScreen'
import Settings from '@/components/Settings'

const App = ({ dataProps }) => {

    const router = useRouter()
    const { state: appReady, stateSetter: setAppReady } = dataProps.appReady
    const { state: userData, stateSetter: setUserData } = dataProps.userData
    

    return (
        <div className={`h-full min-h-screen w-full bg-[#333842] text-white`}>
            <LoadingScreen
                appReady={appReady}
            />
            <div className={`h-full flex min-h-screen w-full`}>
                <Sidebar
                    dataProps={dataProps}
                />

                <div className={`bg-orange-400 w-full h-full`}>
                    <h1>hi</h1>
                </div>
            </div>

            <Bottombar
            dataProps={dataProps}
            />
        </div>
    )
}

export default App
