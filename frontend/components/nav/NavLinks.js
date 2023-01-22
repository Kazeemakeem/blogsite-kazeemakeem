import React, {useState, useEffect} from 'react'
import { isAuth } from '../../actions/auth'
import NavWithAuth from './NavWithAuth'
import NavWithoutAuth from './NavWithoutAuth'

const NavLinks = ({display}) => {

  // const [PageLinks, setPageLinks] = useState(NavWithoutAuth)

  // useEffect(() => {
  //   !isAuth() ? setPageLinks(NavWithoutAuth) : setPageLinks(NavWithAuth)
  // }, [])

  return (
    isAuth() ? <NavWithAuth display={display}/> : <NavWithoutAuth display={display}/>
  )
}

export default NavLinks
