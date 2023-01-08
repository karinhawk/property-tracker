import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const SignUpForm = () => {
    const {signup} = useAppContext()
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
    
        if (passwordCheck !== registerPassword) {
          return setError("Passwords do not match. Please try again.")
        }
        if(registerPassword.length < 6){
            return setError("Password must be at least 6 characters")
        }
    
        try {
          setError("")
          setLoading(true)
          await signup(registerEmail, registerPassword)
          console.log(registerEmail, registerPassword);
          navigate("/welcome")
        } catch (e) {
          setError("Failed to create an account")
          console.log(e.message);
        }
    
        setLoading(false)
      }

  return (
    <div>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={(e) => {setRegisterEmail(e.target.value)}}/>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" id="password" onChange={(e) => {setRegisterPassword(e.target.value)}}/>
            <label htmlFor="password">Password</label>
            <input type="text" name="password2" id="password2" onChange={(e) => {setPasswordCheck(e.target.value)}}/>
            <button>Create Account</button>
        </form>
        <h3>{error}</h3>
    </div>
  )
}

export default SignUpForm