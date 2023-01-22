import React from 'react'
import Layout from '../../components/Layout'
import Private from '../../components/auth/Private'


const UserIndex = () => {
  return (
    <Layout>
        <Private>
            <h2>This is User Dashboard</h2>
        </Private>
    </Layout>
  )
}

export default UserIndex