import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const EditPropertyForm = ({userInfo}) => {


  //upload image
  //date listed - generate date and time to put into db
  //agency - from users db
  //MUST have address, desc, price, bedrooms, bathrooms, r rooms, agency, and date listed
const {addProperty, uploadImage} = useAppContext()
const [street, setStreet] = useState("");
const [city, setCity] = useState("");
const [postcode, setPostcode] = useState("");
const [desc, setDesc] = useState("");
const [price, setPrice] = useState("");
const [bedrooms, setBedrooms] = useState("");
const [bathrooms, setBathrooms] = useState("");
const [receptions, setReceptions] = useState("");
const [imageUpload, setImageUpload] = useState(null);

const location = useLocation();
const property = location.state;

// const [property, setProperty] = useState();




  const handleSubmit = (e) => {
      e.preventDefault()
      console.log(userInfo);
      if(street !== "" & city !== "" & postcode !== "" & desc !== "" & price !== "" & bedrooms !== "" & bathrooms !== "" & receptions !== "" & imageUpload !== null){
          try{
              const address = `${street}, ${city}, ${postcode.toUpperCase()}`
              console.log(address, desc, price, bedrooms, bathrooms, receptions);
              uploadImage(imageUpload).then((url) => {addProperty(address, desc, price, bedrooms, bathrooms, receptions, url);
              })                    
          }catch(error){
              console.log(error.message)
          }
      }
  }


return (
<div>
  {property.length != 0 && <form className='form' onSubmit={handleSubmit}>
      <div className='form__address'>
          <h3>Address</h3>
              <label htmlFor="street">Street Name</label>
              <input type="text" name="street" id="street" onChange={(e) => {setStreet(e.target.value)}} />
              <label htmlFor="city">Town/City</label>
              <input type="text" name="city" id="city" onChange={(e) => {setCity(e.target.value)}} />
              <label htmlFor="postcode">Postcode</label>
              <input type="text" name="postcode" id="postcode" onChange={(e) => {setPostcode(e.target.value)}}/>
      </div>
      <label htmlFor="desc">Description</label>
      <input type="text" name="desc" id="desc" defaultValue={property.desc} onChange={(e) => {setDesc(e.target.value)}}/>
      <label htmlFor="price" >Guide Price £</label>
      <input type="text" name="price" id="price" defaultValue={property.price} onChange={(e) => {setPrice(e.target.value)}}/>
      <label htmlFor="bedrooms">Bedrooms</label>
      <input type="text" name="bedrooms" id="bedrooms" defaultValue={property.bedrooms} onChange={(e) => {setBedrooms(e.target.value)}}/>
      <label htmlFor="bathrooms">Bathrooms</label>
      <input type="text" name="bathrooms" id="bathrooms" defaultValue={property.bathrooms} onChange={(e) => {setBathrooms(e.target.value)}}/>
      <label htmlFor="receptions">Reception Rooms</label>
      <input type="text" name="receptions" id="receptions" defaultValue={property.receptions} onChange={(e) => {setReceptions(e.target.value)}}/>
      <label htmlFor="image">Property picture</label>
      <input type="file" onChange={(e) => {setImageUpload(e.target.files[0])}}/>
      <button>Add Property</button>
  </form>}
  {!property && <h3>loading</h3>}
</div>
)
}

export default EditPropertyForm