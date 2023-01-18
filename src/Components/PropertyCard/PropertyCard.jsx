import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'

const PropertyCard = ({dateListed, agency, address, desc, price, bedrooms, bathrooms, receptions, image}) => {

  const {saveProperty, getSingleProperty} = useAppContext()

  return (
    <div>
      <Link to={`/:${address}`} state={address}>
      <img src={image}></img>
      </Link>
      <Link to={`/:${address}`} state={address}>
      <h2>{address}</h2>
      </Link>
      <h2>{price}</h2>
      <h3>{desc}</h3>
      <h3>{bedrooms}</h3>
      <h3>{bathrooms}</h3>
      <h3>{receptions}</h3>
      <h3>{agency}</h3>
      <h3>{dateListed}</h3>
      <button onClick={() => saveProperty(address)}>save property</button>
    </div>
  )
}

export default PropertyCard