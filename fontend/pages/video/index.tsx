import AppHeader from "../../components/AppHeader"

const VideoPage = () => {

  return (
    <div className='w-full p-10 flex flex-col space-y-6'>

      <AppHeader></AppHeader>

      <div className="w-full flex flex-row space-x-4 shadow shadow-white">
        <video src="" controls={true} className="flex flex-1 rounded-lg">
        </video>
        <div className="bg-gray-900 w-72 flex-none rounded-lg"></div>
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