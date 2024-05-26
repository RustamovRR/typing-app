type NavigationTypes = {
  count: number
  next: number | null
  previous: number | null
}

export type QueryParamsType = Partial<{
  limit: number
  type_ides: string
  tag_id: string
  offset: number
}>

export type GetResponseType<T> = NavigationTypes & {
  results: T
}

export interface IErrorResponse {
  data: any
  name: string
}
