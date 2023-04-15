import { NotFoundPage } from '@/components/notFoundPage/NotFoundPage'
import { ROLE } from '@/const/app-const'
import { useUser } from '@/hooks'
import React, { ReactNode, useEffect, useState } from 'react'
interface ProtectPageProps {
  role: ROLE
  children: ReactNode
}
export function ProtectPage({ role, children }: ProtectPageProps): JSX.Element {
  const [allow, setAllow] = useState(false)
  const { user } = useUser()
  useEffect(() => {
    if (user.role !== undefined && user.role <= role) {
      console.log('page allowed')
      return setAllow(true)
    } else {
      setAllow(false)
    }
  }, [user])
  return (
    <React.Fragment>
      {allow ? <>{children}</> : <NotFoundPage />}
    </React.Fragment>
  )
}
