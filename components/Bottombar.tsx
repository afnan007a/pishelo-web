import { ChatbubblesOutline, SearchCircleOutline, HomeOutline, CogOutline, EllipsisHorizontalCircleOutline } from 'react-ionicons'
import SmallDialog from './smallDialog'
import type { Users } from "@prisma/client";


function BottomBar({ userData }: { userData: Users | null }) {
    return (
        <div className={`bg-[#191B1F] w-full h-14 flex items-center px-5 absolute bottom-0`}>
            <div id="leftSideBar" className={`flex items-center h-full`}>
                {/* <h1 className={`font-black text-xl`}>Pishelo</h1> */}
                <div id="toolbar" className={`flex items-center space-x-7`}>
                    <div id="home_toolbar" className={`group`}>
                        <SmallDialog
                            text={`Home`}
                        />
                        <HomeOutline
                            color={'#9CA3AF'}
                            cssClasses={`hover:text-white`}
                            height="28px"
                            width="28px"
                        />
                    </div>

                    <div id="directMessage_toolbar" className={`group`}>
                        <SmallDialog
                            text={`Direct Messages`}
                        />
                        <ChatbubblesOutline
                            color={'#9CA3AF'}
                            cssClasses={`hover:text-white`}
                            height="28px"
                            width="28px"
                        />
                    </div>

                    <div id="explore_toolbar" className={`group`}>
                        <SmallDialog
                            text={`Explore`}
                        />
                        <SearchCircleOutline
                            color={'#9CA3AF'}
                            cssClasses={`hover:text-white`}
                            height="35px"
                            width="35px"
                        />
                    </div>
                </div>

                <div className={`h-full w-0.5 py-3 ml-5`}>
                    <div className={`w-full h-full bg-gray-600 rounded-full`} />
                </div>

                <div id="guilds" className={`h-full py-2 ml-5`}>
                    <div className={`h-full w-fit group`}>
                        <SmallDialog
                            text={`lav's test server`}
                        />
                        <img className={`h-full hover:outline outline-2 outline-gray-400 outline-offset-2 rounded-xl`} src={`/assets/testAvatar.png`} />
                    </div>
                </div>
            </div>

            <div id="rightSideBar" className={`h-full ml-auto flex`}>
                <div id="profileData" className={`flex items-center py-1.5`}>
                    <div className={`h-full flex py-1`}>
                        <img className={`h-full rounded-full`} src={`/assets/testAvatar.png`} />
                        <div className={`absolute bg-red-400 shadow-xl w-2 h-2 rounded-full`} />
                    </div>
                    <div className={`ml-2 hidden md:block`}>
                        <h1 className={`text-sm font-black text-gray-200`}>{userData?.username || 'Loading'}</h1>
                        <h3 className={`text-xs font-medium text-gray-400`}>{userData?.activityMessage || ''}</h3>
                    </div>
                </div>

                <div className={`h-full w-0.5 py-3 ml-5`}>
                    <div className={`w-full h-full bg-gray-600 rounded-full`} />
                </div>

                <div className={`ml-5 h-full flex items-center space-x-5`}>
                    <button className={`group`}>
                        <SmallDialog
                            text={`Settings`}
                        />
                        <CogOutline
                            color={'#9CA3AF'}
                            cssClasses={`hover:text-white`}
                            height="27px"
                            width="27px"
                        />
                    </button>

                    <button className={`group`}>
                        <SmallDialog
                        text={`More`}
                        />
                        <EllipsisHorizontalCircleOutline
                            color={'#9CA3AF'}
                            cssClasses={`hover:text-white`}
                            height="27px"
                            width="27px"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BottomBar