import "./Account.scss"
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'
import PropertyList from '../../Components/PropertyList/PropertyList'

const Account = () => {

  //see user info, uploaded properties, and saved properties
  //can upload properties here, and delete properties from database, and edit them
  const { getAllPropertiesFromAgency, userInfo, getSavedProperties, agencyProperties, savedProperties, logout, currentUser } = useAppContext()



  useEffect(() => {
    getAllPropertiesFromAgency()
    getSavedProperties()
    console.log(userInfo);
    console.log(agencyProperties);
    console.log(savedProperties);
  }, [])


  return (
    <div className="account">
      <h2 className="account__banner">Account</h2>
      {currentUser &&
        <div className="account__content">
            <div className="account__content__info">
              <div className="account__content__top">
                <h2 className="account__content__name">{userInfo.name}</h2>
                <h3 className="account__content__agency">{userInfo.agency}</h3>
              </div>
              <div className="account__content__buttons">
                <Link to="/edit-account">
                  <button className="account__content__button">Change account details</button>
                </Link>
                <Link to="/add-property">
                  <button className="account__content__button">Add Property</button>
                </Link>
              </div>
            </div>
          <h3 className="account__content__user-content">All Properties owned by {userInfo.agency}</h3>
          {agencyProperties && <PropertyList propertyArr={agencyProperties} emptyMessage={"This agency has not uploaded any properties yet. Add properties at the top of the page."} />}
          <h3 className="account__content__user-content">All properties saved by {userInfo.name}</h3>
          {savedProperties && <PropertyList propertyArr={savedProperties} emptyMessage={"This user has not saved any properties yet"} />}
          <button className="account__logout" onClick={logout}>log out</button></div>}
    </div>
  )
}

export default Account