import Dock from '../components/Dock'
import Link from 'next/link'
import FullContainer from '../components/Containers'
import Head from 'next/head'
import { readFileSync } from 'fs'
import path from "path"

const Page = ({apps, my}) => {

  return (
    <div className='w-full flex flex-col flex-1 gap-4 md:gap-6 p-4 md:p-8'>

      <Head>
        <title>轻量级云原生架构实验室</title>
      </Head>

      <div className='flex flex-col md:flex-row flex-1 gap-4 md:gap-6'>

        <div className='flex flex-col gap-4 md:gap-6'>
          <div className='bg-white w-full md:w-72 p-4 rounded-lg shadow flex flex-col gap-4 items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-2'>
              <img className="w-32 h-32 rounded-full" src="https://upload.jianshu.io/users/upload_avatars/3424642/abb0b8e9-cfb6-40a4-92d1-4e326aeebd32.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240" alt="" />
              <div className="text-xl font-medium">Anoyi 🐬</div>
              <div className='text-gray-400'>
                <span className='text-sm'>轻量级云原生架构实验室</span>
              </div>
            </div>
            <div className='flex flex-row gap-4 items-center justify-center text-lg border-t border-gray-200 pt-4 w-full'>
              <a href="https://github.com/AnoyiX" target="_blank">
                <i className="fa-brands fa-github text-xl text-gray-400 hover:text-gray-800"></i>
              </a>
              <a href="https://www.douyin.com/user/MS4wLjABAAAAFS6CPjIHAim7TdTQjzevZX7LwfKCIi37PTVmqCpzdU0" target="_blank">
                <i className="fa-brands fa-tiktok text-xl text-gray-400 hover:text-gray-800"></i>
              </a>
              <a href="https://twitter.com/AnoyiX" target="_blank">
                <i className="fa-brands fa-twitter text-xl text-gray-400 hover:text-gray-800"></i>
              </a>
              <a href="https://twitter.com/AnoyiX" target="_blank">
                <i className="fa-brands fa-youtube text-xl text-gray-400 hover:text-gray-800"></i>
              </a>
              <a href="https://etherscan.io/address/0x80DF1CaB786398503f991AAF3B48Be06044CF42F" target="_blank">
                <i className="fa-brands fa-ethereum text-xl text-gray-400 hover:text-gray-800"></i>
              </a>
            </div>
          </div>

          <div className='bg-white w-full md:w-72 rounded-lg shadow flex flex-row space-x-6 items-center justify-center py-4'>
            {
              [my.languages, my.skills, my.softwares].map((item, index) => (
                <Dock name={item.name} key={index} data={item.children}></Dock>
              ))
            }
          </div>

          <div className='md:flex hidden flex-col items-center space-y-2 text-gray-400 text-xs '>
            <div className='flex flex-row space-x-1'>
              <a className="hover:text-blue-400" href="/doc/about">关于作者</a>
              <span>·</span>
              <a className="hover:text-blue-400" href="/doc/jobs">工作内推</a>
              <span>·</span>
              <a className="hover:text-blue-400" href="/doc/links">友情链接</a>
              <span>·</span>
              <a className="hover:text-blue-400" href="/doc/terms">用户协议</a>
            </div>
            <div className='text-center'>
              Anoyi © 2022 All Rights Reserved
            </div>
          </div>
        </div>

        <FullContainer>
          <div className='flex flex-1 flex-row flex-wrap p-8 gap-6'>
            {
              apps.map((item, index) => (
                <div className='flex flex-col items-center gap-1' key={index}>
                  <Link href={item.url}>
                    <div className='w-20 h-20 cursor-pointer'>
                      <img src={item.icon} alt="" className='w-full h-full' />
                    </div>
                  </Link>
                  <span className='text-gray-800 text-sm'>{item.name}</span>
                </div>
              ))
            }
          </div>
        </FullContainer>
      </div>
    </div>
  )

}

export async function getStaticProps() {

  const apps = readFileSync(path.join(process.cwd(), 'data/json/apps.json'), 'utf-8')
  const my = readFileSync(path.join(process.cwd(), 'data/json/my.json'), 'utf-8')

  return {
    props: {
      apps: JSON.parse(apps),
      my: JSON.parse(my),
    },
  }

}

export default Page