import {useState} from 'react'
import { List, X } from 'phosphor-react'
import Link from 'next/link'
// import { APP_NAME } from '../config'
import {signout, isAuth } from '../actions/auth'
import Router, {useRouter} from 'next/router'
import NavWithAuth from './nav/NavWithAuth'


const Navbar = () => {

  const [showNav, setShowNav] = useState(false)

  return (
      <div className='max-w-[120rem] mx-auto px-6 py-12 flex justify-between items-center border-b-2 border-gray-100 relative'>
        <div className='flex gap-10 sm:justify-between items-center w-full'>
            <List size={32} 
            className='sm:hidden flex justify-center items-center cursor-pointer' 
            onClick={() => setShowNav(!showNav)}/>
            <h1 className='text-gray-800 font-[700] text-5xl tracking-tighter'>
              <Link href='/'>
                <a>{process.env.NEXT_PUBLIC_APP_NAME}</a>
              </Link>
            </h1>
            <NavWithAuth />
        </div>

        {/* Mobile Menu */}
        {/* overlay */}

        { showNav ? <div className='sm:hidden bg-black/80 fixed w-full h-screen z-10 top-0 left-0'
        onClick={() => setShowNav(!showNav)}></div> : ''}

        {/* side drawer menu */}      
        <div className={`sm:hidden fixed  w-[20rem] h-screen bg-white z-10 duration-300 ${showNav ? 'top-0 left-0' : 'top-0 left-[-100%]'}`}>
          <X onClick={() => setShowNav(!showNav)} size={25} className='absolute right-4 top-4 cursor-pointer' />
          <h2 className='text-left ml-12 text-2xl mt-2 p-4 font-extrabold '>Menu</h2>
          <nav>
            <ul className='flex flex-col p-4 text-gray-400 font-bold text-xl gap-6'>
              <li className={`${isAuth() ? 'hidden' : ''} cursor-pointer`}>
                <Link href='/signup'>
                  <a className='hover:text-gray-600 active:text-gray-600 active:border-b-2 border-orange-500'>Signout</a>
                </Link>
              </li>
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
          </nav>
        </div>
      </div>
  )
}

export default Navbar
