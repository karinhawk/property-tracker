import React, { useState } from 'react'
import { useAppContext } from '../../AppContext'
import "./AddPropertyForm.scss"

const AddPropertyForm = ({userInfo}) => {

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

            const handleSubmit = (e) => {
                e.preventDefault()
                console.log(userInfo);
                if(street !== "" & city !== "" & postcode !== "" & desc !== "" & price !== "" & bedrooms !== "" & bathrooms !== "" & receptions !== "" & imageUpload !== null){
                    try{
                        const address = `${street}, ${city}, ${postcode.toUpperCase()}`
                        const imagesArr = Array.from(imageUpload);
                        console.log(address, desc, price, bedrooms, bathrooms, receptions);
                        uploadImage(imagesArr).then(addProperty(address, desc, price, bedrooms, bathrooms, receptions))                    
                    }catch(error){
                        console.log(error.message)
                    }
                }
            }


    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
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
                <input type="text" name="desc" id="desc" onChange={(e) => {setDesc(e.target.value)}}/>
                <label htmlFor="price">Guide Price £</label>
                <input type="text" name="price" id="price" onChange={(e) => {setPrice(e.target.value)}}/>
                <label htmlFor="bedrooms">Bedrooms</label>
                <input type="text" name="bedrooms" id="bedrooms" onChange={(e) => {setBedrooms(e.target.value)}}/>
                <label htmlFor="bathrooms">Bathrooms</label>
                <input type="text" name="bathrooms" id="bathrooms" onChange={(e) => {setBathrooms(e.target.value)}}/>
                <label htmlFor="receptions">Reception Rooms</label>
                <input type="text" name="receptions" id="receptions" onChange={(e) => {setReceptions(e.target.value)}}/>
                <label htmlFor="image">Property picture</label>
                <input type="file" name='image' id='image' multiple onChange={(e) => {setImageUpload(e.target.files)}}/>
                <button>Add Property</button>
            </form>
        </div>
    )
}

export default AddPropertyForm