import React, { ReactNode, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { PATH, STORAGE_KEY } from '../const/app-const'
import { useLoading, useUser } from '../hooks'
import { AuthenticatorApi } from '../network/user-api'
import { useActor } from '../ultis/useActor'
import { checkRes } from '../network/services/response-handler'
interface Props {
  children: ReactNode
}

const Auth: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const currentPath = window.location.pathname
  const actor = useActor()
  const { user, update, reset } = useUser()
  const { setIsLoading } = useLoading()
  const localToken = sessionStorage.getItem(STORAGE_KEY.LOCAL_USER)
  console.log(user)
  const authChecker = useCallback(
    async (token: string) => {
      const result = await AuthenticatorApi(token)
      checkRes(
        result,
        () => {
          update({ ...result.data, token })
          if (
            currentPath === `/${PATH.CUSTOMER}/${PATH.LOGIN}` ||
            currentPath === `/${PATH.MANAGER}/${PATH.LOGIN}`
          ) {
            navigate(`/`)
          }
        },
        () => {
          reset()
          navigate(`/${actor}/${PATH.LOGIN}`)
        },
        () => setIsLoading(false)
      )
    },
    [actor, navigate, reset, update, currentPath]
  )

  useEffect(() => {
    if (!user._id && localToken) {
      setIsLoading(true)
      authChecker(localToken)
    }
  }, [user, localToken, authChecker])

  return <React.Fragment>{children}</React.Fragment>
}

export { Auth }
