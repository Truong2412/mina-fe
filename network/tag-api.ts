import { API, METHOD } from '../const/app-const'
import { apiHandler } from './services/api-handler'
const originUrl = `${API}/tag`
interface createTagApiProps {
  data: {
    name: string
    color: string
  }
  token: string | undefined
}
export const createTagApi = async ({ data, token }: createTagApiProps) => {
  const url = `${originUrl}/create`
  const result = await apiHandler({
    method: METHOD.POST,
    url: url,
    data: data,
    token: token
  })
  return result
}

export const getTagApi = async (token: string) => {
  const url = `${originUrl}`
  const result = await apiHandler({
    method: METHOD.GET,
    url: url,
    token: token
  })
  return result
}

export const deleteTagApi = async (token: string, _id: string) => {
  const url = `${originUrl}/${_id}`
  const result = await apiHandler({
    method: METHOD.DELETE,
    url: url,
    token: token
  })
  return result
}
