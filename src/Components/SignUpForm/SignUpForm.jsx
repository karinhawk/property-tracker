import React, { useState } from 'react'
import { useAuth } from '../../AuthContext';

const SignUpForm = () => {
    const {signup} = useAuth()
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
  return (
    <div>
        <h2>Create Account</h2>
        <form>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={(e) => {setRegisterEmail(e.target.value)}}/>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" id="password" onChange={(e) => {setRegisterPassword(e.target.value)}}/>
            <button onClick={signup}>Create Account</button>
        </form>
    </div>
  )
}

export default SignUpForm