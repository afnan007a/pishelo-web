import { useRouter } from "next/router"

export default function HomeHeader({ colorScheme }) {

    const router = useRouter()
    let isColorDark = false

    if (colorScheme === 'dark') {
        isColorDark = true
    } else {
        isColorDark = false
    }

    return (
        <div id="header" className={`${isColorDark ? 'text-[#000]' : 'text-[#fff]'} fixed w-full h-14 flex items-center px-5 md:px-12 mt-1 md:mt-2`}>
            <div id="leftside_header" className={`flex items-center h-full`}>
                <button onClick={() => router.push('/')} className={`text-2xl font-black`}>
                    <h1>Pishelo</h1>
                </button>

                <div className={`ml-10 font-bold text-base space-x-7 hidden md:block`}>
                    <button>
                        <h1 className={`font-bold`}>Support</h1>
                    </button>
                    <button>
                        <h1 className={`font-bold`}>Blog</h1>
                    </button>
                    <button>
                        <h1 className={`font-bold`}>Careers</h1>
                    </button>
                </div>
            </div>

            <div id="rightside_header" className={`ml-auto`}>
                <div id="rightside_header_buttons" className={`space-x-3`}>
                    <button className={`hidden md:inline-block transition-all font-medium text-sm px-4 py-1.5 rounded-full`}>
                        <h1>View Project Status</h1>
                    </button>

                    <button className={`hidden lg:inline-block transition-all font-medium text-sm px-4 py-1.5 rounded-full`}>
                        <h1>Contribute</h1>
                    </button>

                    <button onClick={() => router.push('/app')} className={`hover:animate-spin transition-all font-bold text-sm px-4 py-1.5 rounded-full`}>
                        <h1>Open Pishelchat</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}