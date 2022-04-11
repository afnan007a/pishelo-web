import { PeopleOutline, ColorWandOutline, ShieldCheckmarkOutline, HelpCircle } from 'react-ionicons'
import { supabase } from '@/clients/supabasePublic'
import type { User } from '@supabase/supabase-js'
import * as React from 'react';
import { useState, useEffect } from 'react';
import SmallDialog from '@/components/smallDialog';
import LoadingScreen from '@/components/LoadingScreen';
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/router';

function AccountSettings({ dataProps }) {

    const router = useRouter()
    const { state: userData, stateSetter: setUserData } = dataProps.userData
    const { state: appReady, stateSetter: setAppReady } = dataProps.appReady
    const [user, setUser] = useState<User | null>(null)
    const settingsAnimationControl = useAnimation()

    useEffect(() => {
        const user = supabase.auth.user()
        setUser(user)
    }, [])

    useEffect(() => {
        if (appReady == true) {
            settingsAnimationControl.start({
                scale: 1
            })
        }
    }, [appReady])

    function backToChat() {
        settingsAnimationControl.start({
            scale: 1.2
        })
        setTimeout(() => {
            router.back()
        }, 100);
    }
    

    return (
        <div>
            <LoadingScreen
            appReady={appReady}
            />

            <div className={`bg-[#242424] w-screen h-screen flex top-0 bottom-0 left-0 right-0 z-50`}>
                <motion.div
                    animate={settingsAnimationControl}
                    initial={{ scale: 1.5 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 30
                    }}
                    className={`w-full h-full flex`}
                >
                    <div className={`bg-[#1E1E1E] w-2/6 min-w-[250px] flex px-3 py-12 text-white`}>
                        <div className={`md:ml-auto px-3`}>
                            <h1 className={`font-black`}>User Settings</h1>

                            <div className={`mt-3 font-medium w-48 space-y-1`}>
                                <div className={`flex items-center pl-3 py-2 hover:bg-[#1B1B1B] transition-all rounded-xl text-white`}>
                                    <PeopleOutline
                                        color={'#fff'}
                                        height="23px"
                                        width="23px"
                                    />
                                    <h1 className={`ml-3`}>My Account</h1>
                                </div>

                                <div className={`flex items-center pl-3 py-2 hover:bg-[#1B1B1B] transition-all rounded-xl text-white`}>
                                    <ColorWandOutline
                                        color={'#fff'}
                                        height="23px"
                                        width="23px"
                                    />
                                    <h1 className={`ml-3`}>User Profile</h1>
                                </div>

                                <div className={`flex items-center pl-3 py-2 hover:bg-[#1B1B1B] transition-all rounded-xl text-white`}>
                                    <ShieldCheckmarkOutline
                                        color={'#fff'}
                                        height="23px"
                                        width="23px"
                                    />
                                    <h1 className={`ml-3`}>Sessions</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`w-full h-full text-white px-16`}>
                        <div className={`mt-20`}>
                            <div className={`flex w-full`}>
                                <h1 className={`text-2xl font-bold`}>My Account</h1>

                                <div className={`ml-auto`}>
                                    <button onClick={() => backToChat()} className={`bg-[#2D2C2E] hover:bg-[#363636] transition-all rounded-lg shadow-sm px-4 py-1.5`}>
                                        <h1 className={`font-semibold`}>Back to Pishelo</h1>
                                    </button>
                                </div>
                            </div>

                            <div className={`flex mt-10 items-center`}>
                                <div className={`flex items-center`}>
                                    <img className={`w-20 rounded-full`} src={`/assets/testAvatar.png`} />
                                    <div className={`ml-4`}>
                                        <button onClick={() => navigator.clipboard.writeText(userData?.username)} className={`group w-fit`}>
                                            <SmallDialog
                                                text={`Click to copy your username.`}
                                            />
                                            <h1 className={`font-bold text-2xl`}>@{userData?.username || 'Loading Username'}</h1>
                                        </button>

                                        <div className={`flex items-center mt-0.5`}>
                                            <div className={`group`}>
                                                <SmallDialog
                                                    text={`This is a unique ID tied to every pishelo user. It is used to identify the user across the pishelo network.`}
                                                />
                                                <HelpCircle
                                                    color={'#848484'}
                                                    height="17px"
                                                    width="17px"
                                                />
                                            </div>
                                            <h1 className={`font-medium text-sm text-[#848484]`}>{user?.id || 'Loading User ID'}</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className={`ml-auto flex items-center`}>
                                    <button className={`bg-[#2D2C2E] hover:bg-[#363636] transition-all rounded-lg shadow-sm px-4 py-2`}>
                                        <h1 className={`font-semibold`}>Edit Profile</h1>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default AccountSettings