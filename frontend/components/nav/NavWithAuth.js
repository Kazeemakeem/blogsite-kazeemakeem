import React from 'react'
import Router from 'next/router'
import { signout, isAuth } from '../../actions/auth'
import Link from 'next/link'

const NavWithAuth = ({display}) => {
  return (
    <ul className={`${display} font-bold text-gray-400 text-xl pt-3 h-full`}>
       <li className='cursor-pointer'>
        <Link href={isAuth().role === 1 ? '/admin' : isAuth().role === 0 ? '/user' : '/'}>
          <a className='hover:text-gray-600 active:text-gray-600 active:border-b-2 border-orange-500'>{`${isAuth().name}'s Dashboard`}</a>
        </Link>
      </li>
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