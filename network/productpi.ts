import { API, METHOD } from '../const/app-const'
import { apiHandler } from './services/api-handler'
const originUrl = `${API}/product`

//types
export interface ProductProps {
  productImgs: string[]
  name: string
  retailUnit: string
  tags?: string[]
}

export interface ProductClassifyProps {
  classifyImg: string
  classifyName: string
  classifyPrice: number
  unitSales: string
  convertToRetailUnit: number
}

export interface CreateProductProps extends ProductProps {
  classify: ProductClassifyProps[]
}

interface createProductApiProps {
  data: CreateProductProps
  token: string
}
//

// api create new product
export const createProductApi = async ({
  data,
  token
}: createProductApiProps) => {
  const url = `${originUrl}/create`
  const result = await apiHandler({
    method: METHOD.POST,
    url: url,
    data: data,
    token: token
  })
  return result
}

//
