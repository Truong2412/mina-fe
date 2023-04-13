import React from 'react'

export const AppFooter: React.FC = () => {
  const thisYear = new Date().getFullYear()
  return (
    <p style={{ textAlign: 'center' }}>Copyright by Mina Center - {thisYear}</p>
  )
}
