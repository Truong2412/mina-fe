import { ResponseProps, apiHandler } from '@/network/services/api-handler'
import { API, CLASS_LEVEL, METHOD } from '../../const/app-const'

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

export { CreatePostApi }
