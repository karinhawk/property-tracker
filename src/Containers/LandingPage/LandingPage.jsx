import "./LandingPage.scss"
import LogInForm from '../../Components/LogInForm/LogInForm.jsx'
import SignUpForm from '../../Components/SignUpForm/SignUpForm.jsx'
import { useState } from 'react'
import Logo from "../../Components/Logo/Logo"


const LandingPage = () => {
    const [showSignUp, setShowSignUp] = useState(false)

    const toggleSignUp = () => {
        setShowSignUp(!showSignUp)
    }
    return (
        <div className='landing-page'>
            <div className="landing-page__content">
                <Logo />
                {!showSignUp &&
                    <div><LogInForm />
                        <div className="landing-page__create">
                            <h3 className="landing-page__create__static">Don't have an account?</h3>
                            <h4 onClick={toggleSignUp} className="landing-page__create__clickable">Create One</h4>
                        </div>
                    </div>}
                {showSignUp &&
                    <div><SignUpForm />
                        <div className="landing-page__create">
                            <h3 className="landing-page__create__static">Already have an account?</h3>
                            <h4 onClick={toggleSignUp} className="landing-page__create__clickable">Sign in</h4>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default LandingPage