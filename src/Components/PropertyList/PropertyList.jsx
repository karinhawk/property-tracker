import React, { useEffect } from 'react'
import { useAppContext } from '../../AppContext';
import PropertyCard from '../PropertyCard/PropertyCard';

const PropertyList = () => {

//design to hold ALL properties - filters can pass down
//map property cards - with dif conditions
//1. all properties
//2. agent's own properties
//3. agent's saved properties

const {allProperties, getAllProperties} = useAppContext()

useEffect(() => {
  getAllProperties()
}, [])
console.log(allProperties);


  return (
      <div>
        {allProperties != undefined & allProperties.length != 0 ? allProperties.map((property, index) => {
          console.log(property.dateListed, property.address, property.image);
          if(Object.keys(property).length === 0) return <h2>no data</h2>
          return (
            <div key={index}>
              <h2>house</h2>
              <PropertyCard dateListed={property.dateListed} agency={property.agency} address={property.address} desc={property.desc} price={property.price} bedrooms={property.bedrooms} bathrooms={property.bathrooms} receptions={property.receptions} image={property.image}/>
            </div>
          )
        }): <h2>loading</h2>}
      </div>
  )
}

export default PropertyList