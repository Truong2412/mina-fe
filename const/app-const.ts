export const textWhite = '#fff'

export const ROLE = {
  ADMIN: 'admin',
  STAFF: 'staff',
  CUSTOMER: 'customer'
}

export const PATH = {
  ABOUT_US: 've-mina',
  COURSE: 'khoa-hoc',
  OPENING_SCHEDULE: 'lich-khai-giang',
  CLASS_REGISTRATION: 'dang-ky-hoc',
  CLASS: 'lop-hoc',
  TAKE_THE_TEST: 'lam-bai-test'
}

export const STORAGE_KEY = {
  LOCAL_USER: 'tshop-user',
  THEME: 'theme',
  SECTIONTHEME: 'sectionTheme'
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

export const menuitemsList = [
  {
    path: PATH.ABOUT_US,
    label: 'Về MINA'
  },
  {
    path: PATH.CLASS_REGISTRATION,
    label: 'Đăng ký học'
  },
  {
    path: PATH.COURSE,
    label: 'Khoá học'
  },
  {
    path: PATH.CLASS,
    label: 'Lớp học'
  },
  {
    path: PATH.TAKE_THE_TEST,
    label: 'Làm bài Test'
  }
]
