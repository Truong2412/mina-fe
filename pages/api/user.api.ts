import { ResponseProps } from '@/network/services/api-handler'
import { API, METHOD } from '../../const/app-const'
import { UserProps } from '@/entities/user.entities'
import { localToken } from '@/ultis/useActor'

const PATH = `${API}/user`

async function RegisterApi(data: any): Promise<ResponseProps<string | null>> {
  const url = `${PATH}/register`
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

export { RegisterApi, LoginWithAccountApi, AuthenApi }
