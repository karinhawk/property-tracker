import "./SignUpForm.scss"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

const SignUpForm = () => {
    const {signup} = useAppContext()
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [error, setError] = useState("")
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
          await signup(registerEmail, registerPassword)
          console.log(registerEmail, registerPassword);
          navigate("/welcome")
        } catch (e) {
          setError("Failed to create an account")
          console.log(e.message);
        }
      }

  return (
    <div className='form'>
        <h2 className='form__title'>Create Account</h2>
        <form onSubmit={handleSubmit} className="form__content">
          <div className="form__content__item">
            <label htmlFor="email" className="form__content__item__label">Email</label>
            <input type="text" name="email" id="email" className="form__content__email__input" onChange={(e) => {setRegisterEmail(e.target.value)}}/>
            </div>
            <div className="form__content__item">
            <label htmlFor="password" className="form__content__item__label">Password</label>
            <input type="text" name="password" id="password" className="form__content__item__input" onChange={(e) => {setRegisterPassword(e.target.value)}}/>
            </div>
            <div className="form__content__item">
            <label htmlFor="password" className="form__content__item__label">Confirm Password</label>
            <input type="text" name="password2" id="password2" className="form__content__item__input" onChange={(e) => {setPasswordCheck(e.target.value)}}/>
            </div>
            <button className="form__content__submit">Create Account</button>
        </form>
        <h3>{error}</h3>
    </div>
  )
}

export default SignUpForm