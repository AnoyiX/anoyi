import AppHeader from "../components/AppHeader"
import Head from 'next/head'
import FullContainer from "../components/Containers"
import { readFileSync } from 'fs'
import path from "path"

export interface Emoji {
  emoji: string
  entity: string
  code: string
  description: string
  name: string
  semver: string | null
  color: string
}

const Page = ({ data }) => {

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

      <Head>
        <title>An emoji guide for your commit messages</title>
      </Head>

      <AppHeader path={[{ name: 'Git 表情' }]} />

      <div className='bg-gradient-to-br from-gray-900 to-gray-500 w-full lg:h-96 h-48 rounded-lg shadow relative p-6 lg:p-16 text-center lg:text-left'>

        <div className="h-full flex flex-col justify-center">
          <p className="text-2xl lg:text-5xl tracking-wide">😊🤣😂😇😉😘😜🙄😡😰😴</p>
          <p className="text-white text-lg lg:text-4xl font-semibold my-4">Git Commit Messages 表情包使用指南</p>
          <p className="text-gray-400 text-xs lg:text-sm"><i className="fa-solid fa-circle-info mr-2"></i>点击任意彩色表情或者黑色标题即可完成复制！</p>
          <div className="relative w-fit mt-6 hidden lg:block">
            <a href="https://github.com/AnoyiX/anoyi" target="_blank" className="relative p-0.5 inline-flex items-center justify-center font-semibold overflow-hidden group rounded-md" rel='noreferrer'>
              <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
              <span className="relative px-4 py-2 transition-all ease-out bg-gray-700 rounded-md group-hover:bg-opacity-0 duration-400">
                <span className="relative text-white"><i className="fa-brands fa-github mr-2"></i>查看演示</span>
              </span>
            </a>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 w-1/2 overflow-hidden h-full hidden lg:block">
          <img src="https://upload-images.jianshu.io/upload_images/3424642-0d8e3cc6382bbba3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/960" alt="" className="w-full rounded-tl-xl translate-x-1/3 translate-y-16 drop-shadow-[0_48px_48px_rgba(59,130,246,0.75)]" />
        </div>

      </div>

      <FullContainer>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-8 gap-10">
          {
            data.map((item: Emoji) => (
              <div key={item.name} className="shadow w-full rounded-lg text-center hover:shadow-xl">
                <div
                  className="rounded-t-lg w-full py-14 mb-6 cursor-pointer " style={{ backgroundColor: item.color }}
                  onClick={() => navigator.clipboard.writeText(item.emoji)}
                >
                  <div className="text-7xl select-none">
                    {
                      item.emoji
                    }
                  </div>
                </div>
                <p
                  className="inline text-lg cursor-pointer select-none font-mono font-semibold py-1 border-b-0 bg-no-repeat bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[length:100%_3px] bg-[length:0_3px] bg-left-bottom transition-[background-size] duration-500 ease-in-out"
                  onClick={() => navigator.clipboard.writeText(item.code)}
                >{item.code}</p>
                <p className="text-sm text-gray-500 mt-4 mb-6 px-4 font-sans">{item.description}</p>
              </div>
            ))
          }
        </div>

      </FullContainer>
    </div>
  )

}

export async function getStaticProps() {

  const content = readFileSync(path.join(process.cwd(), 'data/json/gitmojis.json'), 'utf-8')

  return {
    props: {
      data: JSON.parse(content),
    },
  }

}

export default Page
