import React from 'react'
import Router from 'next/router'
import { signout, isAuth } from '../../actions/auth'

const NavWithAuth = () => {
  return (
    <ul className='hidden sm:flex gap-16 font-bold text-gray-400 text-xl pt-3 h-full'>
      <li 
        onClick={() => signout(() => Router.replace('/signin'))} 
        className='cursor-pointer'>
        {/* <Link href=''> */}
          <a className='hover:text-gray-600 active:text-gray-600 active:border-b-2 border-orange-500'>Signout</a>
        {/* </Link> */}
      </li>
    </ul>)
}

export default NavWithAuth