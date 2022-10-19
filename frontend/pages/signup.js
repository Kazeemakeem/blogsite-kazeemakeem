import React from 'react'
import Layout from '../components/Layout'
import dynamic from 'next/dynamic'

const SignupComponent = dynamic(
  () => import("../components/auth/SignupComponent"),
  { ssr: false }
)

const Signup = () => {
  return (
    <Layout>
      <SignupComponent />
    </Layout>
  )
}

export default Signup