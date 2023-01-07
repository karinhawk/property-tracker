import React, { useContext, useState, useEffect } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from "./firebase.js"
import { addDoc, collection, doc, updateDoc, where, getDoc, query, getDocs } from "firebase/firestore"

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
    const dbUserRef = collection(db, "users")
    console.log(currentUser.email);
    const queryRef = query(dbUserRef, where("email", "==", currentUser.email))
    
    const querySnapshot = await getDocs(queryRef);

    let docId = "";

    querySnapshot.forEach((doc) => {
      docId = doc.id;
    })
    console.log(docId);
    
    return await updateDoc(doc(db, "users", docId),{
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