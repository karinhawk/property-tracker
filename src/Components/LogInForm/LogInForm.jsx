import React from 'react'

const LogInForm = ({login, setLoginEmail, setLoginPassword}) => {
    return (
        <div>
            <h2>Log In</h2>
            <form>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" onChange={(e) => {setLoginEmail(e.target.value)}}/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" onChange={(e) => {setLoginPassword(e.target.value)}}/>
                <button onClick={login}>Log In</button>
            </form>
        </div>
    )
}

export default LogInForm