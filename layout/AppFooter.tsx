import React from 'react'

export const AppFooter: React.FC = () => {
  const thisYear = new Date().getFullYear()
  return (
    <p style={{ textAlign: 'center' }}>&#169;&nbsp;Copyright by Mina Center - {thisYear}</p>
  )
}
