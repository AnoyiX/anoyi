const http = {

  get: async (url: string, init?: RequestInit) => {
    const resp = await fetch(url, init)
    if (resp.status == 200) {
      const data = await resp.json()
      if (data.code === 0) {
        return data.data
      }
      throw new Error(data.message)
    } else {
      throw new Error('请求失败')
    }
  },

  getAll: async (url: string, init?: RequestInit) => {
    const resp = await fetch(url, init)
    if (resp.status == 200) {
      return await resp.json()
    } else {
      throw new Error('请求失败')
    }
  },

  post: async ([url, body]: any[]) => {
    const resp = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
    if (resp.status == 200) {
      const data = await resp.json()
      if (data.code === 0) {
        return data.data
      }
      throw new Error(data.message)
    } else {
      throw new Error('请求失败')
    }
  },

  postAll: async ([url, body]: any[]) => {
    const resp = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
    if (resp.status == 200) {
      return await resp.json()
    } else {
      throw new Error('请求失败')
    }
  }

}

export default http