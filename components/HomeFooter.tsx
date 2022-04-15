import Link from "next/link";
import { LogoInstagram, LogoTwitter } from "react-ionicons";

export default function HomeFooter() {
    return (
        <div className={`flex items-center px-7 md:px-16 py-14 h-full min-h-[200px] bg-[#21252B]`}>
            <div className={`w-[1000px]`}>
                <h1 className={`font-black hidden md:block text-7xl text-white uppercase`}>{`Pishelo.`}</h1>
                
                <div className={`md:mt-14 w-full h-full md:flex`}>
                    <div>
                        <div className={`text-pink-200 font-black text-2xl`}>
                            <h1>Home sweet home, pishelo.</h1>
                        </div>

                        <div className={`mt-3 text-md flex space-x-4`}>
                            <Link href={'https://twitter.com/pishelochat'}>
                                <button>
                                    <LogoTwitter
                                        color={`#fff`}
                                        width={`28px`}
                                        height={`28px`}
                                    />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className={`mt-16 md:mt-0 md:ml-24 space-x-16 space-y-16`}>
                        <div>
                            <div className={`text-white font-black text-2xl`}>
                                <h1>Company</h1>
                            </div>

                            <div className={`text-gray-400 mt-2 text-md space-y-1`}>
                                    <Link href={`/`}>
                                        <h1>Parent Company</h1>
                                    </Link>

                                    <Link href={`/branding`}>
                                        <h1>Branding Guidelines</h1>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}