import "./LogInForm.scss"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext'

const LogInForm = () => {
    const { login, currentUser, logout } = useAppContext()
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate()

    let email = "";
    let password = "";

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(email, password);
            setError("")
            await login(email, password)
            navigate("/welcome")
            
        } catch (e) {
            console.log(e.message);
            setError("Failed to log in")
        }
    }

    useEffect(() => {
        email = loginEmail;
        password = loginPassword;
    }, [loginPassword])
    



    return (
        <div className="form">
            <h2 className="form__title">Log In</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="form__content">
                <div className="form__content__email">
                <label htmlFor="email" className="form__content__email__label">Email</label>
                <input type="text" name="email" id="email" className="form__content__email__input" onChange={(e) => { setLoginEmail(e.target.value) }} />
                </div>
                <div className="form__content__password">
                <label htmlFor="password" className="form__content__password__label">Password</label>
                <input type="text" name="password" id="password" className="form__content__password__input" onChange={(e) => { setLoginPassword(e.target.value) }} />
                </div>
                <button className="form__content__submit" type="submit">Log In</button>
                <h3 className="form__content__error">{error ? error : ""}</h3>            </form>
            {/* <button className="form__content__logout" onClick={logout}>log out</button> */}
        </div>
    )
}

export default LogInForm