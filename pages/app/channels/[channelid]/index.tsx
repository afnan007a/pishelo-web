import { useRouter } from 'next/router'
import Bottombar from '@/components/Bottombar'
import Sidebar from '@/components/Sidebar'
import LoadingScreen from '@/components/LoadingScreen'
import { People, Search, Call } from 'react-ionicons'
import type { dataPropType } from '@/constants/declarations/AppProps';

export default function ChannelView({ dataProps }) {

    const router = useRouter()
    const { state: appReady, stateSetter: setAppReady } = dataProps.appReady
    const { state: userData, stateSetter: setUserData } = dataProps.userData
    const { state: usersData, stateSetter: setUsersData } = dataProps.usersData
    const { state: conversationsData, stateSetter: setConversationsData } = dataProps.conversationsData
    const currentConversationData = conversationsData?.find((convo) => convo.id == router.query['channelid'])
    const recipientData = usersData?.find((userdata) => userdata.id == currentConversationData.recipients[0])

    return (
        <div className={`h-full flex min-h-screen w-full bg-[#333842] text-white`}>
            <LoadingScreen
                appReady={appReady}
            />
            <div className={`h-full flex min-h-screen w-full`}>
                <Sidebar
                    dataProps={dataProps}
                />

                <div className={`w-full h-full px-2`}>
                    <div className={`bg-[#21262c] mt-3 rounded-md w-full h-[52px] px-5 flex items-center`}>
                        <div className={`flex items-center`}>
                            <People
                            color={`white`}
                            width={`23px`}
                            height={`23px`}
                            />

                            <div className={`ml-2 text-md`}>
                                <h1 className={`font-black`}>{recipientData?.username || 'Loading User'}</h1>
                                <h1 className={`text-[11px] -mt-1`}>{recipientData?.activityMessage || 'Loading Activity'}</h1>
                            </div>
                        </div>

                        <div className={`ml-auto`}>
                            <div className={`flex items-center space-x-5`}>
                                <button>
                                    <Call
                                        color={`white`}
                                        width={`23px`}
                                        height={`23px`}
                                    />
                                </button>
                                <button>
                                    <Search
                                        color={`white`}
                                        width={`23px`}
                                        height={`23px`}
                                    />
                                </button>
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