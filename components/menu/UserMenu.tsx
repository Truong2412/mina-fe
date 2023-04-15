import { PATH } from '@/const/app-const'
import { Dropdown, MenuProps } from 'antd'
import Link from 'next/link'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link href={`/${PATH.USER}/${PATH.PROFILE}`}>Thông tin tài khoản</Link>
    )
  }
]

interface UserMenuProps {
  userName: string
}
export function UserMenu({ userName }: UserMenuProps): JSX.Element {
  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottom" arrow>
      <span style={{ lineHeight: '2.3rem', cursor: 'pointer' }}>
        {userName}
      </span>
    </Dropdown>
  )
}
