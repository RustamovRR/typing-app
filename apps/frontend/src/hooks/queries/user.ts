import { GetResponseType } from '@/types'
import { QueryProps, useGetQuery } from './common'
import { getUserProfile } from '@/api'

export const useUserProfileQuery = (props?: QueryProps<GetResponseType<any[]>>) =>
  useGetQuery('user-profile', getUserProfile, [], props)
