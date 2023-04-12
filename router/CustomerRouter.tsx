import { Route, Routes } from 'react-router-dom'
import React from 'react'
import { PATH, ROLE } from '../const/app-const'
import { Login, Register } from '../pages/user-page'
import { ProtectRouter } from './ProtectRouter'
import { Profile } from '../pages/profile/Profile'

export const CustomerRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register role={ROLE.CUSTOMER} />} />
      <Route
        path="*"
        element={
          <ProtectRouter role={ROLE.CUSTOMER}>
            <Route
              path={PATH.PROFILE}
              element={<Profile role={ROLE.CUSTOMER} />}
            />
          </ProtectRouter>
        }
      />
    </Routes>
  )
}
