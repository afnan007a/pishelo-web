import { PeopleOutline, HomeOutline } from 'react-ionicons'
import * as api from '@/clients/apiPublic'
import * as React from 'react';
import { useState, useEffect } from 'react';
import type { TypeUsers } from '@/constants/database/Types'
import type { dataPropType } from '@/constants/declarations/AppProps';
import Link from 'next/link'



function Sidebar({ dataProps }: { dataProps: dataPropType }) {

    const { state: conversationsData, stateSetter: setConversationsData } = dataProps.conversationsData
    const { state: usersData, stateSetter: setUsersData } = dataProps.usersData
    const [initAlreadyRan, setInitAlreadyRan] = useState(false)
    const { state: userData, stateSetter: setUserData } = dataProps.userData

    useEffect(() => {
      (async () => {
        if (!userData || initAlreadyRan) return
        setInitAlreadyRan(true)
        const convodata = await api.conversationData()

        let userstofetch:Array<string> = []
        for (const conversation of convodata) {
            conversation.members.forEach((convomemberid) => {
                userstofetch.push(convomemberid)
            })
        }
        const users = await api.userDataMany(userstofetch)
        setUsersData(users)
        setConversationsData(convodata)
      })()
    }, [userData])

    return (
        <div className={`bg-[#21252B] w-64 min-h-screen fixed h-full hidden sm:flex flex-col px-5`}>
            {/* <div className={`mt-8`}>
                <div className={`px-3`}>
                    <h1 className={`text-[11px] font-black uppercase text-[#434A4A]`}>Pinned</h1>
                </div>

                <div className={`mt-2 w-full`}>
                    <div className={`flex items-center hover:bg-[#42464E] group px-3 py-1 rounded-xl`}>
                        <img className={`w-10 rounded-full`} src={`/assets/testAvatar.png`} />

                        <div className={`text-[#96989E] group-hover:text-gray-200 ml-3`}>
                            <h1 className={`text-sm font-black text-white`}>lavenderlav</h1>
                            <h1 className={`text-[11px] font-medium`}>Heya do you wanna play ge...</h1>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className={`mt-8`}>
                <div className={`px-3`}>
                    <h1 className={`text-[11px] font-black uppercase text-[#434A4A]`}>Direct Messages</h1>
                </div>

                <div className={`space-y-2 mt-2`}>
                    {(() => {
                        return conversationsData?.map((convodata) => {
                            const recipients = convodata.members.filter(authorid => authorid != userData?.id)
                            const recipient = usersData?.find((user) => user.id === recipients[0])
                            return (
                                <Link key={`dm_${recipient?.id}`} href={`/app/channels/${convodata.id}`}>
                                    <button className={`flex text-left w-full items-center hover:bg-[#42464E] group px-3 py-1 rounded-xl`}>
                                        <img className={`w-9 rounded-full`} src={`${recipient?.avatarURL}`} />

                                        <div className={`text-[#96989E] group-hover:text-gray-200 ml-3`}>
                                            <h1 className={`text-sm font-black text-white`}>{recipient?.username}</h1>
                                            <h1 className={`text-[11px] font-medium w-32 overflow-hidden whitespace-nowrap text-ellipsis`}>{recipient?.activityMessage}</h1>
                                        </div>
                                    </button>
                                </Link>
                            )
                        })
                    })()}
                </div>
            </div>
        </div>
    )
}

export default Sidebar