const http = {

  get: async (url: string) => {
    const resp = await fetch(url)
    const data = await resp.json()
    if (data.code === 0) {
      return data.data
    }
    throw new Error(data.message)
  }

}

export default http;