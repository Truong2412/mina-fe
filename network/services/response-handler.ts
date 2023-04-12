import { RESPONSE_CODE } from '../../const/app-const'

export function checkRes(
  response: { code: number; msg: string; data: any },
  success: (props?: any) => void,
  failed: (props?: any) => void,
  always: (props?: any) => void
) {
  setTimeout(() => {
    if (
      response.code === RESPONSE_CODE.CREATED ||
      response.code === RESPONSE_CODE.OK
    ) {
      success()
    } else {
      failed()
    }
    always()
  }, 1000)
}
