import {
  PagingResponseProps,
  ResponseProps,
  apiHandler
} from '@/network/services/api-handler'
import { API, CLASS_LEVEL, METHOD } from '../../const/app-const'
import { ClassProps } from '@/entities/class.entities'

export interface CreatePostDto {
  title: string
  type: string
  content: string
}

//class
export interface CreateRegisClassDto {
  name: string
  phone: string
  address: string
  email: string
  facebookLink: string
  method: 0
  classLevel: CLASS_LEVEL
  knowFrom: string
  everStudied: Boolean
  leanTo: string
  note: string
  userId: string
  classId: string
}

async function CreateRegisClassApi(
  data: CreateRegisClassDto
): Promise<ResponseProps<string | null>> {
  const url = `${API}/regis-class`
  const result = await apiHandler<string | null>({
    method: METHOD.POST,
    url: url,
    data: data
  })
  return result
}

async function SearchClassApi(
  params: string
): Promise<ResponseProps<PagingResponseProps<ClassProps> | null>> {
  const url = `${API}/class/search?${params}`
  const result = await apiHandler<PagingResponseProps<ClassProps> | null>({
    method: METHOD.GET,
    url: url
  })
  return result
}

export { CreateRegisClassApi, SearchClassApi }
