import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const PropertyPage = () => {
    const location = useLocation();
    const property = location.state;

  return (
    <div>PropertyPage
       <p>{property.address}</p>
       <img src={property.images[0]} alt="" />
       <img src={property.images[1]} alt="" />

    </div>
  )
}

export default PropertyPage