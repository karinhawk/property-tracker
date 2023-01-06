import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from "../../firebase.js"
import LogInForm from '../../Components/LogInForm/LogInForm.jsx'
import SignUpForm from '../../Components/SignUpForm/SignUpForm.jsx'

const Home = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({})

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

    }, [])

    const register = async (e) => {
        try {
            e.preventDefault()
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    const login = async (e) => {
        try {
            e.preventDefault()
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    const logout = async () => {
        await signOut(auth)
    }

    return (
        <div>
            <h1>Home</h1>
            <LogInForm login={login} setLoginEmail={setLoginEmail} setLoginPassword={setLoginPassword} />
            <SignUpForm register={register} setRegisterEmail={setRegisterEmail} setRegisterPassword={setRegisterPassword} />
            <button onClick={logout}>log out</button>
            <h3>{user ? user.email : "not logged in"}</h3>
        </div>
    )
}

export default Home