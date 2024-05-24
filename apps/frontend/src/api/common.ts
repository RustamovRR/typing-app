import { BASE_API_URL } from '@/constants'
import { getCookie, queryStringUrl } from '@/utils'

export const fetchApi = async <T, R = T>(
  path: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET',
  args?: {
    body?: T
    params?: { [key: string]: any }
    withAuth?: boolean
  },
): Promise<R> => {
  const { body, params, withAuth = false } = args || {}

  const url = params && method === 'GET' ? queryStringUrl(`${BASE_API_URL}${path}`, params) : `${BASE_API_URL}${path}`

  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (withAuth) {
    const token = getCookie('access_token')
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body && method !== 'GET' ? JSON.stringify(body) : null,
  })

  // if (!response.ok) {
  //   const errorData = await response.json()
  //   throw new ApiError(errorData, response.status)
  // }

  return response.json()
}
