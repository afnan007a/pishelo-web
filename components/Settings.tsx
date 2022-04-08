import { PeopleOutline, ColorWandOutline, ShieldCheckmarkOutline } from 'react-ionicons'
import SmallDialog from './smallDialog'
import type { Users } from "@prisma/client";


function Settings({ userData, visible }: { userData: Users | null, visible: boolean }) {
    return (
        <div className={`bg-[#2b2b2b] w-screen h-screen absolute flex top-0 bottom-0 left-0 right-0 z-50 ${visible ? '' : 'hidden'}`}>
            <div className={`bg-[#1E1E1E] w-2/6 min-w-[250px] flex px-3 py-12`}>
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

            <div className={`w-full h-full`}>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Settings