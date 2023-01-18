import React, { useEffect } from 'react'
import { useAppContext } from '../../AppContext'
import PropertyList from '../../Components/PropertyList/PropertyList'

const PropertiesPage = () => {
    const {allProperties, getAllProperties} = useAppContext()

useEffect(() => {
  getAllProperties()
}, [])
console.log(allProperties);
  return (
    <div>
        <PropertyList propertyArr={allProperties}/>
    </div>
  )
}

export default PropertiesPage