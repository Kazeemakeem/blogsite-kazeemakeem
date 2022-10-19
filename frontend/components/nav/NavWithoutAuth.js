import React from 'react'
import Link from 'next/link'

const NavWithoutAuth = () => {
  return (
    <ul className='hidden sm:flex gap-16 font-bold text-gray-400 text-xl pt-3 h-full'>
      <li className='cursor-pointer'>
        <Link href='/signin'>
          <a className='hover:text-gray-600 active:text-gray-600 active:border-b-2 border-orange-500'>Signin</a>
        </Link>
      </li>
      <li className='cursor-pointer'>
        <Link href='/signup'>
          <a className='hover:text-gray-600 active:text-gray-600 active:border-b-2 border-orange-500'>Signup</a>
        </Link>
      </li>
    </ul>
  )
}

export default NavWithoutAuth
