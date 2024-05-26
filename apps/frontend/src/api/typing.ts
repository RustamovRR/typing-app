import { GetResponseType, QueryParamsType } from '@/types'
import { fetchApi } from './common'

export const getTypingContentsApi = async (params?: QueryParamsType) => {
  return fetchApi<GetResponseType<any[]>>('/typing-content/', 'GET', { params })
}
