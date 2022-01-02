import Dock from '../components/Dock'
import { Doing, Douyin, Github, Jianshu, Yuque, Zhihu } from '../components/Icons'

const IndexPage = () => {

  return (
    <div className='bg-gray-100 w-screen min-h-screen p-10 flex flex-col space-y-6'>

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
                <Github className='h-6 w-6 text-gray-400' />
              </a>
              <a href="https://www.yuque.com/anoyi" target="_blank">
                <Yuque className='h-6 w-6 text-gray-400' />
              </a>
              <a href="https://www.douyin.com/user/MS4wLjABAAAAFS6CPjIHAim7TdTQjzevZX7LwfKCIi37PTVmqCpzdU0" target="_blank">
                <Douyin className='h-6 w-6 text-gray-400' />
              </a>
              <a href="https://www.jianshu.com/u/7b7ec6f2db21" target="_blank">
                <Jianshu className='h-6 w-6 text-gray-400' />
              </a>
              <a href="https://www.zhihu.com/people/anoyi-x" target="_blank">
                <Zhihu className='h-6 w-6 text-gray-400' />
              </a>
            </div>
          </div>

          <div className='bg-white w-72 rounded-lg shadow flex flex-row space-x-6 items-center justify-center py-4'>
            {
              ['Languages', 'Frameworks', 'ToolBox'].map((item, index) => (
                <Dock name={item} key={index}></Dock>
              ))
            }
          </div>

          <div className='bg-white w-72 rounded-lg shadow flex flex-col space-y-2 items-center py-4'>
            <div className="text-gray-600 text-sm">社交网络</div>
            <div className='flex flex-row flex-wrap items-center justify-center'>
              {
                ['A', 'B', 'C', 'D', 'E', 'F'].map(item => (
                  <div className='flex flex-col space-y-2 items-center m-2' key={item}>
                    <div className='bg-gray-100 w-16 h-16 rounded-full'></div>
                    <span className='text-gray-400 text-xs'>No. {item}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className='bg-white flex flex-1 flex-row flex-wrap rounded-lg shadow p-8'>
          {
            ['博客', '短视频', '书架', '理财'].map((item, index) => (
              <div className='flex flex-col space-y-2 items-center mr-6 mb-6' key={index}>
                <div className='bg-gray-100 w-20 h-20 rounded-md'></div>
                <span className='text-gray-800 text-sm'>{item}</span>
              </div>
            ))
          }
        </div>
      </div>

      <div className='bg-white w-full rounded-lg shadow flex flex-row items-center justify-center space-x-2 p-4'>
        <span className="text-gray-500 text-sm">Anoyi © 2022 All Rights Reserved.</span>
        <a className="text-gray-500 text-sm hover:text-blue-500" href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备16007917号-1</a>
      </div>
    </div>
  )

}

export default IndexPage