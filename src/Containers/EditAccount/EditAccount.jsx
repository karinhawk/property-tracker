import React, { useState } from 'react'
import { useAppContext } from '../../AppContext'
import EditAccountForm from '../../Components/EditAccountForm/EditAccountForm'

const EditAccount = () => {

    //toggle modal with password input yay
    const [showModal, setShowModal] = useState(false)
    const [passwordInput, setPasswordInput] = useState("")
    const [noMatch, setNoMatch] = useState("");
    const {deleteAccount, userInfo} = useAppContext()

    const toggleDeleteModal = () => {
        setShowModal(!showModal)
    }

    const handleDeleteAccount = (e, passwordInput) => {
        e.preventDefault()
        if(passwordInput === userInfo.password){
            try{
                deleteAccount()
                console.log("success");
            } catch(error){
                console.log(error.message);
            }
        } else {
            setNoMatch("the password doesn't match please try again")
        }
    }

  return (
    <div>
        <EditAccountForm />
        <button onClick={toggleDeleteModal}>delete account</button>
        {showModal && <form onSubmit={(e) => handleDeleteAccount(e, passwordInput)}>
            <label htmlFor="password">Please enter your password to delete your account. This action cannot be undone.</label>
            <input type="text" id='password' onChange={(e) => {setPasswordInput(e.target.value)}}/>
            <button type="submit">delete my account</button>
            <h2>{noMatch}</h2>
        </form>}

    </div>
  )
}

export default EditAccount