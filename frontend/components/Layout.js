import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='max-w-[120rem] mx-auto px-6'>
        {children}
        <p>Footer</p>
      </div>
    </div>
  )
}

export default Layout
