import React, { useContext, useState, useEffect } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from "./firebase.js"
import { addDoc, collection, doc, updateDoc, where, getDoc, query, getDocs } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext)
}

export function AuthAndDBProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState()
  const navigate = useNavigate()

  //-------AUTHORIZATION---------

  const signup = async(email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    const dbRef = collection(db, "users");
    const userData = {
        id: user.user.uid,
        name: null,
        email: email,
        password: password,
        agency: null,
        profilePicture: null
    }
    console.log(userData);
    setUserInfo(userData)
    return await addDoc(dbRef, userData).then(console.log("successful"))
  }

  const login = async(email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    const dbUserRef = collection(db, "users")
    console.log(currentUser.email);
    const queryRef = query(dbUserRef, where("email", "==", currentUser.email))
    
    const querySnapshot = await getDocs(queryRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.data().agency);
      setUserInfo({
        agency: doc.data().agency,
        email: doc.data().email,
        id: doc.data().id,
        name: doc.data().name,
        password: doc.data().password,
        // profilePicture: doc.profilePicture
      })
      console.log(userInfo);
    })
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
    
    await updateDoc(doc(db, "users", docId),{
        name: username,
        agency: agencyName
    })
    navigate("/")
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  //deleteaccount


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

    }, [])

    //-------PROPERTIES DATABASE---------

    //addproperty
    const addProperty = async(address, desc, price, bedrooms, bathrooms, receptions) => {
      //date listed
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateListed = `${day}-${month}-${year}`
      console.log(dateListed);
      console.log(db);
      console.log(userInfo.agency);
      const propertyInfo = {
        address: address,
        desc: desc,
        price: price,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        receptions: receptions,
        dateListed: dateListed,
        agency: userInfo.agency,
        // images: []
      }
      console.log(propertyInfo);
   
      const dbRef = collection(db, "properties")
      console.log(dbRef);

      return await addDoc(dbRef, propertyInfo).then(console.log("success!"))
    
    }

    //updateproperty - for adding form stuff

    //deleteproperty

    //addimage??

    //saveproperty = updatedoc with agent email attached (as unique identifier)

  const value = {
    currentUser,
    userInfo,
    login,
    signup,
    addUserInfo,
    logout,
    resetPassword,
    addProperty
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}