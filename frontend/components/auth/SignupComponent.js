import { useState, useEffect } from 'react'
import { signup, isAuth } from '../../actions/auth'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Router from 'next/router'

const SignupComponent = () => {

  const [ values, setValues ] = useState(
    {
      name: '',
      email: '',
      password: '',
      error: '',
      loading: false,
      message: '',
      showForm: true,
    }
  )

  const {name, email, password, error, loading, message, showForm} = values

  // prevent navigation to this route when user is logged in

    useEffect(() => {
    isAuth() && Router.push('/')
  }, [])


  const handleSubmit = (e) =>{
    e.preventDefault()
    // console.table({name, email, password, error, loading, message, showForm})
    setValues({...values, loading: true, error: false})
    const user = { name, email, password }

    signup(user)
    .then(data => {
      if(data.error){
        setValues({ ...values, error: data.error, loading: false})
      }else {
        setValues({ ...values, name: '', email: '', password: '', error: '', loading: false, message: data.message, showForm: false })
      }
    })
  }
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const showLoading = () => (loading ? <div className="max-w-[41rem] w-full bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 text-2xl px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">Loading...</p>
    </div>
  </div>
</div> : '')

  const showError = () => (error ? <div className="max-w-[41rem] w-full text-2xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">Sorry! </strong>
  <span className="block sm:inline">{error}</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div> : '')

const showMessage = () => ( message ? <div className="max-w-[41rem] w-full text-2xl bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">Success! </strong>
  <span className="block sm:inline">{message}</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div> : '')

  const signupForm = () =>{
    return(
      <form suppressHydrationWarning className='text-2xl' onSubmit={handleSubmit}>
        <div className="bg-grey-lighter flex flex-col">
          <div className="container w-full flex-1 flex flex-col px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-4xl font-bold text-center">Signup</h1>
              <input 
              value={name}
                onChange={handleChange('name')}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder="Full Name" />

              <input
                value={email}
                onChange={handleChange('email')}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email" />

              <input 
              value={password}
                onChange={handleChange('password')}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password" />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1 font-bold"
              >Signup</button>

              <div className="text-center text-xl text-grey-dark mt-4">
                By signing up, you agree to the 
                <a className="no-underline border-b border-grey-dark text-grey-dark font-bold ml-1" href="#">
                    Terms of Service
                </a> and 
                <a className="no-underline border-b border-grey-dark text-grey-dark ml-1 font-bold" href="#">
                    Privacy Policy
                </a>
              </div>
            </div>

            <div className="text-xl text-grey-dark mt-6">
              Already have an account? 
              <a className="no-underline border-b border-blue text-blue ml-1 font-bold" href="../login/">
                Sign in
              </a>.
            </div>
          </div>
        </div>
      </form>
    )
  }
  return (
    <div className='flex flex-col items-center gap-10 mt-20 '>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && signupForm()}
    </div>
  )
}
export default SignupComponent
