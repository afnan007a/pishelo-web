import { PeopleOutline, HomeOutline } from 'react-ionicons'


function Sidebar() {
    return (
        <div className={`bg-[#2F3136] w-60 min-h-screen h-full flex flex-col px-5`}>
            <div className={`mt-8`}>
                <div className={`px-3`}>
                    <h1 className={`text-sm font-black`}>Conversations</h1>
                </div>

                <div className={`mt-3 w-full`}>
                    <div className={`flex items-center hover:bg-[#42464E] group px-3 py-1 rounded-xl`}>
                        <img className={`w-10 rounded-full`} src={`/assets/testAvatar.png`} />

                        <div className={`text-[#96989E] group-hover:text-gray-200 ml-2`}>
                            <h1 className={`text-sm font-black`}>lavenderlav</h1>
                            <h1 className={`text-[11px] font-medium`}>Playing Genshin Impact</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar