import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const PropertyPage = () => {
    const location = useLocation();
    const address = location.state;
    const {getSingleProperty, chosenProperty} = useAppContext()

    useEffect(() => {
        console.log(address);
        getSingleProperty(address)
    }, [])

  return (
    <div>PropertyPage
       <p>{address}</p>
       {chosenProperty && <p>{chosenProperty.agency}</p>}

    </div>
  )
}

export default PropertyPage