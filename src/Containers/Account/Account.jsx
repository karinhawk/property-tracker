import React from 'react'
import { Link } from 'react-router-dom'

const Account = () => {

    //see user info, uploaded properties, and saved properties
    //can upload properties here, and delete properties from database, and edit them
  return (
    <div>Account
              <Link to="/add_property">
        <button>Add Property</button>
        </Link>
    </div>
  )
}

export default Account