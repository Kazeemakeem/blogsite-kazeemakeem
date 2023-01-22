import React, { lazy } from 'react'
import Layout from '../components/Layout'
import dynamic from 'next/dynamic'

const SigninComponent = lazy(
  () => import("../components/auth/SigninComponent")
)

const Signin = () => {
  return (
    <Layout>
      <SigninComponent />
    </Layout>
  )
}

export default Signin