import {
  PagingResponseProps,
  ResponseProps
} from '@/network/services/api-handler'
import { API, METHOD } from '../../const/app-const'
import { localToken } from '@/ultis/useActor'
import { PostProps } from '@/entities/post.entities'

async function CreatePostApi(
  data: PostProps
): Promise<ResponseProps<string | null>> {
  const url = `${API}/post`
  const response = await fetch(url, {
    method: METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localToken ?? ''
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  return result
}

async function SearchPostApi(
  params: string
): Promise<ResponseProps<PagingResponseProps<PostProps> | null>> {
  const url = `${API}/post/search?${params}`
  const response = await fetch(url, {
    method: METHOD.GET
  })
  const result = await response.json()
  return result
}

export { CreatePostApi, SearchPostApi }
