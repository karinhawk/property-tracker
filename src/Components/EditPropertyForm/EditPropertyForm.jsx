import "./EditPropertyForm.scss"
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const EditPropertyForm = () => {
  const location = useLocation();
  const property = location.state;
  const oldAddress = property.address


  const { uploadImage, updateProperty, deleteProperty } = useAppContext();
  const [address, setAddress] = useState(oldAddress);
  const [desc, setDesc] = useState(property.desc);
  const [price, setPrice] = useState(property.price);
  const [bedrooms, setBedrooms] = useState(property.bedrooms);
  const [bathrooms, setBathrooms] = useState(property.bathrooms);
  const [receptions, setReceptions] = useState(property.receptions);
  const [imageUpload, setImageUpload] = useState(property.images);
  const [isDisabled, setIsDisabled] = useState(true)
  const navigate = useNavigate()


  //must work out showing images!! and double click image bug!!
  useEffect(() => {
    if (address !== "" & desc !== "" & price !== "" & bedrooms !== "" & bathrooms !== "" & receptions !== "" & imageUpload !== null) {
        setIsDisabled(false)
    } else {
        setIsDisabled(true)
    }
}, [address, desc, price, bedrooms, bathrooms, receptions, imageUpload])


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (address !== "" & desc !== "" & price !== "" & bedrooms !== "" & bathrooms !== "" & receptions !== "" & imageUpload !== null) {
      try {
        const imagesArr = Array.from(imageUpload);
        console.log(oldAddress, address, desc, price, bedrooms, bathrooms, receptions);
        await uploadImage(imagesArr).then((urlArr) => updateProperty(oldAddress, address, desc, price, bedrooms, bathrooms, receptions, urlArr))
        navigate("/account")

      } catch (error) {
        console.log(error.message)
      }
    }
  }


  return (
    <div>
      {property.length != 0 && <form className='edit-form' onSubmit={handleSubmit}>
        <div className='edit-form__div'>
          <label htmlFor="address" className='edit-form__address__label'>Address</label>
          <input type="text" name="address" id="address" className='edit-form__address__input' defaultValue={property.address} onChange={(e) => { setAddress(e.target.value) }} />
        </div>
        <div className='edit-form__div'>
          <label htmlFor="desc" className='edit-form__div__label'>Description</label>
          <input type="text" name="desc" id="desc" className='edit-form__div__input' defaultValue={property.desc} onChange={(e) => { setDesc(e.target.value) }} />
        </div>
        <div className='edit-form__div'>
          <label htmlFor="price" className='edit-form__div__label'>Guide Price £</label>
          <input type="text" name="price" id="price" className='edit-form__div__input' defaultValue={property.price} onChange={(e) => { setPrice(e.target.value) }} />
        </div>
        <div className='edit-form__div'>
          <label htmlFor="bedrooms" className='edit-form__div__label'>Bedrooms</label>
          <input type="text" name="bedrooms" id="bedrooms" className='edit-form__div__input' defaultValue={property.bedrooms} onChange={(e) => { setBedrooms(e.target.value) }} />
        </div>
        <div className='edit-form__div'>
          <label htmlFor="bathrooms" className='edit-form__div__label'>Bathrooms</label>
          <input type="text" name="bathrooms" id="bathrooms" className='edit-form__div__input' defaultValue={property.bathrooms} onChange={(e) => { setBathrooms(e.target.value) }} />
        </div>
        <div className='edit-form__div'>
          <label htmlFor="receptions" className='edit-form__div__label'>Reception Rooms</label>
          <input type="text" name="receptions" id="receptions" className='edit-form__div__input' defaultValue={property.receptions} onChange={(e) => { setReceptions(e.target.value) }} />
        </div>
        <div className='edit-form__div'>
          <label htmlFor="image" className='edit-form__div__label'>Upload property pictures</label>
          <input type="file" name='image' id='image' className='edit-form__div__input--files' multiple onChange={(e) => { setImageUpload(e.target.files) }} />
        </div>
        <button className={isDisabled ? "edit-form__button__disabled" : "edit-form__button__active"}>Edit Property</button>
      </form>}
      {!property && <h3>loading</h3>}
      <button className="delete" onClick={() => deleteProperty(address)}>Delete Property: this cannot be undone</button>
    </div>
  )
}

export default EditPropertyForm