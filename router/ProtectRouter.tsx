import React, { ReactNode, useEffect } from 'react'
import { Routes, useNavigate } from 'react-router'
import { PATH, STORAGE_KEY } from '../const/app-const'
import { useUser } from '../hooks'
import { useActor } from '../ultis/useActor'
interface Props {
  role: string
  children: ReactNode
}

export const ProtectRouter: React.FC<Props> = ({ role, children }) => {
  const navigate = useNavigate()
  const { user } = useUser()
  const actor = useActor()
  const localToken = sessionStorage.getItem(STORAGE_KEY.LOCAL_USER)

  useEffect(() => {
    if (!localToken) {
      navigate(`/${actor}/${PATH.LOGIN}`)
    }
  }, [localToken])

  if (user.role === role && user._id && user.token) {
    return <Routes>{children}</Routes>
  } else {
    return null
  }
}
