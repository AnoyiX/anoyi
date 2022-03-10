import Dock from '../components/Dock'
import { Douyin, Github, Jianshu, Yuque, Zhihu } from '../components/Icons'
import Link from 'next/link'
import { Skills, Languages, ToolBox } from '../constants/user'
import { InlineApps } from '../constants/app'
import FullContainer from '../components/Containers'
import Head from 'next/head'

const IndexPage = () => {

  return (
    <div className='w-full flex flex-col flex-1 space-y-6 p-8'>

      <Head>
        <title>轻量级云原生架构实验室</title>
      </Head>

      <div className='flex flex-row flex-1 space-x-6'>

        <div className='flex flex-col space-y-6'>
          <div className='bg-white w-72 h-72 rounded-lg shadow flex flex-col space-y-4 items-center justify-center'>
            <div className='flex flex-col items-center justify-center space-y-2'>
              <img className="w-32 h-32 rounded-full" src="https://upload.jianshu.io/users/upload_avatars/3424642/abb0b8e9-cfb6-40a4-92d1-4e326aeebd32.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240" alt="" />
              <div className="text-xl font-medium">Anoyi 🐬</div>
              <div className='text-gray-400'>
                <span className='text-sm'>轻量级云原生架构实验室</span>
              </div>
            </div>
            <div className='flex flex-row space-x-4 items-center justify-center text-lg border-t border-gray-200 pt-4 w-full'>
              <a href="https://github.com/AnoyiX" target="_blank">
                <Github className='h-6 w-6 text-gray-400 hover:text-gray-800' />
              </a>
              <a href="https://www.yuque.com/anoyi" target="_blank">
                <Yuque className='h-6 w-6 text-gray-400 hover:text-gray-800' />
              </a>
              <a href="https://www.douyin.com/user/MS4wLjABAAAAFS6CPjIHAim7TdTQjzevZX7LwfKCIi37PTVmqCpzdU0" target="_blank">
                <Douyin className='h-6 w-6 text-gray-400 hover:text-gray-800' />
              </a>
              <a href="https://www.jianshu.com/u/7b7ec6f2db21" target="_blank">
                <Jianshu className='h-6 w-6 text-gray-400 hover:text-gray-800' />
              </a>
              <a href="https://www.zhihu.com/people/anoyi-x" target="_blank">
                <Zhihu className='h-6 w-6 text-gray-400 hover:text-gray-800' />
              </a>
            </div>
          </div>

          <div className='bg-white w-72 rounded-lg shadow flex flex-row space-x-6 items-center justify-center py-4'>
            {
              [Languages, Skills, ToolBox].map((item, index) => (
                <Dock name={item.name} key={index} data={item.children}></Dock>
              ))
            }
          </div>

          <div className='flex flex-col items-center space-y-2 text-gray-400 text-xs'>
            <div className='flex flex-row space-x-1'>
              <a className="hover:text-blue-400" href="#">关于作者</a>
              <span>{'·'}</span>
              <a className="hover:text-blue-400" href="#">工作内推</a>
              <span>{'·'}</span>
              <a className="hover:text-blue-400" href="#">投诉建议</a>
              <span>{'·'}</span>
              <a className="hover:text-blue-400" href="#">开源协议</a>
            </div>
            <div className='text-center'>
              <span>Anoyi © 2022 All Rights Reserved</span>
            </div>
            <div className='text-center'>
              <a className="text-gray-400 text-xs hover:text-blue-400" href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备16007917号-1</a>
            </div>
          </div>
        </div>

        <FullContainer>
          <div className='flex flex-1 flex-row flex-wrap p-8 gap-6'>
            {
              InlineApps.map((item, index) => (
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

export default IndexPage