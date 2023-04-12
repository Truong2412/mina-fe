import { API, METHOD } from '../const/app-const'
import { basicUser, registerDataType } from '../types/user-type'
import { apiHandler } from './services/api-handler'
const PATH = `${API}/user`

const RegisterApi = async (data: registerDataType) => {
  const url = `${PATH}/register`
  const result = await apiHandler({
    method: METHOD.POST,
    url: url,
    data: data
  })
  return result
}

const LoginApi = async (data: basicUser) => {
  const url = `${PATH}/login`
  const result = await apiHandler({
    method: METHOD.POST,
    url: url,
    data: data
  })
  return result
}
const AuthenticatorApi = async (token: string) => {
  const url = `${PATH}/auth`
  const result = await apiHandler({
    method: METHOD.GET,
    url: url,
    token: token
  })
  return result
}

export { RegisterApi, LoginApi, AuthenticatorApi }
