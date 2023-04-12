import React from 'react'
import { ProfileView } from './view'

interface Props {
  role: string
}

export const Profile: React.FC<Props> = ({ role }) => {
  return <ProfileView />
}
