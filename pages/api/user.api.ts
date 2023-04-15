import { ResponseProps, apiHandler } from '@/network/services/api-handler'
import { API, METHOD } from '../../const/app-const'
import { UserProps } from '@/entities/user.entities'
const PATH = `${API}/user`

async function RegisterApi(data: any): Promise<ResponseProps<string | null>> {
  const url = `${PATH}/register`
  const result = await apiHandler<string | null>({
    method: METHOD.POST,
    url: url,
    data: data
  })
  return result
}

export interface LoginApiProps {
  email: string
  password: string
}
interface loginResult {
  accessToken: string
}

async function LoginWithAccountApi(
  data: LoginApiProps
): Promise<ResponseProps<loginResult | null>> {
  const url = `${PATH}/login/account`
  const result = await apiHandler<loginResult | null>({
    method: METHOD.POST,
    url: url,
    data: data
  })
  return result
}

async function AuthenApi(
  token: string
): Promise<ResponseProps<UserProps | null>> {
  const url = `${PATH}/auth`
  const result = await apiHandler<UserProps | null>({
    method: METHOD.GET,
    url: url,
    token: token
  })
  return result
}

export { RegisterApi, LoginWithAccountApi, AuthenApi }
