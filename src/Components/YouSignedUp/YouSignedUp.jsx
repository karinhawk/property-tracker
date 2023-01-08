import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../AppContext'

const YouSignedUp = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [agencyName, setAgencyName] = useState("")
    const {addUserInfo, userInfo} = useAppContext()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
          setError("")
          setLoading(true)
          await addUserInfo(username, agencyName)
          navigate("/home")
        } catch (e) {
          setError("Failed to create an account")
          console.log(e.message);
        }
        
        setLoading(false)
      }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <h2>You Successfully Created an Account!</h2>
        <label htmlFor='name'>Please enter your Name</label>
        <input id='name' name='name' type="text" onChange={(e) => {setUsername(e.target.value)}}/>
        <label htmlFor='agency'>Please enter your Agency Name</label>
        <input id='agency' name='agency' type="text" onChange={(e) => {setAgencyName(e.target.value)}}/>
        <button>Submit</button>
        </form>
    </div>
  )
}

export default YouSignedUp