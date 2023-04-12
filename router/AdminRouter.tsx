import React from 'react'
import { Route, Routes } from 'react-router'
import { ProtectRouter } from './ProtectRouter'
import { PATH, ROLE } from '../const/app-const'
import { Login, Register } from '../pages/user-page'
import { CategoryManager } from '../pages/admin-page/category-manager/CategoryManager'
import { ProductManager } from '../pages/admin-page'
export const AdminRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Register role={ROLE.ADMIN} />} />
      <Route
        path="*"
        element={
          <ProtectRouter role={ROLE.ADMIN}>
            <React.Fragment>
              <Route path={PATH.CATEGORY} element={<CategoryManager />} />
              <Route path={PATH.PRODUCT} element={<ProductManager />} />
            </React.Fragment>
          </ProtectRouter>
        }
      />
    </Routes>
  )
}
