import { useRouter } from 'next/router'
import Bottombar from '@/components/Bottombar'
import Sidebar from '@/components/Sidebar'
import LoadingScreen from '@/components/LoadingScreen'
import { AtOutline, Search, Call, AddCircle, GiftOutline } from 'react-ionicons'
import SmallDialog from '@/components/smallDialog'
import * as api from '@/clients/apiPublic'
import type { TypeMessages } from '@/constants/database/Types';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { dataPropType } from '@/constants/declarations/AppProps'
import { fetchMessages, getMessagesCache } from '@/managers/messages'
import HomeHeader from '@/components/HomeHeader'

export default function ChannelView({ dataProps }) {

    const router = useRouter()
    const [messages, setMessages] = useState<Array<TypeMessages> | null>(null)
    const { getCache, updateCache } = dataProps.cacheManager
    const { state: appReady, stateSetter: setAppReady } = dataProps.appReady
    const { state: userData, stateSetter: setUserData } = dataProps.userData
    const { state: usersData, stateSetter: setUsersData } = dataProps.usersData
    const { state: conversationsData, stateSetter: setConversationsData } = dataProps.conversationsData
    const currentConversationData = conversationsData?.find((convo) => convo.id == router.query['channelid'])
    const recipientData = usersData?.find((userdata) => userdata.id == currentConversationData.recipients[0])

    async function sendMessage(event) {
        if (event?.key == 'Enter') {
            const value = event.target.value
            messages?.push({
                authorid: userData.id,
                channelid: currentConversationData.id,
                content: value,
                embeds: [],
                created_at: new Date(),
                id: Math.random().toString(),
                timestamp: Date.now().toString(),
                type: 'user'
            })
            setMessages(messages)

            await api.sendMessage(currentConversationData.id, value)
            event.target.value = ''
        }
    }

    useEffect(() => {
        if (!router.isReady || !recipientData) return
        let pageActive = true

        const handleRouteChange = (url, { shallow }) => {
            if (url == router.asPath) return
            setMessages(null)
        }
        router.events.on('routeChangeStart', handleRouteChange);

        (async () => {
            const channelid = router.query['channelid']
            const messagesinchannel = await fetchMessages({ channelid: channelid })
            if (!pageActive) return
            setMessages(messagesinchannel)
            var objDiv = document.getElementById("mainChatContent");
            objDiv!.scrollTop = objDiv!.scrollHeight;
        })()

        return () => {
            pageActive = false
            router.events.off('routeChangeStart', handleRouteChange);
        }
    }, [router.isReady, recipientData])

    return (
        <div className={`h-full flex min-h-screen w-full bg-[#333842] text-white`}>
            <LoadingScreen
                appReady={appReady}
            />
            <div className={`h-full flex min-h-screen w-full`}>
                <Sidebar
                    dataProps={dataProps}
                />

                <div className={`w-full h-full min-h-screen flex flex-col pb-[75px] sm:pl-64`}>
                    <div className={`px-5`}>
                        <div className={`fixed bg-[#21262c] shadow-md mt-3 rounded-md w-[calc(100%-295px)] h-[55px] px-5 flex items-center`}>
                            <div className={`flex items-center`}>
                                <AtOutline
                                cssClasses={`fill-gray-400 text-gray-400 transition-all`}
                                width={`25px`}
                                height={`25px`}
                                />

                                <div className={`ml-2 text-md items-center`}>
                                    <div className={`flex items-center`}>
                                            <h1 className={`font-black`}>{recipientData?.username || 'Loading User'}</h1>

                                        <div className={`group flex justify-center`}>
                                            <SmallDialog
                                                text={`Do Not Disturb`}
                                                align={`bottom`}
                                                placement={`center`}
                                            />
                                            <div className={`bg-red-500 ml-1 w-2 h-2 rounded-full`} />
                                        </div>
                                    </div>
                                    <h1 className={`text-[11px] -mt-1`}>{recipientData?.activityMessage}</h1>
                                </div>
                            </div>

                            <div className={`ml-auto`}>
                                <div className={`flex items-center space-x-5`}>
                                    <button className={`group flex justify-center`}>
                                        <SmallDialog
                                        text={`Start Voice Call`}
                                        align={`bottom`}
                                        placement={`right`}
                                        />
                                        <Call
                                            cssClasses={`fill-gray-400 text-gray-400 hover:fill-white hover:text-white transition-all`}
                                            width={`23px`}
                                            height={`23px`}
                                        />
                                    </button>
                                    <button className={`group flex justify-center`}>
                                        <SmallDialog
                                            text={`Search`}
                                            align={`bottom`}
                                            placement={`right`}
                                        />
                                        <Search
                                            cssClasses={`fill-gray-400 text-gray-400 hover:fill-white hover:text-white transition-all`}
                                            width={`23px`}
                                            height={`23px`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="mainChatContent" className={`mt-auto w-full h-full`}>
                        <div className={`pb-16 pt-24`}>
                            <div id="chatWelcome" className={`pb-5 px-5`}>
                                <img className={`h-16 w-16 object-cover rounded-full`} src={`${recipientData?.avatarURL}`} />
                                <div className={`mt-3.5`}>
                                    <h1 className={`text-3xl font-black`}>{recipientData?.username || 'Loading User'}</h1>
                                    <h3 className={`text-sm mt-1 text-gray-400 font-medium`}>This is the start to another magical conversation of yours with @{recipientData?.username || 'Loading User'}.</h3>
                                </div>

                                <div className={`mt-4 flex space-x-3`}>
                                    <button className={`bg-gray-500 hover:bg-gray-600 transition-all text-white font-semibold py-1 px-3 rounded-lg`}>
                                        <h1 className={`text-sm`}>Report Spam</h1>
                                    </button>

                                    <button className={`bg-red-400 hover:bg-red-500 transition-all text-white font-semibold py-1 px-3 rounded-lg`}>
                                        <h1 className={`text-sm`}>Block User</h1>
                                    </button>
                                </div>
                            </div>

                            <div id="chatContent" className={`space-y-1 mt-3`}>
                                {(() => {

                                    if (messages == null) {
                                        return (
                                            <></>
                                        )
                                    }

                                    return messages!.map((message) => {

                                        const user = usersData?.find((userdata) => userdata.id == message.authorid)

                                        return (
                                            <div key={`message_${message.id}`} className={`w-full h-14 flex items-center py-2 px-5 transition-all hover:bg-slate-700`}>
                                                <img className={`h-full w-fit rounded-full aspect-square object-cover`} src={`${user?.avatarURL}`} />

                                                <div className={`ml-3`}>
                                                    <h1 className={`text-sm font-semibold`}>{user?.username || 'Username not available'}</h1>
                                                    <h1 className={`text-[13px] -mt-[1.5px] text-gray-300`}>{message?.content || '~Message content not available~'}</h1>
                                                </div>
                                            </div>
                                        )
                                    })
                                })()} 
                            </div>
                        </div>

                        <div id="chatControls" className={`w-[calc(100%-256px)] px-4 fixed bottom-[75px]`}>
                            <div className={`bg-[#22242B] shadow-md w-full h-12 rounded-xl px-4 flex items-center`}>
                                <div className={`h-full flex items-center`}>
                                    <button>
                                        <AddCircle
                                            cssClasses={`fill-gray-500 text-gray-500 hover:fill-white hover:text-white transition-all`}
                                            width={`25px`}
                                            height={`25px`}
                                        />
                                    </button>
                                </div>

                                <div className={`ml-5 flex items-center h-full relative w-full`}>
                                    <input
                                    className={`bg-transparent text-sm font-medium text-[#DBDCDD] outline-none w-full`}
                                    placeholder={`Message @${recipientData?.username || 'Loading User'}`}
                                    onKeyDown={(event) => sendMessage(event)}
                                    />
                                </div>

                                <div className={`ml-auto pl-5 justify-end flex items-center h-full w-fit`}>
                                    <button className={`group flex justify-center`}>
                                        <SmallDialog
                                            align={'top'}
                                            placement={'right'}
                                            text={`Gift Jetpack to ${recipientData?.username || 'Loading User'}`}
                                        />
                                        <GiftOutline
                                            cssClasses={`fill-gray-500 text-gray-500 hover:fill-white hover:text-white transition-all`}
                                            width={`25px`}
                                            height={`25px`}
                                        />
                                    </button>
                                </div>
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