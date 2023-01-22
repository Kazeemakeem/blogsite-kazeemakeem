import React from 'react'
import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import Link from 'next/link'
import Category from '../../../components/crud/Category'
import Tag from '../../../components/crud/Tag'

const CategoryTag = () => {
  return (
    <Layout>
        <Admin>
          <div className='text-2xl font-bold py-10'>
            <h2>Manage Categories and Tags</h2>
          </div>
          <div className='grid grid-cols-2 gap-20'>
            <div>
              <Category />
            </div>
            <div>
              <Tag />
            </div>
          </div>
        </Admin>
    </Layout>
  )
}

export default CategoryTag
