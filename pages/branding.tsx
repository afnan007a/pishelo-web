import HomeFooter from "@/components/HomeFooter";
import HomeHeader from "@/components/HomeHeader";
import Link from "next/link";

export default function Branding(props) {
    return (
        <div className={`w-full h-full min-h-screen`}>  
            <HomeHeader
                colorScheme={`dark`}
            />

            <div id="section1" className={`flex items-center md:justify-center px-5 md:px-12 py-20 h-full min-h-[500px]`}>
                <div className={`w-[1100px]`}>
                    <h1 className={`font-black text-6xl md:text-7xl text-blue-700 uppercase`}>{`Pishelo Branding ><`}</h1>
                    <h3 className={`mt-5 md:mt-8 text-sm md:text-base font-medium w-full md:w-2/3 max-w-[1000px]`}>{`We're a playful and fun brand that doesn't take ourselves too seriously LMAOO. With that said, we kin on keeping things up-to-date and quality. If you're going to use our art/brand for something please keep it tasteful and send it our way for approval :yum:`}</h3>
                </div>
            </div>

            <div id="section2" className={`flex items-center justify-center px-12 py-20 h-full bg-[#242424]`}>
                <div className={`w-[1100px]`}>
                    <div>
                        <h1 className={`font-black text-5xl md:text-6xl text-white uppercase`}>{`Our Logo`}</h1>
                        <h3 className={`mt-5 md:mt-8 text-sm md:text-base font-medium w-full md:w-2/3 max-w-[1000px] text-gray-300`}>{`Please refrain from editing, changing, distorting, recoloring, reconfiguring, or in anyhow modify the Pishelo logo.`}</h3>
                    </div>

                    <div className={`grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-x-8 gap-y-14 mt-12`}>
                        <div className={`w-full md:max-w-[400px] h-32 bg-[#2D2F33] rounded-xl tpbg-dark`}>
                            <div className={`h-full flex justify-center px-3 py-3`}>
                                <img src={`/assets/logoColoredNoText.svg`} className={`h-full`} />
                            </div>

                            <div className={`text-white font-semibold text-sm mt-2 space-x-3 absolute`}>
                                <Link href={`/assets/logoColoredNoText.svg`}>.svg</Link>
                            </div>
                        </div>

                        <div className={`w-full md:max-w-[400px] h-32 bg-[#fff] rounded-xl tpbg-light`}>
                            <div className={`h-full flex justify-center px-3 py-3`}>
                                <img src={`/assets/logoBlackNoText.svg`} className={`h-full`} />
                            </div>

                            <div className={`text-white font-semibold text-sm mt-2 space-x-3 absolute`}>
                                <Link href={`/assets/logoBlackNoText.svg`}>.svg</Link>
                            </div>
                        </div>

                        <div className={`w-full md:max-w-[400px] h-32 bg-[#2D2F33] rounded-xl tpbg-dark`}>
                            <div className={`h-full flex justify-center px-3 py-3`}>
                                <img src={`/assets/logoWhiteNoText.svg`} className={`h-full`} />
                            </div>

                            <div className={`text-white font-semibold text-sm mt-2 space-x-3 absolute`}>
                                <Link href={`/assets/logoWhiteNoText.svg`}>.svg</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="section3" className={`flex items-center justify-center px-12 py-20 h-full bg-white`}>
                <div className={`w-[1100px]`}>
                    <div>
                        <h1 className={`font-black text-5xl md:text-6xl text-black uppercase`}>{`Colors`}</h1>
                        <h3 className={`mt-5 md:mt-5 text-sm md:text-base font-medium w-full md:w-2/3 max-w-[1000px] text-gray-600`}>{`Now lets turn on the lights, just to view our sick colors. These colors look sick ngl, what ya think?`}</h3>
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14 mt-12`}>

                        <div className={`w-full md:max-w-[300px] h-32 bg-[#1C4ED8] rounded-xl`}>
                            <div className={`h-full px-4 py-3`}>
                                <h1 className={`font-black text-2xl text-white`}>Blueshelo</h1>
                                <h3 className={`text-md font-medium text-gray-300`}>#1C4ED8</h3>
                            </div>

                            <div className={`text-gray-600 font-semibold text-sm mt-2 space-x-3 absolute`}>
                                <button onClick={() => navigator.clipboard.writeText('#1C4ED8')}>Copy hex code</button>
                            </div>
                        </div>

                        <div className={`w-full md:max-w-[300px] h-32 bg-[#F84EB0] rounded-xl`}>
                            <div className={`h-full px-4 py-3`}>
                                <h1 className={`font-black text-2xl text-white`}>Hot Pink</h1>
                                <h3 className={`text-md font-medium text-gray-100`}>#F84EB0</h3>
                            </div>

                            <div className={`text-gray-600 font-semibold text-sm mt-2 space-x-3 absolute`}>
                                <button onClick={() => navigator.clipboard.writeText('#F84EB0')}>Copy hex code</button>
                            </div>
                        </div>

                        <div className={`w-full md:max-w-[300px] h-32 bg-[#E8B0FC] rounded-xl`}>
                            <div className={`h-full px-4 py-3`}>
                                <h1 className={`font-black text-2xl text-white`}>Light Pink</h1>
                                <h3 className={`text-md font-medium text-gray-100`}>#E8B0FC</h3>
                            </div>

                            <div className={`text-gray-600 font-semibold text-sm mt-2 space-x-3 absolute`}>
                                <button onClick={() => navigator.clipboard.writeText('#E8B0FC')}>Copy hex code</button>
                            </div>
                        </div>

                        <div className={`w-full md:max-w-[300px] h-32 bg-[#21252B] rounded-xl`}>
                            <div className={`h-full px-4 py-3`}>
                                <h1 className={`font-black text-2xl text-white`}>Dark gray</h1>
                                <h3 className={`text-md font-medium text-gray-300`}>#21252B</h3>
                            </div>

                            <div className={`text-gray-600 font-semibold text-sm mt-2 space-x-3 absolute`}>
                                <button onClick={() => navigator.clipboard.writeText('#21252B')}>Copy hex code</button>
                            </div>
                        </div>

                        <div className={`w-full md:max-w-[300px] h-32 bg-[#333842] rounded-xl`}>
                            <div className={`h-full px-4 py-3`}>
                                <h1 className={`font-black text-2xl text-white`}>Lighter gray</h1>
                                <h3 className={`text-md font-medium text-gray-300`}>#333842</h3>
                            </div>

                            <div className={`text-gray-600 font-semibold text-sm mt-2 space-x-3 absolute`}>
                                <button onClick={() => navigator.clipboard.writeText('#333842')}>Copy hex code</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div id="section4" className={`flex items-center justify-center px-12 py-20 h-full bg-blue-800`}>
                <div className={`w-[1100px]`}>
                    <div>
                        <h1 className={`font-black text-5xl md:text-6xl text-white uppercase`}>{`So how's it?`}</h1>
                        <h3 className={`mt-5 md:mt-5 text-sm md:text-base font-medium w-full md:w-2/3 max-w-[1000px] text-gray-200`}>{`To find more about our branding guidelines, feel free to email us at spacexliquid@gmail.com - or download our design media kit`}</h3>
                        <button className={`text-white font-bold mt-5 bg-blue-600 shadow-md px-3 py-2 rounded-xl`}>
                            <h1>Download Design Media Kit</h1>
                        </button>
                    </div>
                </div>
            </div>

            <HomeFooter />

        </div>
    )
}