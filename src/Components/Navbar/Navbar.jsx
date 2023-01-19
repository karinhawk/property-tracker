import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
        <Link to="/">
        <h3>HOME</h3>
        </Link>
        <Link to="/all-properties">
        <h3>PROPERTIES</h3>
        </Link>
        <Link to="/account">
        <h3>ACCOUNT</h3>
        </Link>
    </header>
  )
}

export default Navbar