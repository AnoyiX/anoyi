import moment from "moment"
import 'moment/locale/zh-cn'
import AppHeader from "../../components/AppHeader"
import FullContainer from "../../components/Containers"
import { InlineApps } from "../../constants/app"
import useVideos from "../../hooks/useVideos"

const Video = () => {

  const {videos, hasMore} = useVideos(0, 18)

  return (
    <div className='w-full p-10 flex flex-col space-y-6'>

      <AppHeader path={[InlineApps[1],]} />

      <FullContainer>
        <div className="grid grid-cols-2 p-8 gap-8">
          
          {
            videos.map((item, index) => (
              <div key={index} className="border rounded-lg h-64 w-full flex flex-row">
                <img src={item.video.cover.url_list[0]} alt="" className="rounded-l-lg" />
                <div className="flex flex-col p-4 gap-4">
                  <div className="flex flex-row gap-2">
                    <img src={item.author.avatar_168x168.url_list[0]} alt="" className="w-12 h-12 rounded-full" />
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-lg font-bold text-gray-900">{item.author.nickname}</span>
                      <span className="text-xs text-gray-400">{item.author.custom_verify || '抖音创作者'}</span>
                    </div>
                  </div>

                  <div className="text-gray-600">
                    {item.desc}
                  </div>

                  <div className="flex flex-row gap-4 text-xs items-center">
                    {
                      item.poi_info && <span className="bg-blue-500 rounded bg-opacity-10 border border-blue-500 px-2 py-1 text-blue-500">{item.poi_info.poi_name}</span>
                    }
                    <span className="text-gray-500">{moment(item.create_time * 1000).fromNow()}</span>
                  </div>
                </div>
              </div>
            ))
          }
          
        </div>
      </FullContainer>

    </div>
  )

}

export default Video