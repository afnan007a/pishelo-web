import { PeopleOutline, ColorWandOutline, ShieldCheckmarkOutline, HelpCircle, AtCircleOutline, MailOutline, KeyOutline, CloseCircleOutline, KeypadOutline } from 'react-ionicons'
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
    const [emailHidden, setEmailHidden] = useState<boolean>(true)
    const [passwordHidden, setPasswordHidden] = useState<boolean>(true)
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

    var censorWord = function (str) {
        if (!str) return ''
        return str[0] + "·".repeat(str.length - 2) + str.slice(-1);
    }
    var censorEmail = function (email) {
        if (!email) return ''
        var arr = email.split("@");
        return censorWord(arr[0]) + "@" + censorWord(arr[1]);
    }
    

    return (
        <div>
            <LoadingScreen
            appReady={appReady}
            />

            <div className={`bg-[#242424] w-screen h-full min-h-screen pb-12 flex z-50`}>
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
                    <div className={`bg-[#1E1E1E] hidden w-64 fixed h-full min-h-screen md:flex px-3 py-12 text-white`}>
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

                    <div className={`w-full h-full text-white px-16 md:ml-64`}>
                        <div className={`mt-20`}>
                            <div className={`flex w-full`}>
                                <h1 className={`text-2xl font-bold`}>My Account</h1>

                                <div className={`ml-auto`}>
                                    <button onClick={() => backToChat()} className={`bg-[#2D2C2E] hover:bg-[#363636] transition-all rounded-lg shadow-sm px-4 py-1.5`}>
                                        <h1 className={`font-semibold`}>Back to Pishelo</h1>
                                    </button>
                                </div>
                            </div>

                            <div className={`bg-[#2F3136] shadow-md px-5 py-6 rounded-xl mt-8`}>
                            <div className={`flex items-center`}>
                                <div className={`flex items-center`}>
                                    <img className={`w-20 h-fit aspect-square object-cover rounded-full`} src={`${userData?.avatarURL}`} />
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
                                        <button className={`bg-[#202225] hover:bg-[#363636] transition-all rounded-lg shadow-sm px-4 py-2`}>
                                        <h1 className={`font-semibold`}>Edit Profile</h1>
                                    </button>
                                </div>
                            </div>

                            <div className={`mt-9 space-y-3`}>
                                <div className={`bg-[#202225] w-full h-full rounded-xl flex items-center px-3 py-2`}>
                                    <AtCircleOutline
                                        color={'#fff'}
                                        height="25px"
                                        width="25px"
                                    />
                                    <div className={`ml-2`}>
                                        <h1 className={`font-bold text-sm text-gray-200`}>Username</h1>
                                        <h1 className={`text-[12.5px]`}>{userData?.username || 'Loading Username'}</h1>
                                    </div>
                                </div>

                                <div className={`bg-[#202225] w-full h-full rounded-xl flex items-center px-3 py-2`}>
                                    <MailOutline
                                        color={'#fff'}
                                        height="25px"
                                        width="25px"
                                    />
                                    <div className={`ml-2`}>
                                        <h1 className={`font-bold text-sm text-gray-200`}>Email Address</h1>
                                        <h1 className={`text-[12.5px]`}>{(emailHidden ? censorEmail(user?.email) : user?.email) || 'Loading Email'}</h1>
                                        <button onClick={() => setEmailHidden(!emailHidden)} className={`text-blue-300 text-xs mt-1`}>
                                            <h1>{emailHidden ? 'Reveal' : 'Hide'}</h1>
                                        </button>
                                    </div>
                                </div>  

                                <div className={`bg-[#202225] w-full h-full rounded-xl flex items-center px-3 py-2`}>
                                    <KeyOutline
                                        color={'#fff'}
                                        height="25px"
                                        width="25px"
                                    />
                                    <div className={`ml-2`}>
                                        <h1 className={`font-bold text-sm text-gray-200`}>Password</h1>
                                        <h1 className={`text-[12.5px]`}>{(passwordHidden ? '········' : 'nah we dont store passwords.') || 'Loading Email'}</h1>
                                        <button onClick={() => setPasswordHidden(!passwordHidden)} className={`text-blue-300 text-xs mt-1`}>
                                            <h1>{passwordHidden ? 'Reveal' : 'Hide'}</h1>
                                        </button>
                                    </div>
                                </div>  
                            </div>
                        </div>

                            <div className={`w-full py-6 px-5`}>
                                <div className={`bg-[#333134] w-full h-1 rounded-xl`} />
                            </div>

                            <div>
                                <div>
                                    <h1 className={`font-bold`}>Two-Factor Authentication</h1>
                                    <div className={`flex space-x-1 text-sm`}>
                                        <h3>Two-Factor Authentication is currently in-works, see project progress</h3>
                                        <button onClick={() => window.location.href = 'https://github.com/pishelo/pishelo-web'} className={`text-blue-300`}>
                                            <h3>here in github.</h3>
                                        </button>
                                    </div>
                                </div>

                                <div className={`mt-5`}>
                                    <div className={`bg-[#333842] opacity-50 w-full h-full rounded-xl flex items-center px-3 py-2`}>
                                        <KeypadOutline
                                            color={'#fff'}
                                            height="25px"
                                            width="25px"
                                        />
                                        <div className={`ml-2`}>
                                            <h1 className={`font-bold text-sm text-gray-200`}>Set up Two-Factor Authentication</h1>
                                            <h1 className={`text-xs text-gray-300`}>Enable Two-Factor Authentication to further secure your account.</h1>
                                            <button className={`text-gray-400 text-xs mt-1`}>
                                                <h1>Unavilable at this time</h1>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`w-full py-6 px-5`}>
                                <div className={`bg-[#333134] w-full h-1 rounded-xl`} />
                            </div>

                            <div>
                                <div>
                                    <h1 className={`font-bold text-red-400`}>Danger Area</h1>
                                    <div className={`flex space-x-1 text-sm text-red-100`}>
                                        <h3>The actions below may be rather considered destructive, pay extra careful caution when applying changes in this area.</h3>
                                    </div>
                                </div>

                                <div className={`mt-5`}>
                                    <div className={`bg-[#333842] hover:bg-red-900 transition-all opacity-50 w-full h-full rounded-xl flex items-center px-3 py-2`}>
                                        <CloseCircleOutline
                                            color={'#fff'}
                                            height="25px"
                                            width="25px"
                                        />
                                        <div className={`ml-2`}>
                                            <h1 className={`font-bold text-sm text-gray-200`}>Delete my account permanently</h1>
                                            <h1 className={`text-xs text-gray-300`}>Permanently delete your account, including all of your account data. (sends an email to spacexliquid@gmail.com)</h1>
                                            <button className={`text-gray-400 text-xs mt-1`}>
                                                <h1>Unavailable at this time</h1>
                                            </button>
                                        </div>
                                    </div>
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