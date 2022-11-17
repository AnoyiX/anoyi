export const WebResponse = {

  success: (data: any) => ({
    code: 0,
    message: 'success',
    data
  }),

  successList: (data: any, has_more: boolean, skip?: number, limit?: number, total?: number) => ({
    code: 0,
    message: 'success',
    data: {
      data,
      has_more,
      skip,
      limit,
      total,
    }
  }),

  error: (message: string) => ({
    code: 500,
    message: message,
  }),

}

export const EdgeWebResponse = {

  success: (data: any) => {
    return new Response(
      JSON.stringify({
        code: 0,
        message: 'success',
        data
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  },

  successList: (data: any, has_more: boolean, skip?: number, limit?: number, total?: number) => {
    return new Response(
      JSON.stringify({
        code: 0,
        message: 'success',
        data: {
          data,
          has_more,
          skip,
          limit,
          total,
        }
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    )

  },

  error: (message: string) => {
    return new Response(
      JSON.stringify({
        code: 0,
        message: message,
      }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  },

}

