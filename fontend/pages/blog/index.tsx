import AppHeader from "../../components/AppHeader"

const BlogPage = () => {

  return (
    <div className='w-full p-10 flex flex-col space-y-6'>

      <AppHeader></AppHeader>

      <div className='flex flex-row flex-1 space-x-6'>

        <div className='flex flex-col space-y-6'>

          <div className='bg-white w-72 rounded-lg shadow flex flex-col flex-1 space-y-4 p-4'>
            {
              ['全部', '基础科学', '操作系统', 'Python', 'Java', '前端', '数据库', 'DevOps', '其他'].map((item, index) => (
                <div className="bg-gray-100 flex w-full h-24 rounded-lg items-center justify-center" key={index}>
                  <div className="text-gray-400">{item}</div>
                </div>
              ))
            }
          </div>

        </div>

        <div className='bg-white flex flex-1 flex-col rounded-lg shadow p-8 divide-y'>
          {
            ['A', 'B', 'C', 'D'].map((item, index) => (
              <div className="w-full mx-auto my-4" key={index}>
                <div className="animate-pulse flex">
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-gray-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                        <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )

}

export default BlogPage