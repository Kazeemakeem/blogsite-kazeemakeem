import React, {useState, useEffect} from 'react'
import { isAuth } from '../../actions/auth'
import NavWithAuth from './NavWithAuth'
import NavWithoutAuth from './NavWithoutAuth'

const NavLinks = () => {

  const [pageLinks, setPageLinks] = useState(null)

  useEffect(() => {
    !isAuth() ? setPageLinks(NavWithoutAuth) : setPageLinks(NavWithAuth)
  }, [])

  return (
    <pageLinks />
  )
}

export default NavLinks
