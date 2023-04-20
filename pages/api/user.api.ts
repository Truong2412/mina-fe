import { ResponseProps } from '@/network/services/api-handler'
import { API, METHOD } from '../../const/app-const'
import { UserProps } from '@/entities/user.entities'

const PATH = `${API}/user`

export interface LoginApiProps {
  email: string
  password: string
}

interface loginResult {
  accessToken: string
}

export interface RegisAccountApiProps {
  name: string
  gender: string
  yOB: number
  password: string
  email: string
}
async function RegisAccountApi(
  data: RegisAccountApiProps
): Promise<ResponseProps<null>> {
  const url = `${PATH}`
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  return result
}

async function LoginWithAccountApi(
  data: LoginApiProps
): Promise<ResponseProps<loginResult | null>> {
  const url = `${PATH}/login/account`
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  return result
}

async function AuthenApi(
  token: string
): Promise<ResponseProps<UserProps | null>> {
  const url = `${PATH}/auth`
  const response = await fetch(url, {
    method: METHOD.GET,
    headers: {
      'x-access-token': token
    }
  })
  const result = await response.json()
  return result
}

export { RegisAccountApi, LoginWithAccountApi, AuthenApi }
