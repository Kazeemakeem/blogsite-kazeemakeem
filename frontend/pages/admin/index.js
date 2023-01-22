import React from 'react'
import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'
import Link from 'next/link'

const AdminIndex = () => {
  return (
    <Layout>
        <Admin>
          <div className='text-2xl font-bold py-10'>
            <h2>Admin Dashboard</h2>
          </div>
          <div className='grid grid-cols-4 gap-5'>
            <ul className='text-xl font-bold flex flex-col gap-2 py-2 px-4'>
              <li className='border-b-2 border-t-2 border-gray-200 py-3'>
                <Link href='/admin/crud/category-tag'>
                  <a>Create Category</a>
                </Link>
              </li>
              <li className='border-b-2 border-gray-200 py-3'>
                <Link href='/admin/crud/category-tag'>
                  <a>Create Tag</a>
                </Link>
              </li>
              <li className='border-b-2 border-gray-200 py-3'>
                <Link href='/admin/crud/blog'>
                  <a>Create Blog</a>
                </Link>
              </li>
            </ul>
              
            <ul>
              <li>
                <Link href='/admin/crud/category-tag'>
                  <a>right</a>
                </Link>
              </li>
            </ul>
          </div>
        </Admin>
    </Layout>
  )
}

export default AdminIndex
