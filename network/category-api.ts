import { API, METHOD } from '../const/app-const'
import { apiHandler } from './services/api-handler'
const originUrl = `${API}/category`
interface createCategoryApiProps {
  data: {
    text: string
    rootId?: string | null
  }
  token: string
}
export const createCategoryApi = async ({
  data,
  token
}: createCategoryApiProps) => {
  const url = `${originUrl}/create`
  const result = await apiHandler({
    method: METHOD.POST,
    url: url,
    data: data,
    token: token
  })
  return result
}

interface updateCategoryApiProps {
  data: {
    text: string
    _id: string | null
  }
  token: string
}

export const updateCategoryApi = async ({
  data,
  token
}: updateCategoryApiProps) => {
  const url = `${originUrl}/update`
  const result = await apiHandler({
    method: METHOD.PATCH,
    url: url,
    data: data,
    token: token
  })
  return result
}

export const deleteCategoryApi = async (token: string, _id: string) => {
  const url = `${originUrl}/${_id}`
  const result = await apiHandler({
    method: METHOD.DELETE,
    url: url,
    token: token
  })
  return result
}

export const getCategoryApi = async (token: string) => {
  const url = `${originUrl}`
  const result = await apiHandler({
    method: METHOD.GET,
    url: url,
    token: token
  })
  return result
}
