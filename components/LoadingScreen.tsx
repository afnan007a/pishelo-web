import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

function LoadingScreen({ appReady }) {

    const loadingAnimationControl = useAnimation()
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        if (appReady == true) {
            setHidden(true)
        }
    }, [])
    

    useEffect(() => {
        if (appReady == true) {
            loadingAnimationControl.start({
                opacity: 0
            }).then(() => {
                setHidden(true)
            })
        } else {
            loadingAnimationControl.start({
                opacity: 1
            })
        }
    }, [appReady])
    

    return (
        <motion.div
        animate={loadingAnimationControl}
            className={`absolute ${hidden ? 'hidden' : ''} z-50 top-0 bottom-0 left-0 right-0 h-full min-h-screen w-full bg-[#242424] text-white`}>
            <div className={`w-full min-h-screen flex flex-col justify-center items-center`} >
                <h1 className={`text-7xl animate-pulse`}>{`ʕ•́ᴥ•̀ʔっ`}</h1>
                {/* <h3 className={`mt-3`}>Loading Pishelchat</h3> */}
                <div className={`mt-7 text-center`}>
                    <h1 className={`font-semibold text-sm text-gray-400`}>Did you know:</h1>
                    <h3 className={`font-medium text-sm text-gray-200`}>pancakes is all I know.</h3>
                </div>
            </div>
        </motion.div>
    )
}

export default LoadingScreen