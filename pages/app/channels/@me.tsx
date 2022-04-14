import { useRouter } from 'next/router'
import Bottombar from '@/components/Bottombar'
import Sidebar from '@/components/Sidebar'
import LoadingScreen from '@/components/LoadingScreen'
import { BugOutline, CogOutline, ColorWandOutline, CompassOutline, MoonOutline, PlanetOutline, Settings } from 'react-ionicons'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '@/clients/supabasePublic'

const App = ({ dataProps }) => {

    const router = useRouter()
    const { state: appReady, stateSetter: setAppReady } = dataProps.appReady
    const { state: userData, stateSetter: setUserData } = dataProps.userData

    useEffect(() => {
        const user = supabase.auth.user()
        if (!user) {
            router.push('/auth')
            return
        }
    }, [])
    

    return (
        <div className={`h-full min-h-screen w-full bg-[#333842] text-white`}>
            <LoadingScreen
                appReady={appReady}
            />
            <div className={`h-full flex min-h-screen w-full`}>
                <Sidebar
                    dataProps={dataProps}
                />

                <div className={`w-full h-full min-h-screen flex flex-col justify-center items-center text-center pt-12 pb-24 sm:pl-64`}>
                    <div>
                        <h1 className={`text-4xl font-bold text-gray-400`}>Welcome to</h1>
                        <h3 className={`text-3xl mt-1 font-black`}>Pishelo</h3>
                    </div>

                    <div className={`grid px-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-3 mt-8 text-left`}>
                        <div className={`bg-gray-900 rounded-xl max-w-[400px] w-fit flex items-center px-3 py-2`}>
                            <CompassOutline
                                cssClasses={`fill-gray-300 text-gray-300`}
                                width={`50px`}
                                height={`50px`}
                            />
                            <div className={`ml-3`}>
                                <h1 className={`text-lg font-black`}>Discover Pishelo</h1>
                                <h1 className={`text-[13px] mt-1 text-gray-400`}>Find a commmunity based on your interests or hobbies.</h1>
                            </div>
                        </div>

                        <div className={`bg-gray-900 rounded-xl max-w-[400px] w-fit flex items-center px-3 py-2`}>
                            <PlanetOutline
                                cssClasses={`fill-gray-300 text-gray-300`}
                                width={`50px`}
                                height={`50px`}
                            />
                            <div className={`ml-3`}>
                                <h1 className={`text-lg font-black`}>Create a personal or public community</h1>
                                <h1 className={`text-[13px] mt-1 text-gray-400`}>Invite all of your family members or friends, some cool bots, and throw a big celebration party.</h1>
                            </div>
                        </div>

                        <div className={`bg-gray-900 rounded-xl max-w-[400px] w-fit flex items-center px-3 py-2`}>
                            <ColorWandOutline
                                cssClasses={`fill-gray-300 text-gray-300`}
                                width={`40px`}
                                height={`40px`}
                            />
                            <div className={`ml-3`}>
                                <h1 className={`text-lg font-black`}>Join the Pishelo Testers Server</h1>
                                <h1 className={`text-[13px] mt-1 text-gray-400`}>You can report issues and discuss anything Pishelo-related with us directly here.</h1>
                            </div>
                        </div>

                        <div className={`bg-gray-900 rounded-xl max-w-[400px] w-fit flex items-center px-3 py-2`}>
                            <MoonOutline
                                cssClasses={`fill-gray-300 text-gray-300`}
                                width={`40px`}
                                height={`40px`}
                            />
                            <div className={`ml-3`}>
                                <h1 className={`text-lg font-black`}>Donate to Pishelo</h1>
                                <h1 className={`text-[13px] mt-1 text-gray-400`}>Support the ongoing development project by donating - thank you!</h1>
                            </div>
                        </div>

                        <div className={`bg-gray-900 rounded-xl max-w-[400px] w-fit flex items-center px-3 py-2`}>
                            <CogOutline
                                cssClasses={`fill-gray-300 text-gray-300`}
                                width={`40px`}
                                height={`40px`}
                            />
                            <div className={`ml-3`}>
                                <h1 className={`text-lg font-black`}>Manage Pishelo</h1>
                                <h1 className={`text-[13px] mt-1 text-gray-400`}>Welp, this does the same thing as opening the settings. You can also open settings by the icon located at the bottom right screen.</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Bottombar
            dataProps={dataProps}
            />
        </div>
    )
}

export default App
