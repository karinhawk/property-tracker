import "./PropertyCard.scss"
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'

const PropertyCard = ({dateListed, agency, address, desc, price, bedrooms, bathrooms, receptions, image}) => {

  const {saveProperty, unsaveProperty, checkIfPropertySaved} = useAppContext()
  //useffect fire check if saved
  const [isSaved, setIsSaved] = useState()

  // useEffect(() => {
  //   checkIfPropertySaved(address).then((result) => {
  //     setIsSaved(result)
  //   })
  //   console.log(isSaved);
  // }, [])
  

  return (
    <div className="card">
      <Link to={`/:${address}`} state={address}>
      <img className="card__image" src={image}></img>
      </Link>
      <Link to={`/:${address}`} state={address}>
      <h2 className="card__address">{address}</h2>
      </Link>
      <h2 className="card__price">£{price}</h2>
      <h3 className="card__desc">{desc}</h3>
      <h3 className="card__bedrooms">{bedrooms}</h3>
      <h3 className="card__bathrooms">{bathrooms}</h3>
      <h3 className="card__receptions">{receptions}</h3>
      <h3 className="card__agency">{agency}</h3>
      <h3 className="card__date">listed on: {dateListed}</h3>
      <button onClick={isSaved ? 
        () => {unsaveProperty(address).then(checkIfPropertySaved(address).then((result) => {
          setIsSaved(result)
        }))}
         : () => {saveProperty(address).then(checkIfPropertySaved(address).then((result) => {
          setIsSaved(result)
        }))}}
         >{isSaved ? "unsave" : "save"} property</button>
         <Link to={`/edit-property`} state={address}>
         <button>Edit property</button>
         </Link>
    </div>
  )
}

export default PropertyCard