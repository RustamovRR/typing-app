import { fetchApi } from './common'

export const getUserProfile = async (params?: any) => {
  return fetchApi<any>('/user/profile/', 'GET', { params })
}
