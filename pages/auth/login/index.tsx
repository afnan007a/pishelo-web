import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { dataPropType } from '@/constants/declarations/AppProps'
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/router'
import { userSignup } from '@/clients/apiPublic'
import { supabase } from '@/clients/supabasePublic'
import qrCode from 'qrcode'

const App = ({ dataProps }) => {

    const [isSignIn, setIsSignIn] = useState(true)
    const [showEmailVerification, setShowEmailVerification] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const loginDialogAnimationControl = useAnimation()
    const router = useRouter()

    async function signUpForAccount() {
        userSignup({ email, password, username })
        .then(() => {
            setShowEmailVerification(true)
        })
        .catch((err) => {
            console.log(err)
            setErrorMessage(`${err.reason}` || 'Unknown error')
            return
        })
    }

    async function signInToAccount() {
        const userdata = await supabase.auth.signIn({ email: email, password: password })
        const user = userdata.user || null
        if (user) {
            router.push('/app')
        } else {
            setErrorMessage(`${userdata.error?.message}` || 'Unknown error')
        }
    }

    useEffect(() => {
        qrCode.toCanvas(document.getElementById('qrCodeCanvas'), 'sample text', function (error) {
            if (error) console.error(error)
        })

        loginDialogAnimationControl.start({
            opacity: 1,
            translateY: 0
        })
    }, [])
    

    return (
        <div className={`h-full min-h-screen w-full transition-all`} >
            <div className={`bg-[#242424] transition-all md:bg-transparent`}>
                <img id="backgroundImage" className={`-z-10 absolute w-screen h-screen object-cover`} src={`/assets/authBgImage.jpg`} />

                {/* <div className={`w-full fixed h-20 text-white flex items-center px-7`}>
                    <h1 className={`text-3xl font-black`}>Pishelo</h1>
                </div> */}

                <div className={`w-full min-h-screen h-full flex pt-14 md:pt-0 md:items-center transition-all md:justify-center md:px-16`}>
                    <motion.div
                    animate={loginDialogAnimationControl}
                    initial={{ translateY: -100, opacity: 0 }}
                    transition={{ ease: 'easeOut', duration: 0.3 }}
                    className={`md:bg-[#242424] text-white w-full h-full transition-all ${isSignIn ? `md:w-[650px] lg:w-[850px]` : `md:w-[550px] lg:w-[650px]`} rounded-2xl md:shadow-xl py-5 px-5`}
                    >
                        <div className={`flex items-center ${showEmailVerification ? 'hidden' : 'block'}`}>
                        <div className={`w-full`}>
                            <h1 className={`font-bold text-2xl`}>{`Welcome back! 👋`}</h1>
                            <h3 className={`text-sm text-gray-400`}>Sign into Pishelo</h3>
                            <h3 className={`text-red-300 animate-pulse`}>{errorMessage || ''}</h3>

                            <div className={`mt-7 space-y-3`}>

                                <div id="usernameForm" className={`${isSignIn ? 'hidden' : 'block'}`}>
                                    <h1 className={`text-gray-300 text-sm`}>Username</h1>
                                    <input
                                        placeholder="Enter your username."
                                        type={`text`}
                                        onChange={(ev) => setUsername(ev.currentTarget.value)}
                                        className={`text-white transition-all bg-[#1E1E1E] mt-2 w-full px-4 py-2 rounded-lg focus:outline outline-2 outline-[#FD6571]`}
                                    />
                                </div>

                                <div id="emailForm">
                                    <h1 className={`text-gray-300 text-sm`}>Email Address</h1>
                                    <input 
                                        placeholder="Enter your email."
                                        type={`email`}
                                        onChange={(ev) => setEmail(ev.currentTarget.value)}
                                        className={`text-white transition-all bg-[#1E1E1E] mt-2 w-full px-4 py-2 rounded-lg focus:outline outline-2 outline-[#FD6571]`}
                                    />
                                </div>

                                <div id="passwordForm">
                                    <h1 className={`text-gray-300 text-sm`}>Password</h1>
                                    <input
                                        placeholder="Enter your password."
                                        type={`password`}
                                        onChange={(ev) => setPassword(ev.currentTarget.value)}
                                        className={`text-white transition-all bg-[#1E1E1E] mt-2 w-full px-4 py-2 rounded-lg focus:outline outline-2 outline-[#FD6571]`}
                                    />
                                </div>
                            </div>

                            <div className={`mt-3`}>
                                <button onClick={() => isSignIn ? signInToAccount() : signUpForAccount()} className={`bg-[#181818] hover:bg-indigo-600 font-semibold rounded-xl transition-all mt-4 w-full py-2`}>
                                    <h1>{isSignIn ? 'Login' : 'Register'}</h1>
                                </button>
                            </div>

                            <div className={`text-sm mt-5 space-y-1`}>
                                <div className={`flex space-x-1`}>
                                    <h1>{isSignIn ? `New to Pishelo?` : `Already have an account?`}</h1>
                                    <button onClick={() => setIsSignIn(!isSignIn)} className={`text-red-400`}>{isSignIn ? `Create a new account` : 'Login'}</button>
                                </div>

                                <div className={`flex space-x-1`}>
                                    <h1>Forgot your password?</h1>
                                    <button className={`text-red-400`}>Reset password</button>
                                </div>
                            </div>
                        </div>

                        <div className={`${isSignIn ? 'hidden md:flex' : 'hidden'} flex-col text-center justify-center items-center h-full w-64 ml-10 mr-2`}>
                            <canvas
                                id="qrCodeCanvas"
                                className={`w-40 h-40 rounded-2xl`}
                            />
                            <div className={`mt-8`}>
                                <h1 className={`font-black text-xl`}>Login with QR Code</h1>
                                <h3 className={`text-sm mt-1`}>Scan this with the Pishelo mobile app to log in instantly.</h3>
                            </div>
                        </div>
                    </div>

                        <div className={`${showEmailVerification ? 'block' : 'hidden'}`}>
                            <h1 className={`font-black text-xl`}>Check your email 💖</h1>
                            <h3 className={`font-medium text-md`}>{`If the email you entered has not been signed up before, Click on the verification link sent to your email to continue. 🪐`}</h3>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default App
