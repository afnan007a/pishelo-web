import HomeFooter from '@/components/HomeFooter';
import HomeHeader from '@/components/HomeHeader';
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react';
import { useState, useEffect } from 'react';

const Home: NextPage = (props) => {

  const router = useRouter()
  useEffect(() => {
    router.prefetch('/app')
  }, [])
  

  return (
    <div className={`h-full w-full min-h-screen`}>
      <HomeHeader
        colorScheme={`light`}
      />
      <div id="section1" className={`bg-[#6B6AF7] text-white w-full h-[550px] px-12 md:px-24 lg:px-48`}>
        <div className={`w-full h-full flex flex-col md:text-center justify-center md:items-center`}>
          <div className={`md:w-[700px]`}>
            <h1 className={`text-3xl font-black`}>Chats familiar to the way you want it.</h1>
            <h3 className={`text-sm font-medium leading-5 mt-4`}>Imagine where you can belong to a school besties group, a gaming esports group, or a worldwide developer community. Where you and a handful of people can spend time together. A place that makes it easy to talk every day and hang out more often, all with privacy in mind.</h3>

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

      <HomeFooter />
    </div>
  )
}

export default Home
