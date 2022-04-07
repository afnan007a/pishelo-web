import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { dataPropType } from '@/constants/declarations/AppProps'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/router'

const App = ({ dataProps }: { dataProps: dataPropType }) => {

    const router = useRouter()

    return (
        <div className={`h-full min-h-screen w-full bg-[#242424] text-white`}>
            
        </div>
    )
}

export default App
