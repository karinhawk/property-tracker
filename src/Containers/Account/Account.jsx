import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'

const Account = () => {

    //see user info, uploaded properties, and saved properties
    //can upload properties here, and delete properties from database, and edit them
  const {getAllProperties} = useAppContext()
    return (
    <div>Account
              <Link to="/add-property">
        <button>Add Property</button>
        </Link>
        <button onClick={getAllProperties}>view all properites in log</button>
    </div>
  )
}

export default Account