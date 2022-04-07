import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = (props) => {

  const router = useRouter()

  return (
    <div className={`h-full w-full min-h-screen`}>
      <div id="header" className={`bg-blue-800 md:bg-transparent text-white shadow-md md:shadow-none fixed w-full h-14 flex items-center px-5 md:px-12 md:mt-2`}>
        <div id="leftside_header" className={`flex items-center h-full`}>
          <h1 className={`text-xl font-bold`}>Pishelchat</h1>

          <div className={`ml-10 font-bold space-x-7 hidden md:block`}>
            <button>
              <h1 className={`font-bold text-sm`}>Support</h1>
            </button>
            <button>
              <h1 className={`font-bold text-sm`}>Blog</h1>
            </button>
            <button>
              <h1 className={`font-bold text-sm`}>Careers</h1>
            </button>
          </div>
        </div>

        <div id="rightside_header" className={`ml-auto`}>
          <div id="rightside_header_buttons" className={`space-x-3`}>
            <button className={`hidden md:inline-block text-white hover:bg-gray-900 transition-all font-medium text-sm px-4 py-1.5 rounded-full`}>
              <h1>View Project Status</h1>
            </button>

            <button className={`hidden lg:inline-block text-white hover:bg-gray-900 transition-all font-medium text-sm px-4 py-1.5 rounded-full`}>
              <h1>Contribute</h1>
            </button>

            <button onClick={() => router.push('/app')} className={`text-white hover:bg-gray-900 transition-all font-bold text-sm px-4 py-1.5 rounded-full`}>
              <h1>Open Pishelchat</h1>
            </button>
          </div>
        </div>
      </div>
      <div id="section1" className={`bg-[#6B6AF7] text-white w-full h-[550px] px-12 md:px-24 lg:px-48`}>
        <div className={`w-full h-full flex flex-col md:text-center justify-center md:items-center`}>
          <div className={`md:w-[700px]`}>
            <h1 className={`text-3xl font-black`}>Chats familiar to the way you want it.</h1>
            <h3 className={`text-sm md:text-base leading-5 mt-4`}>Imagine where you can belong to a school besties group, a gaming esports group, or a worldwide developer community. Where you and a handful of people can spend time together. A place that makes it easy to talk every day and hang out more often, all with privacy in mind.</h3>

            <div className={`mt-7 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-5`}>
              <button className={`bg-white text-black hover:bg-gray-200 hover:shadow-xl hover:text-gray-700 transition-all font-semibold px-6 py-2 rounded-full`}>
                <h1>Join Public Beta</h1>
              </button>
              <button onClick={() => router.push('/app')} className={`bg-gray-800 hover:bg-gray-700 hover:shadow-xl text-white transition-all font-semibold px-6 py-2 rounded-full`}>
                <h1>Open Pishelchat</h1>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="section_feature_1">

      </div>
    </div>
  )
}

export default Home
