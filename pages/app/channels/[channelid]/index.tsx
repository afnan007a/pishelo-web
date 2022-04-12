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

export default function ChannelView({ dataProps }) {

    const router = useRouter()
    const [messages, setMessages] = useState<Array<TypeMessages>>([])
    const { state: appReady, stateSetter: setAppReady } = dataProps.appReady
    const { state: userData, stateSetter: setUserData } = dataProps.userData
    const { state: usersData, stateSetter: setUsersData } = dataProps.usersData
    const { state: conversationsData, stateSetter: setConversationsData } = dataProps.conversationsData
    const currentConversationData = conversationsData?.find((convo) => convo.id == router.query['channelid'])
    const recipientData = usersData?.find((userdata) => userdata.id == currentConversationData.recipients[0])

    function sendMessage(event) {
        if (event?.key == 'Enter') {
            console.log(currentConversationData)
            api.sendMessage(currentConversationData.id, event.target.value)
            event.target.value = ''
        }
    }

    useEffect(() => {
        if (!router.isReady || !recipientData) return
        (async () => {
            const messagesinchannel = await api.messagesMany(router.query['channelid'])
            setMessages(messagesinchannel)
        })()
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
                    <div className={`px-2`}>
                        <div className={`bg-[#21262c] shadow-md mt-3 rounded-md w-full h-[52px] px-5 flex items-center`}>
                            <div className={`flex items-center`}>
                                <AtOutline
                                cssClasses={`fill-gray-400 text-gray-400 transition-all`}
                                width={`25px`}
                                height={`25px`}
                                />

                                <div className={`ml-2 text-md`}>
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
                                    <h1 className={`text-[11px] -mt-1`}>{recipientData?.activityMessage || 'Loading Activity'}</h1>
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
                        <div className={`pb-5`}>
                            <div id="chatWelcome" className={`pb-5 px-5`}>
                                <h1 className={`text-3xl font-black`}>{recipientData?.username || 'Loading User'}</h1>
                                <h3 className={`text-sm mt-1 text-gray-400`}>This is the start to another magical conversation of yours.</h3>
                            </div>

                            <div id="chatContent" className={`space-y-1`}>
                                {(() => {
                                    return messages.map((message) => {

                                        const user = usersData?.find((userdata) => userdata.id == message.authorid)
                                        console.log(user)

                                        return (
                                            <div key={`message_${message.id}`} className={`w-full h-14 flex items-center py-2 px-5 transition-all hover:bg-slate-700`}>
                                                <img className={`h-full rounded-full`} src={`${user?.avatarURL}`} />

                                                <div className={`ml-3`}>
                                                    <h1 className={`text-md font-bold`}>{user?.username || 'Username not available'}</h1>
                                                    <h1 className={`text-[13px] -mt-[1.5px] text-gray-300`}>{message?.content || '~Message content not available~'}</h1>
                                                </div>
                                            </div>
                                        )
                                    })
                                })()} 
                            </div>
                        </div>

                        <div id="chatControls" className={`w-full h-12 px-4`}>
                            <div className={`bg-[#22242B] shadow-md w-full h-full rounded-xl px-4 flex items-center`}>
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