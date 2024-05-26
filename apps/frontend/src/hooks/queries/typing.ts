import { GetResponseType } from '@/types'
import { QueryProps, useGetQuery } from './common'
import { getTypingContentsApi } from '@/api/typing'

export const useTypingContentsQuery = (props?: QueryProps<GetResponseType<any[]>>) =>
  useGetQuery('typing-contents', getTypingContentsApi, [], props)
