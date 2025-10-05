import axios from 'axios'

export const axiosApiClient = axios.create({
  baseURL: '/api'
})

// すべての /api/** リクエストのレスポンスエラーをグローバルにハンドリング
axiosApiClient.interceptors.response.use(
  response => response,
  error => {
    const reason = error.response?.headers?.['x-auth-error']
    if (reason === 'cognito_required') {
      window.location.href = '/oauth2/authorization/cognito'
    } else if (reason === 'google_required') {
      window.location.href = '/oauth2/authorization/google'
    }
    return Promise.reject(error)
  }
)
