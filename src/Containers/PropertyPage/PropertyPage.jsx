import "./PropertyPage.scss"
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const PropertyPage = () => {
  const {userInfo} = useAppContext()
  const location = useLocation();
  const property = location.state;

  //carousel

  return (
    <div className="property-page">
      <div className="property-page__content">
        <h2 className="property-page__content__address">{property.address}</h2>
        <div className="property-page__content__image-div">
        {property.images != undefined ? property.images.map((image, index) => {
          return (
            <div>
              <img className="property-page__content__image" src={image} alt="image of a property" key={index} />
            </div>
          )
        }): <p></p>}
        </div>
        <h3 className="property-page__content__price">£{property.price}</h3>
        <p className="property-page__content__desc">{property.desc}</p>
        <div className="property-page__content__extra">
          <h3 className="property-page__content__agency">Listed by: {property.agency}</h3>
          <h3 className="property-page__content__date">Listed on: {property.dateListed}</h3>
        </div>
        {property.agency == userInfo.agency && <Link to={`/edit-property`} state={property}>
        <button>Edit property</button>
      </Link>}
      </div>

    </div>
  )
}

export default PropertyPage