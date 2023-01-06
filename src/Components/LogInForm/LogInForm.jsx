import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'

const LogInForm = () => {
    const {login, currentUser, logout} = useAuth()
        const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(loginEmail, loginPassword);
    
        try {
            console.log(loginEmail, loginPassword);
            setError("")
            setLoading(true)
          await login(loginEmail, loginPassword)
          console.log(loginEmail, loginPassword);
          navigate("/home")
        } catch (e) {
            console.log(e.message);
          setError("Failed to log in")
        }
      }


    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" onChange={(e) => {setLoginEmail(e.target.value)}}/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" onChange={(e) => {setLoginPassword(e.target.value)}}/>
                <button>Log In</button>
                <h3>{error ? error : ""}</h3>
                <h3>{currentUser ? currentUser.email : "logged out"}</h3>
                
            </form>
            <button onClick={logout}>log out</button>
        </div>
    )
}

export default LogInForm