import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'

export const signup = (user) => {
  
  const API = process.env.PRODUCTION ? process.env.API_PRODUCTION : process.env.API_DEVELOPMENT
  
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err))
}

export const signin = (user) => {
  
  const API = process.env.PRODUCTION ? process.env.API_PRODUCTION : process.env.API_DEVELOPMENT
  
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err))
}

export const signout = (next) => {

  const API = process.env.PRODUCTION ? process.env.API_PRODUCTION : process.env.API_DEVELOPMENT

  removeCookie('token')
  removeLocalStorage('user')
  next()

  return fetch(`${API}/signout`, {
    method: 'GET'
  })
  .then(response => {
    console.log(response.json().message)
  })
  .catch(err => console.log(err))
}

// saving user details in the local storage for persistent user login (npm i js-cookie)

// set cookie

export const setCookie = ( key, value) => {
  if(process.browser){
    cookie.set(key,value, {
      expires: 1
    })
  }
}

export const removeCookie = (key) => {
  if(process.browser){
    cookie.remove(key, {
      expires: 1
    })
  }
}
// get cookie

export const getCookie = (key) => {
  if(process.browser){
    return cookie.get(key)
  }
}

// local storage

export const setLocalStorage = ( key, value ) => {
  if(process.browser){
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const removeLocalStorage = (key) => {
  if(process.browser){
    localStorage.removeItem(key)
  }
}

// authenticate user by passing data to cookies and local storage

export const authenticate = (data, next) => {
  setCookie('token', data.token)
  setLocalStorage('user', data.user)
  next()
}

export const isAuth = () => {
  if(process.browser) {
    const cookieChecked = getCookie('token')
    if(cookieChecked) {
      const existingUser = localStorage.getItem('user')
      if(existingUser){
        return JSON.parse(existingUser)
      }
      return false
    }
  }
}
