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
//post
async function CreatePostApi(
  data: CreatePostDto
): Promise<ResponseProps<string | null>> {
  const url = `${API}/post`
  const result = await apiHandler<string | null>({
    method: METHOD.POST,
    url: url,
    data: data
  })
  return result
}

//class
export interface CreateClassDto {
  classLevel:
    | CLASS_LEVEL.N1
    | CLASS_LEVEL.N2
    | CLASS_LEVEL.N3
    | CLASS_LEVEL.N4
    | CLASS_LEVEL.N5
  numberOfStudents: number
  cardImg: string
  schedule: any
  time: any
  description: string
  creatorId: string
  teacher?: string
}

async function CreateClassApi(
  data: CreateClassDto
): Promise<ResponseProps<string | null>> {
  const url = `${API}/class`
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

export { CreatePostApi, CreateClassApi, SearchClassApi }
