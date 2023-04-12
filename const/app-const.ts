export const THEME = {
  LIGHT: {
    text: 'light',
    style: {
      background:
        'linear-gradient(150deg, rgba(95,237,240,1) 0%, rgba(255,149,217,1) 100%)',
      color: 'black'
    }
  },
  DARK: {
    text: 'dark',
    style: {
      background:
        'linear-gradient(150deg, rgba(43,98,99,1) 0%, rgba(117,67,99,1) 100%)',
      color: '#d3eaf2'
    }
  }
}

export const ROLE = {
  ADMIN: 'admin',
  STAFF: 'staff',
  CUSTOMER: 'customer'
}

export const PATH = {
  CUSTOMER: 'khach-hang',
  MANAGER: 'quan-ly',
  STORE: 'cua-hang',
  ORDER: 'don-hang',
  SETTING: 'cai-dat',
  PROFILE: 'ho-so',
  PRODUCT: 'san-pham',
  LOGIN: 'dang-nhap',
  REGISTER: 'dang-ky',
  FORGOT_PASSWORD: 'quen-mat-khau',
  CREATE: 'tao-moi',
  EDIT: 'chinh-sua',
  CATEGORY: 'danh-muc',
  WAREHOUSE: 'kho-hang',
  PROMOTIONS: 'chuong-trinh-khuyen-mai',
  SALES_STATISTICS: 'bao-cao-doan'
}

export const STORAGE_KEY = {
  LOCAL_USER: 'tshop-user',
  THEME: 'theme'
}

export const API = `${process.env.REACT_APP_SERVER_URL}/api`

export enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export const RESPONSE_CODE = {
  FAILED: 400,
  AUTH_FAILED: 401,
  CREATED: 201,
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL: 500,
  EXIST: 409
}

export const STORAGE = {
  LOCAL: 'local',
  SESSION: 'session'
}

export const ACCEPT_FILE = ['image/jpeg', 'image/jpg', 'image/png']
