import React from 'react'

const PropertyCard = (dateListed, agency, address, desc, bedrooms, bathrooms, receptions, image) => {
  return (
    <div>
      <img src={image}></img>
      <h2>{address}</h2>
      <h3>{desc}</h3>
      <h3>{bedrooms}</h3>
      <h3>{bathrooms}</h3>
      <h3>{receptions}</h3>
      <h3>{agency}</h3>
      <h3>{dateListed}</h3>
    </div>
  )
}

export default PropertyCard