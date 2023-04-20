import { PATH, ROLE } from '@/const/app-const'
import { useUser } from '@/hooks'
import { CrownTwoTone } from '@ant-design/icons'
import { Badge, Dropdown, MenuProps } from 'antd'
import Link from 'next/link'

interface AminMenuProps {
  userName: string
  role: ROLE
}

export function AdminMenu({ userName, role }: AminMenuProps): JSX.Element {
  const { reset } = useUser()
  const items: MenuProps['items'] = [
    {
      key: 'quanly',
      label: <Link href={`/${PATH.ADMIN}`}>Quản lý</Link>
    },
    {
      key: 'logout',
      label: <div onClick={reset}>Đăng xuất</div>
    }
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottom" arrow>
      <Badge
        count={
          role === ROLE.ADMIN ? (
            <CrownTwoTone twoToneColor={'green'} />
          ) : role === ROLE.STAFF ? (
            <CrownTwoTone />
          ) : null
        }
      >
        <span
          style={{ lineHeight: '2.3rem', cursor: 'pointer', color: '#d3eaf2' }}
        >
          {userName}
        </span>
      </Badge>
    </Dropdown>
  )
}
