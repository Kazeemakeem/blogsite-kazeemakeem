import React from 'react'
import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import Link from 'next/link'
import BlogCreate from '../../../components/crud/BlogCreate'

const Blog = () => {
  return (
    <Layout>
        <Admin>
          <div className='text-2xl font-bold py-10'>
            <h2>Manage Blog</h2>
          </div>
          <div className=''>
            <div>
              <BlogCreate />
            </div>
          </div>
        </Admin>
    </Layout>
  )
}

export default Blog
