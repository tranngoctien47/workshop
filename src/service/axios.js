import axios from "axios"
import Urls from "../consts/Urls"
import storage from "../utils/localStorage"

const configs =  {
  baseURL: Urls.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*"
  }
}

const axiosClient = axios.create(configs)
axiosClient.defaults.timeout = 20000
axiosClient.interceptors.request.use( async (request) => {
  // request.headers["Accept-Language"] = storage.getLanguage()
  const authorization = storage.getAccessToken()
  if (authorization) {
    // TODO Update me
    request.headers= {
      Authorization: `Bearer ${authorization}` 
    }
    request.headers.token = authorization;
  }
  return request
})

axiosClient.interceptors.response.use(
  (response) => {
    // TODO: should return response with data not empty
    if ([200, 201].includes(response.status) || [204].includes(response.status)) {
      return response.data
    }
    return Promise.reject(response?.statusText || "")
  },
  async error => {
    const originalRequest = error.config
    const { data, statusCode } = error.response
    if (
      statusCode === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = storage.getRefreshToken();
      if (refreshToken) {
        return axios
          .post(`${configs.baseURL}/auth/refresh-token`, {
            refreshToken
          })
          .then(res => {
            const { token, refreshToken, expiredIn } = res.data
            storage.setAccessToken(token)
            storage.setRefreshToken(refreshToken)
            axios.defaults.headers.common.Authorization = token
            originalRequest.headers.Authorization = token
            return axiosClient(originalRequest)
          })
          .catch(error => {
            storage.removeAccessToken()
            storage.removeRefreshToken()
            return Promise.reject(error.response.data)
          })
      } else {
        storage.removeAccessToken()
        storage.removeRefreshToken()
        storage.removeLanguage()
      }

    }
    return Promise.reject(error.response.data)
  }
)

export default axiosClient
