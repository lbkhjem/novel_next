// import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosResponse } from "axios"
// import { baseUrl } from "./APIManage"


export const AxiosInstance = axios.create({
  baseURL: 'http://18.142.48.180:8001/',
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

let isFinally = false
createAxiosResponseInterceptor()

// Request config
AxiosInstance.interceptors.request.use(
  async (requestConfig) => {
    const token = ''

    const ignoreHeader = requestConfig?.headers?.ignoreHeader

    // if (token && !ignoreHeader) {
    //   requestConfig.headers.Authorization = `${token}`
    // }
    // if (!requestConfig.baseURL) {
    //   requestConfig.baseURL = baseUrl
    // }
    console.log(
      `%cAPI request: ${requestConfig.method}`,
      'color:#1AF82A',
      requestConfig.url,
      '\nHeader: ',
      JSON.stringify(requestConfig.headers),
      '\nBody: ',
      JSON.stringify(requestConfig.data),
    )
    isFinally = false
    return requestConfig
  },
  (error) => {
    console.warn('There is an error occurred while requesting api', error)
    return Promise.reject(error?.response?.data)
  },
)

// Response
function createAxiosResponseInterceptor() {
  const interceptor = AxiosInstance.interceptors.response.use(
    (response) => {
      return parseResponseData(response)
    },
    async (error) => {
      console.log(error)
      const {status} = error?.response ?? {}

      if (status !== 401) {
        return Promise.reject(error?.response?.data || error?.response || error)
      }

      // * Eject the interceptor so it doesn't loop in case
      AxiosInstance.interceptors.response.eject(interceptor)
    }
  )
}

const parseResponseData = (response: AxiosResponse) => {
  if (!response) {
    return {
      data: null,
    }
  }
  const data = response.data
  // console.log(
  //   `%cAPI response: ${response.config?.method}`,
  //   'color:#4AF82F',
  //   response.config?.baseURL,
  //   response.config?.url,
  //   '\nResponse:',
  //    JSON.stringify(response),
  //   response.status,
  // )

//   if (response.config?.method !== 'get') {
//     store.dispatch(countAction())
//   }

  const extraData = {
    status: response.status,
    statusCode: response.status,
    next_page: response.headers?.['x-next-page'] || 0,
    total_items: response.headers?.['x-total-items'] || 0,
    total_count_order_complete: response.headers?.['x-count-order-complete'] || 0,
    total_price_order_complete: response.headers?.['x-sum-grand-total-complete'] || 0,
  }
  if (Array.isArray(data)) {
    return {
      data: [...data],
      ...extraData,
    }
  }
  return {
    ...data,
    ...extraData,
  }
}