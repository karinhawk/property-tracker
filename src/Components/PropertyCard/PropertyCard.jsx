import "./PropertyCard.scss"
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'
import bath from "../../assets/bath.svg"
import bed from "../../assets/bed.svg"
import chair from "../../assets/chair.svg"

const PropertyCard = ({ dateListed, agency, address, desc, price, bedrooms, bathrooms, receptions, images }) => {

  const { saveProperty, unsaveProperty, checkIfPropertySaved, userInfo } = useAppContext()
  //useffect fire check if saved
  const [isSaved, setIsSaved] = useState()

  // useEffect(() => {
  //   checkIfPropertySaved(address).then((result) => {
  //     setIsSaved(result)
  //   })
  //   console.log(isSaved);
  // }, [])

  const property = {
    dateListed: dateListed,
    address: address,
    agency: agency,
    desc: desc,
    price: price,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    receptions: receptions,
    images: images
  }

  return (
    <div className="card">
      <div className="card__crop">
        <Link to={`/:${address}`} state={property}>
          <img className="card__image" src={images[0]}></img>
        </Link>
      </div>
      <Link to={`/:${address}`} state={property}>
        <h2 className="card__address">{address}</h2>
      </Link>
      <h2 className="card__price">£{price}</h2>
      {/* <h3 className="card__desc">{desc}</h3> */}
      <div className="card__rooms">
        <div className="card__room">
          <img src={bed} alt="bed icon" className="card__icon"/>
          <h3 className="card__bedrooms">{bedrooms}</h3>
        </div>
        <div className="card__room">
        <img src={bath} alt="bath icon" className="card__icon"/>
          <h3 className="card__bathrooms">{bathrooms}</h3>
        </div>
        <div className="card__room">
        <img src={chair} alt="chair icon"className="card__icon" />
          <h3 className="card__receptions">{receptions}</h3>
        </div>
      </div>
      {/* <div className="card__end">
      <h3 className="card__agency">Listed by: {agency}</h3>
      <h3 className="card__date">Listed on: {dateListed}</h3>
      </div> */}
      <div className="card__buttons">
      <button onClick={isSaved ?
        () => {
          unsaveProperty(address).then(checkIfPropertySaved(address).then((result) => {
            setIsSaved(result)
          }))
        }
        : () => {
          saveProperty(address).then(checkIfPropertySaved(address).then((result) => {
            setIsSaved(result)
          }))
        }}
      >{isSaved ? "unsave" : "save"} property</button>
      {property.agency == userInfo.agency && <Link to={`/edit-property`} state={property}>
        <button>Edit property</button>
      </Link>}
      </div>
    </div>
  )
}

export default PropertyCard