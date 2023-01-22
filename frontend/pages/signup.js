import React, {lazy} from 'react'
import Layout from '../components/Layout'
import dynamic from 'next/dynamic'
// import SignupComponent from '../components/auth/SignupComponent'

const SignupComponent = lazy(
  () => import("../components/auth/SignupComponent")
)

const Signup = () => {
  return (
    <Layout>
      <SignupComponent />
    </Layout>
  )
}

export default Signup