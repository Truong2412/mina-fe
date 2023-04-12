import axios, { AxiosResponse } from 'axios'
import { METHOD } from '../../const/app-const'

interface headerProps {
  'Content-Type'?: string
  'X-Access-Token'?: string
}
interface apihanlderProps extends headerProps {
  url: string
  method: METHOD.GET | METHOD.POST | METHOD.PATCH | METHOD.PUT | METHOD.DELETE
  token?: string
  data?: any
}
interface headersProps {
  'x-access-token'?: string
  'Content-Type': 'application/json'
}
export async function apiHandler({
  url,
  method,
  token,
  data
}: apihanlderProps) {
  const headers: headersProps = {
    'Content-Type': 'application/json'
  }
  if (token) {
    headers['x-access-token'] = token
  }
  try {
    // console.log(headers)
    const response: AxiosResponse = await axios({
      method: method,
      url: url,
      data,
      headers: { ...headers }
    })
    if (response) {
      return response.data
    } else {
      throw new Error('no response - sender: `api-handler.ts`')
    }
  } catch (error: any) {
    return error.response.data
  }
}
