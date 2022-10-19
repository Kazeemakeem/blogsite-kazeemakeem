import React from 'react'
import Layout from '../components/Layout'
import dynamic from 'next/dynamic'

const SigninComponent = dynamic(
  () => import("../components/auth/SigninComponent"),
  { ssr: false }
)

const Signin = () => {
  return (
    <Layout>
      <SigninComponent />
    </Layout>
  )
}

export default Signin