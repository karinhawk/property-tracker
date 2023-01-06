import React from 'react'

const SignUpForm = ({register, setRegisterEmail, setRegisterPassword}) => {
  return (
    <div>
        <h2>Create Account</h2>
        <form>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={(e) => {setRegisterEmail(e.target.value)}}/>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" id="password" onChange={(e) => {setRegisterPassword(e.target.value)}}/>
            <button onClick={register}>Create Account</button>
        </form>
    </div>
  )
}

export default SignUpForm