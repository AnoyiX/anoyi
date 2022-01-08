import AppHeader from "../../components/AppHeader"
import { InlineApps } from "../../constants/app"

const VideoPage = () => {

  return (
      <div className='w-full p-10 flex flex-col space-y-6'>

        <AppHeader path={[InlineApps[1],]}  />

        <div className="w-full flex flex-row space-x-4 ">
          <video src="" controls={true} className="flex flex-1 rounded-lg shadow shadow-white">
          </video>
          <div className="bg-white w-96 flex-none rounded-lg shadow">
            {/* Profile header */}
            <div>
              <div>
                <img className="h-28 w-full rounded-t-lg object-cover" src={'https://p6.douyinpic.com/obj/c8510002be9a3a61aad2?from=116350172'} alt="" />
              </div>
              <div className="max-w-5xl mx-auto px-6">
                <div className="-mt-12 flex items-end space-x-5">
                  <div className="flex">
                    <img
                      className="rounded-full ring-4 ring-white h-28 w-28"
                      src={'https://upload.jianshu.io/users/upload_avatars/3424642/abb0b8e9-cfb6-40a4-92d1-4e326aeebd32.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'}
                      alt=""
                    />
                  </div>
                  <div className="mt-6 flex-1 min-w-0 flex items-center justify-end space-x-6 pb-1">
                    <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                      >
                        <span>主页</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                      >
                        <span>关注</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="block mt-6 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">{'Anoyi'}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col space-y-6'>

          <div className='bg-white w-full rounded-lg shadow flex flex-row space-x-4 p-4'>
            {
              ['视频封面', '视频封面', '视频封面', '视频封面'].map((item, index) => (
                <div className="bg-gray-100 flex w-48 h-72 rounded-lg items-center justify-center" key={index}>
                  <div className="text-gray-400">{item}</div>
                </div>
              ))
            }
          </div>

        </div>

      </div>


  )

}

export default VideoPage