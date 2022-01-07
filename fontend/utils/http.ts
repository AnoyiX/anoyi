const http = {

  get: async (url: string) => {
    const resp = await fetch(url)
    if (resp.status == 200) {
      const data = await resp.json()
      if (data.code === 0) {
        return data.data
      }
      throw new Error(data.message)
    } else {
      throw new Error('请求失败')
    }
  }

}

export default http;