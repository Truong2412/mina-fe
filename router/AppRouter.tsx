import { Route, Routes } from 'react-router-dom'
import React from 'react'
import { CustomerRouter } from './CustomerRouter'
import { Store } from '../pages/store/Store'
import { PATH } from '../const/app-const'
import { AdminRouter } from './AdminRouter'

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Store />} />
        <Route path={`/${PATH.CUSTOMER}/*`} element={<CustomerRouter />} />
        <Route path={`/${PATH.MANAGER}/*`} element={<AdminRouter />} />
      </Route>
    </Routes>
  )
}
