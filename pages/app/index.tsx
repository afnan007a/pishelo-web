import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { supabase } from '@/clients/supabasePublic'

const App = ({ dataProps }) => {

    const router = useRouter()
    const loadingAnimationControl = useAnimation()

    useEffect(() => {
        const user = supabase.auth.user()
        if (!user) {
            router.push('/auth')
            return
        }
        window.location.href = '/app/channels/@me'
    }, [])

    return (
        <div className={`h-full min-h-screen w-full bg-[#242424] text-white`}>
            <motion.div
            animate={loadingAnimationControl}
            className={`w-full min-h-screen flex flex-col justify-center items-center`}
            >
                <h1 className={`text-7xl animate-pulse`}>{`ʕ•́ᴥ•̀ʔっ`}</h1>
                {/* <h3 className={`mt-3`}>Loading Pishelchat</h3> */}
                <div className={`mt-7 text-center`}>
                    <h1 className={`font-semibold text-sm text-gray-400`}>Did you know:</h1>
                    <h3 className={`font-medium text-sm text-gray-200`}>pancakes is all I know.</h3>
                </div>
            </motion.div>
        </div>
    )
}

export default App
