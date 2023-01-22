import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const EditPropertyForm = ({userInfo}) => {
  const location = useLocation();
  const property = location.state;
  const oldAddress = property.address

  //upload image
  //date listed - generate date and time to put into db
  //agency - from users db
  //MUST have address, desc, price, bedrooms, bathrooms, r rooms, agency, and date listed
const {uploadImage, updateProperty, deleteProperty} = useAppContext();
const [address, setAddress] = useState(oldAddress);
const [desc, setDesc] = useState(property.desc);
const [price, setPrice] = useState(property.price);
const [bedrooms, setBedrooms] = useState(property.bedrooms);
const [bathrooms, setBathrooms] = useState(property.bathrooms);
const [receptions, setReceptions] = useState(property.receptions);
const [imageUpload, setImageUpload] = useState(property.images);

//must work out showing images!! and double click image bug!!


  const handleSubmit = async(e) => {
      e.preventDefault()
      if(address !== "" & desc !== "" & price !== "" & bedrooms !== "" & bathrooms !== "" & receptions !== "" & imageUpload !== null){
          try{
              const imagesArr = Array.from(imageUpload);
              console.log(oldAddress, address, desc, price, bedrooms, bathrooms, receptions);
              await uploadImage(imagesArr).then((urlArr) => updateProperty(oldAddress, address, desc, price, bedrooms, bathrooms, receptions, urlArr))                   
       
          }catch(error){
              console.log(error.message)
          }
      }
  }


return (
<div>
  {property.length != 0 && <form className='form' onSubmit={handleSubmit}>
  <label htmlFor="address">Address</label>
      <input type="text" name="address" id="address" defaultValue={property.address} onChange={(e) => {setAddress(e.target.value)}}/>
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
      <input type="file" name='image' id='image' multiple onChange={(e) => {setImageUpload(e.target.files)}}/>
      <button>Edit Property</button>
  </form>}
  {!property && <h3>loading</h3>}
  <button onClick={() => deleteProperty(address)}>Delete Property: this cannot be undone</button>
</div>
)
}

export default EditPropertyForm