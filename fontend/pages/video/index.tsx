const BlogPage = () => {

  return (
    <div className='w-full p-10 flex flex-col space-y-6'>

      <div className='flex flex-row flex-1 space-x-6'>

        <div className='flex flex-col space-y-6'>

          <div className='bg-white w-72 rounded-lg shadow flex flex-col flex-1 space-y-4 p-4'>
            {
              ['视频封面', '视频封面'].map((item, index) => (
                <div className="bg-gray-100 flex w-full h-72 rounded-lg items-center justify-center" key={index}>
                  <div className="text-gray-400">{item}</div>
                </div>
              ))
            }
          </div>

        </div>
        
        <div className="bg-gray-900 flex flex-1 flex-col rounded-lg shadow shadow-white">
          <div className="flex-none h-16">

          </div>
          <video src="" controls={true} className="flex flex-1 rounded-b-lg">
          </video>
        </div>

      </div>

    </div>
  )

}

export default BlogPage