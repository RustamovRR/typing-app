export interface ILoginRegisterParams {
  email: string
  password: string
}

export interface ILoginResponse {
  error?: string
  message: string
  status?: number
  statusCode?: number
}

export interface IRegisterResponse {
  refresh: string
  access: string
  username: string
  first_name: string
  last_name: string
  email: string
  avatar: string
}
