import { PeopleOutline, HomeOutline } from 'react-ionicons'


function Sidebar() {
    return (
        <div className={`bg-[#21252B] w-64 min-h-screen h-full flex flex-col px-5`}>
            <div className={`mt-8`}>
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
            </div>

            <div className={`mt-8`}>
                <div className={`px-3`}>
                    <h1 className={`text-[11px] font-black uppercase text-[#434A4A]`}>Direct Messages</h1>
                </div>

                <div className={`mt-2 w-full`}>
                    <div className={`flex items-center hover:bg-[#42464E] group px-3 py-1 rounded-xl`}>
                        <img className={`w-10 rounded-full`} src={`/assets/testAvatar.png`} />

                        <div className={`text-[#96989E] group-hover:text-gray-200 ml-3`}>
                            <h1 className={`text-sm font-black text-white`}>Afnan</h1>
                            <h1 className={`text-[11px] font-medium`}>Bie</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar