import "./PropertyList.scss"
import React, { useEffect } from 'react'
import PropertyCard from '../PropertyCard/PropertyCard';

const PropertyList = ({propertyArr, emptyMessage}) => {

//design to hold ALL properties - filters can pass down
//map property cards - with dif conditions
//1. all properties
//2. agent's own properties
//3. agent's saved properties

console.log(propertyArr);

  return (
      <div className="list">
        {propertyArr != undefined & propertyArr.length != 0 ? propertyArr.map((property, index) => {
          
          if(Object.keys(property).length === 0) return <h2>no data</h2>
          return (
            <div key={index}>
              <PropertyCard dateListed={property.dateListed} agency={property.agency} address={property.address} desc={property.desc} price={property.price} bedrooms={property.bedrooms} bathrooms={property.bathrooms} receptions={property.receptions} images={property.images}/>
            </div>
          )
        }): <h3 className="list__empty">{emptyMessage}</h3>}
      </div>
  )
}

export default PropertyList