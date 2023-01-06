import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from "../../firebase.js"
import LogInForm from '../../Components/LogInForm/LogInForm.jsx'
import SignUpForm from '../../Components/SignUpForm/SignUpForm.jsx'
import { useAuth } from '../../AuthContext.js'

const LandingPage = () => {
    const {auth} = useAuth()
    // const [registerEmail, setRegisterEmail] = useState("");
    // const [registerPassword, setRegisterPassword] = useState("");
    // const [loginEmail, setLoginEmail] = useState("");
    // const [loginPassword, setLoginPassword] = useState("");
    

    // useEffect(() => {
    //     onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //     });

    // }, [])

    // const register = async (e) => {
    //     try {
    //         e.preventDefault()
    //         const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    //         console.log(user);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    // const login = async (e) => {
    //     try {
    //         e.preventDefault()
    //         const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    //         console.log(user);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    // const logout = async () => {
    //     await signOut(auth)
    // }

    return (
        <div>
            <h1>LandingPage</h1>
            <LogInForm />
            <SignUpForm />
            {/* <h3>{user ? user.email : "not logged in"}</h3> */}
        </div>
    )
}

export default LandingPage