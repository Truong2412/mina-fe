export interface themeContextType {
  theme: any
  changeTheme: (theme: string) => void
}
export interface responseProps {
  code: number
  data: any
  msg: any
}
export const responseDefault: responseProps = {
  code: 200,
  data: {},
  msg: null
}
