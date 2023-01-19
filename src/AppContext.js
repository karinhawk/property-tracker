import React, { useContext, useState, useEffect } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db, storage } from "./firebase.js"
import { addDoc, collection, doc, updateDoc, where, getDoc, query, getDocs, FieldValue, arrayUnion, deleteDoc, arrayRemove } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom"

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext)
}

export function AuthAndDBProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState()
  const [imgUrl, setImgUrl] = useState()
  const [allProperties, setAllProperties] = useState([])
  const [savedProperties, setSavedProperties] = useState();
  const [agencyProperties, setAgencyProperties] = useState();
  const [chosenProperty, setChosenProperty] = useState();
  // const [isPropertySaved, setIsPropertySaved] = useState(false);
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
    })
  }

  const addUserInfo = async(username, agencyName) => {
    //update existing doc
    const dbUserRef = collection(db, "users")
    const queryRef = query(dbUserRef, where("email", "==", currentUser.email))
    
    const querySnapshot = await getDocs(queryRef);

    let docId = "";

    querySnapshot.forEach((doc) => {
      docId = doc.id;
    })
    
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

  //deleteaccount - ask for password to delete - if correct password in form and db then delete yay!
  const deleteAccount = async() => {
    const dbUserRef = collection(db, "users")
    const queryRef = query(dbUserRef, where("email", "==", currentUser.email))
    
    const querySnapshot = await getDocs(queryRef);

    let docId = "";

    querySnapshot.forEach((doc) => {
      docId = doc.id;
    })
          //delete properties by account
      deletePropertyByAccount();

      //remove saved
      unsaveProperty();

      //do this last    

    await deleteDoc(doc(db, "cities", docId));
    navigate("/signup-signin")
  }

//need to uselocal storge to persist across refreshes
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

    }, [])

    //-------PROPERTIES DATABASE---------

    //addproperty
    const addProperty = async(address, desc, price, bedrooms, bathrooms, receptions, url) => {
      //date listed
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateListed = `${day}-${month}-${year}`
      const propertyInfo = {
        address: address,
        desc: desc,
        price: price,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        receptions: receptions,
        dateListed: dateListed,
        agency: userInfo.agency,
        image: url,
        saved_by: []
      }
   
      const dbRef = collection(db, "properties")

      return await addDoc(dbRef, propertyInfo).then(console.log("success!"))
    
    }

    //uploadImage
    const uploadImage = async (imageUpload) => {
      const imageRef = ref(storage, `images/${imageUpload.name}`)
      await uploadBytes(imageRef, imageUpload).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setImgUrl(url)
        })
      })
      return imgUrl;
    }

    //getproperty to view - into array!!
    const getAllProperties = async() => {
      const propertiesArr = [];
      const querySnapshot = await getDocs(collection(db, "properties"))
      querySnapshot.forEach((doc) => {
        return propertiesArr.push(doc.data())
      });
      console.log(propertiesArr);
      setAllProperties(propertiesArr)
    }

    const getSingleProperty = async(address) => {
      const dbPropertiesRef = collection(db, "properties", )
      const queryRef = query(dbPropertiesRef, where("address", "==", address))
      
      const querySnapshot = await getDocs(queryRef);
  
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setChosenProperty(doc.data())
      })
      return chosenProperty
    }

    //updateproperty - for adding form stuff
    const unsaveProperty = async(address) => {
      const dbPropertiesRef = collection(db, "properties", )
      const queryRef = query(dbPropertiesRef, where("address", "==", address))
      
      const querySnapshot = await getDocs(queryRef);
  
      let docId = "";
  
      querySnapshot.forEach((doc) => {
        docId = doc.id;
        console.log(docId);
      })
  
      await updateDoc(doc(db, "properties", docId),{
          saved_by: arrayRemove(userInfo.email)
      })
      // checkIfPropertySaved(address)
    }

    //deleteproperty

    //deletePropertybyaccount
    const deletePropertyByAccount = async() => {

    }

    //saveproperty = updatedoc with agent email attached (as unique identifier)
    const saveProperty = async(address) => {
      const dbPropertiesRef = collection(db, "properties", )
      const queryRef = query(dbPropertiesRef, where("address", "==", address))
      
      const querySnapshot = await getDocs(queryRef);
  
      let docId = "";
  
      querySnapshot.forEach((doc) => {
        docId = doc.id;
        console.log(docId);
      })
  
      await updateDoc(doc(db, "properties", docId),{
          saved_by: arrayUnion(userInfo.email)
      })
      // checkIfPropertySaved(address)
      //button relies on checking if the property has been saved by THAT user
    }

    const checkIfPropertySaved = async(address) => {
      //input user email
      //if currentuser email exists on property - return true
      const propertiesArr = [];
      const dbPropertiesRef = collection(db, "properties", )
      const queryRef = query(dbPropertiesRef, where("address", "==", address))

      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((doc) => {
        return propertiesArr.push(doc.data())
      });
      console.log(propertiesArr[0].saved_by.includes(userInfo.email));
      // console.log(propertiesArr[0].saved_by.includes(userInfo.email) ? true : false);
      return propertiesArr[0].saved_by.includes(userInfo.email) ? true : false;
    }

    //get agency properties
    const getAllPropertiesFromAgency = async() => {
      const propertiesArr = [];
      console.log(userInfo.agency);

      const dbPropertiesRef = collection(db, "properties")
      const queryRef = query(dbPropertiesRef, where("agency", "==", userInfo.agency))
      
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((doc) => {
        return propertiesArr.push(doc.data())
      });
      console.log(propertiesArr);
      return setAgencyProperties(propertiesArr)
    }
    //get all properties saved by user
    const getSavedProperties = async() => {
      const propertiesArr = [];
      const dbPropertiesRef = collection(db, "properties")
      const queryRef = query(dbPropertiesRef, where("saved_by", "array-contains", userInfo.email))
      console.log(userInfo.email);
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((doc) => {
        return propertiesArr.push(doc.data())
      });
      console.log(propertiesArr);
      return setSavedProperties(propertiesArr)
    }

  const value = {
    currentUser,
    userInfo,
    allProperties,
    savedProperties,
    agencyProperties,
    chosenProperty,
    login,
    signup,
    addUserInfo,
    logout,
    resetPassword,
    deleteAccount,
    addProperty,
    saveProperty,
    unsaveProperty,
    checkIfPropertySaved,
    uploadImage,
    getAllProperties,
    getAllPropertiesFromAgency,
    saveProperty,
    getSavedProperties,
    getSingleProperty
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}