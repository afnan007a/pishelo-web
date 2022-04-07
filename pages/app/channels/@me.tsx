import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { dataPropType } from '@/constants/declarations/AppProps'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/router'
import Bottombar from '@/components/Bottombar'
import Sidebar from '@/components/Sidebar'

const App = ({ dataProps }: { dataProps: dataPropType }) => {

    const router = useRouter()

    return (
        <div className={`h-full min-h-screen w-full bg-[#242424] text-white`}>
            <div className={`h-full min-h-screen`}>
                <Sidebar />
            </div>

            <Bottombar userData={dataProps.userData.state} />
        </div>
    )
}

export default App
