import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../AppContext'
import "./AddPropertyForm.scss"

const AddPropertyForm = ({ userInfo }) => {

    const { addProperty, uploadImage } = useAppContext()

    const [isDisabled, setIsDisabled] = useState(true)
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [receptions, setReceptions] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (street !== "" & city !== "" & postcode !== "" & desc !== "" & price !== "" & bedrooms !== "" & bathrooms !== "" & receptions !== "" & imageUpload !== null) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [street, city, postcode, desc, price, bedrooms, bathrooms, receptions, imageUpload])
    


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userInfo);
        if (street !== "" & city !== "" & postcode !== "" & desc !== "" & price !== "" & bedrooms !== "" & bathrooms !== "" & receptions !== "" & imageUpload !== null) {
            try {
                const address = `${street}, ${city}, ${postcode.toUpperCase()}`
                const imagesArr = Array.from(imageUpload);
                console.log(address, desc, price, bedrooms, bathrooms, receptions);
                await uploadImage(imagesArr).then((urlArr) => addProperty(address, desc, price, bedrooms, bathrooms, receptions, urlArr))
                navigate("/account")
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    //active inactive buttons


    return (
        <div>
            <form className='add-form' onSubmit={handleSubmit}>
                <div className='add-form__div'>
                    <label htmlFor="street" className='add-form__div__label'>Street Name</label>
                    <input type="text" name="street" id="street" className='add-form__div__input' onChange={(e) => { setStreet(e.target.value) }} />
                </div>
                <div className='add-form__div'>
                    <label htmlFor="city" className='add-form__div__label'>Town/City</label>
                    <input type="text" name="city" id="city" className='add-form__div__input' onChange={(e) => { setCity(e.target.value) }} />
                </div>
                <div className='add-form__div'>
                    <label htmlFor="postcode" className='add-form__div__label'>Postcode</label>
                    <input type="text" name="postcode" id="postcode" className='add-form__div__input' onChange={(e) => { setPostcode(e.target.value) }} />
                </div>
                <div className='add-form__div'>
                    <label htmlFor="desc" className='add-form__div__label'>Description</label>
                    <input type="text" name="desc" id="desc" className='add-form__div__input' onChange={(e) => { setDesc(e.target.value) }} />
                </div>
                <div className='add-form__div'>
                    <label htmlFor="price" className='add-form__div__label'>Guide Price £</label>
                    <input type="text" name="price" id="price" className='add-form__div__input' onChange={(e) => { setPrice(e.target.value) }} />
                </div>
                <div className='add-form__div'>
                    <label htmlFor="bedrooms" className='add-form__div__label'>Bedrooms</label>
                    <input type="text" name="bedrooms" id="bedrooms" className='add-form__div__input' onChange={(e) => { setBedrooms(e.target.value) }} />
                </div>
                <div className='add-form__div'>
                    <label htmlFor="bathrooms" className='add-form__div__label'>Bathrooms</label>
                    <input type="text" name="bathrooms" id="bathrooms" className='add-form__div__input' onChange={(e) => { setBathrooms(e.target.value) }} />
                </div>
                <div className='add-form__div'>
                    <label htmlFor="receptions" className='add-form__div__label'>Reception Rooms</label>
                    <input type="text" name="receptions" id="receptions" className='add-form__div__input' onChange={(e) => { setReceptions(e.target.value) }} />
                </div>
                <div className='add-form__div'>
                    <label htmlFor="image" className='add-form__div__label'>Property picture</label>
                    <input type="file" name='image' id='image' className='add-form__div__input' multiple onChange={(e) => { setImageUpload(e.target.files) }} />
                </div>
                <button className={isDisabled ? "add-form__button__disabled" : "add-form__button__active"}>Add Property</button>
            </form>
        </div>
    )
}

export default AddPropertyForm