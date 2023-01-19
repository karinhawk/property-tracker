import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'
import PropertyList from '../../Components/PropertyList/PropertyList'

const Account = () => {

    //see user info, uploaded properties, and saved properties
    //can upload properties here, and delete properties from database, and edit them
  const {getAllPropertiesFromAgency, userInfo, getSavedProperties, agencyProperties, savedProperties, logout} = useAppContext()



  useEffect(() => {
    getAllPropertiesFromAgency()
    getSavedProperties()
    console.log(userInfo);
    console.log(agencyProperties);
    console.log(savedProperties);
  }, [])
  

    return (
    <div>Account
      <h2>{userInfo.name}</h2>
      <h3>{userInfo.agency}</h3>
      <Link to="/edit-account">
      <button>Change account details</button>
      </Link>
              <Link to="/add-property">
        <button>Add Property</button>
        </Link>
        <h3>All Properties owned by {userInfo.agency}</h3>
       {agencyProperties && <PropertyList propertyArr={agencyProperties}/>}
        <h3>All properties saved by {userInfo.name}</h3>
        {savedProperties && <PropertyList propertyArr={savedProperties}/>}
        <button onClick={logout}>log out</button>
    </div>
  )
}

export default Account