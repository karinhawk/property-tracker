import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext';
import PropertyCard from '../PropertyCard/PropertyCard';

const PropertyList = () => {

//design to hold ALL properties - filters can pass down
//map property cards - with dif conditions
//1. all properties
//2. agent's own properties
//3. agent's saved properties

const {getAllProperties} = useAppContext()

  return (
    <div>
      {getAllProperties().then((propertyArr) => propertyArr.map((property) => {
        console.log(property);
        return (
          <div>
            <h2>house</h2>
            <PropertyCard dateListed={property.dateListed} agency={property.agency} address={property.address} desc={property.desc} bedrooms={property.bedrooms} bathrooms={property.bathrooms} receptions={property.receptions} image={property.image}/>
          </div>
        )
      }))}
    </div>
  )
}

export default PropertyList