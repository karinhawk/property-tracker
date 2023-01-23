import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const PropertyPage = () => {
    const location = useLocation();
    const property = location.state;

    //carousel

  return (
    <div>PropertyPage
       <p>{property.address}</p>
       <img src={property.images[0]} alt="" />
       <img src={property.images[1]} alt="" />
       <div className="card__end">
      <h3 className="card__agency">Listed by: {property.agency}</h3>
      <h3 className="card__date">Listed on: {property.dateListed}</h3>
      </div>

    </div>
  )
}

export default PropertyPage