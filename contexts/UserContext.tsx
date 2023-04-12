import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { STORAGE_KEY } from '../const/app-const'
import { UserConextProps, UserProps } from '../types/user-type'

const UserContext = createContext<UserConextProps>({} as UserConextProps)

type Props = {
  children: ReactNode
}
const initUser = {
  gender: null,
  yOB: null,
  phone: null,
  avatar: null,
  name: null,
  token: null,
  role: null,
  facebookId: null,
  createdAt: null,
  updatedAt: null,
  _id: null
}
const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserProps>(initUser)

  const update = useCallback(
    ({
      gender,
      yOB,
      phone,
      name,
      avatar = null,
      token = null,
      role,
      facebookId = null,
      createdAt,
      updatedAt,
      _id
    }: UserProps) => {
      setUser({
        gender,
        yOB,
        phone,
        name,
        avatar,
        token,
        role,
        facebookId,
        createdAt,
        updatedAt,
        _id
      })
    },
    []
  )

  const login = useCallback(
    (token: string) => {
      setUser({ ...user, token: token })
      sessionStorage.setItem(STORAGE_KEY.LOCAL_USER, token)
    },
    [user]
  )

  const reset = useCallback(() => {
    setUser(initUser)
    sessionStorage.removeItem(STORAGE_KEY.LOCAL_USER)
  }, [])

  return (
    <UserContext.Provider value={{ user, update, reset, login }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
