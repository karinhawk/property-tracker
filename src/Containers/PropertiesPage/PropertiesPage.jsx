import "./PropertiesPage.scss"
import { useEffect } from 'react'
import { useAppContext } from '../../AppContext'
import PropertyList from '../../Components/PropertyList/PropertyList'

const PropertiesPage = () => {
    const {allProperties, getAllProperties} = useAppContext()

useEffect(() => {
  getAllProperties()
}, [])
console.log(allProperties);
  return (
    <div className='properties-page'>
        <PropertyList propertyArr={allProperties}/>
    </div>
  )
}

export default PropertiesPage