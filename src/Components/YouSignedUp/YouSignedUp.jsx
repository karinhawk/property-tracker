import "./YouSignedUp.scss"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../AppContext'

const YouSignedUp = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [agencyName, setAgencyName] = useState("")
    const {addUserInfo, userInfo, logout} = useAppContext()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
          setError("")
          setLoading(true)
          await addUserInfo(username, agencyName)
          setError("please log in")
          logout()
          navigate("/signup-signin")
        } catch (e) {
          setError("Failed to create an account")
          console.log(e.message);
        }
        
        setLoading(false)
      }

  return (
    <div className="signed-up">
        <form onSubmit={handleSubmit} className="signed-up__content">
        <h2 className="signed-up__content__title">You Successfully Created an Account!</h2>
        <div className="signed-up__content__item">
        <label htmlFor='name' className="signed-up__content__item__label">Please enter your Name</label>
        <input id='name' name='name' type="text" className="signed-up__content__item__input" onChange={(e) => {setUsername(e.target.value)}}/>
        </div>
        <div className="signed-up__content__item">
        <label htmlFor='agency' className="signed-up__content__item__label">Please enter your Agency Name</label>
        <input id='agency' name='agency' type="text" className="signed-up__content__item__input" onChange={(e) => {setAgencyName(e.target.value)}}/>
        </div>
        <button className="signed-up__content__button">Submit</button>
        </form>
        <h3>{error}</h3>
    </div>
  )
}

export default YouSignedUp