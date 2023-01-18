import React from 'react'
import { useAppContext } from '../../AppContext'

const PropertyCard = ({dateListed, agency, address, desc, price, bedrooms, bathrooms, receptions, image}) => {

  const {saveProperty} = useAppContext()

  return (
    <div>
      <img src={image}></img>
      <h2>{address}</h2>
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