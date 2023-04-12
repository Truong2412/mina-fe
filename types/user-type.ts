export interface basicUser {
  phone: string
  password: string
}
//context type
export interface UserProps {
  gender: string | null
  yOB: number | null
  phone: string | null
  avatar: string | null
  name: string | null
  token: string | null
  role: string | null
  facebookId: string | null
  createdAt: Date | null
  updatedAt: Date | null
  _id: string | null
}

export interface UserConextProps {
  user: UserProps
  update: (values: UserProps) => void
  reset: () => void
  login: (token: string) => void
}
//

//register type
export interface registerDataType extends basicUser {
  gender: string
  yOB: number
  name: string
  role: string
  confirmPassword: string
}
export interface dataResponseProps extends UserProps {
  gender: string
  yOB: number
  name: string
  password: null
  phone: string
  role: string
  token: string
  createdAt: Date
  updatedAt: Date
  _v: number
  _id: string
  facebookId: string | null
  avatar: string | null
}

export interface LOCAL_UserProps {
  phone: string
  token: string
}
