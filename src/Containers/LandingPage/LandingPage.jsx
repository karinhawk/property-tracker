import "./LandingPage.scss"
import LogInForm from '../../Components/LogInForm/LogInForm.jsx'
import SignUpForm from '../../Components/SignUpForm/SignUpForm.jsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const LandingPage = () => {
    const [showSignUp, setShowSignUp] = useState(false)


    const toggleSignUp = () => {
        setShowSignUp(true)
    }
    return (
        <div className='landing-page'>
            <h1>LandingPage</h1>
            <LogInForm />
            <h2><a onClick={toggleSignUp}>Don't have an account? Create One</a></h2>
            {showSignUp && <SignUpForm />}
        </div>
    )
}

export default LandingPage