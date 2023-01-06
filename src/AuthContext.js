import React, { useContext, useState, useEffect } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from "./firebase.js"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const signup = async(email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    const dbRef = collection(db, "users");
    const userData = {
        id: currentUser.uid,
        name: null,
        email: email,
        password: password,
        agency: null,
        profilePicture: null
    }
    console.log(userData);
    return await addDoc(dbRef, userData).then(console.log("successful"))
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const addUserInfo = async(username, agencyName) => {
    //update existing doc
    const dbUserRef = doc(db, "users").where('id' == currentUser.id)
    return await updateDoc(dbUserRef, {
        name: username,
        agency: agencyName
    })
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

    }, [])

  const value = {
    currentUser,
    login,
    signup,
    addUserInfo,
    logout,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}