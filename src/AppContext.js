import React, { useContext, useState, useEffect } from "react"
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db, storage } from "./firebase.js"
import { addDoc, collection, doc, updateDoc, where, getDoc, query, getDocs, FieldValue, arrayUnion, deleteDoc, arrayRemove, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom"

const AppContext = React.createContext()

export function useAppContext() {
  return useContext(AppContext)
}

export function AuthAndDBProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [userInfo, setUserInfo] = useState()
  const [imgUrl, setImgUrl] = useState([])
  const [allProperties, setAllProperties] = useState([])
  const [savedProperties, setSavedProperties] = useState();
  const [agencyProperties, setAgencyProperties] = useState();
  const [chosenProperty, setChosenProperty] = useState();
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
          try{
            await deleteUser(auth.currentUser).then(deleteDoc(doc(db, "users", docId)))
            // await deleteDoc(doc(db, "users", docId))
            setUserInfo(null)
          }catch(e){
            console.log(e.message);
          }
  }

//need to uselocal storge to persist across refreshes
//need to grab user that matches from db? (in auth state changed???)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

    }, [])

    //-------PROPERTIES DATABASE---------

    //addproperty
    const addProperty = async(address, desc, price, bedrooms, bathrooms, receptions, urlArr) => {
      //date listed
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateListed = `${day}-${month}-${year}`
      console.log(imgUrl);
      const propertyInfo = {
        address: address,
        desc: desc,
        price: price,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        receptions: receptions,
        dateListed: dateListed,
        agency: userInfo.agency,
        images: urlArr,
        created_by: userInfo.email,
        saved_by: []
      }
   
      const dbRef = collection(db, "properties")

      return await addDoc(dbRef, propertyInfo).then(console.log("success!"))
    
    }

    const updateProperty = async(oldAddress, address, desc, price, bedrooms, bathrooms, receptions, urlArr) => {
      console.log(oldAddress);
      const dbPropertiesRef = collection(db, "properties")
      const queryRef = query(dbPropertiesRef, where("address", "==", oldAddress))
      
      const querySnapshot = await getDocs(queryRef);
  
      let docId = "";
      let createdBy = "";
      let savedBy = "";
      let agencyName = "";
      let date = "";
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        docId = doc.id
        console.log(doc.id);
        createdBy = doc.data().created_by;
        savedBy = doc.data().saved_by;
        agencyName = doc.data().agency
        date = doc.data().dateListed
      })
      return await setDoc(doc(dbPropertiesRef, docId), {
        address: address,
        desc: desc,
        price: price,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        receptions: receptions,
        dateListed: date,
        agency: agencyName,
        images: urlArr,
        created_by: createdBy,
        saved_by: savedBy
      }).then(console.log("success!"))
    }

    //uploadImage
    const uploadImage = async(imagesArr) => {
      setImgUrl([])
      let urlArr = [];
      let updates = [];
      let url = "";

      for (let i = 0; i < imagesArr.length; i++) {
        let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        const imageRef = ref(storage, `images/${uniqueId}`);
          await uploadBytes(imageRef, imagesArr[i])

          // url = await getDownloadURL(imageRef)
          // urlArr.push(url)
          // console.log(urlArr)
          updates.push(await getDownloadURL(imageRef).then((url) => urlArr.push(url)))
      }
      await Promise.all(updates)
      return urlArr
      
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

    //getmostsavedproperty for featured properties on front page - top 3 in carousel
    const getTop3Properties = () => {


    }

    const getRecentlyUploaded = () => {

    }

    const getSingleProperty = async(address) => {
      const dbPropertiesRef = collection(db, "properties")
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
      const dbPropertiesRef = collection(db, "properties")
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

    const unsaveAllPropertiesLinkedToAccount = async() => {
      //get all properties where saved_by includes that email and save in  array
      //for each property in that array
      //remove that email from savedby
      const dbPropertiesRef = collection(db, "properties")
      const queryRef = query(dbPropertiesRef, where("saved_by", "array-contains", userInfo.email))
      
      const querySnapshot = await getDocs(queryRef);

      const updates = [];

      querySnapshot.forEach((doc) => {
        updates.push(updateDoc(doc.ref, {
          saved_by: arrayRemove(userInfo.email)
        }))
      })
      await Promise.all(updates)
    }

    //deleteproperty
    const deleteProperty = async(address) => {
      const dbPropertiesRef = collection(db, "properties")
      const queryRef = query(dbPropertiesRef, where("address", "==", address))
      
      const querySnapshot = await getDocs(queryRef);
  
      let docId = "";
  
      querySnapshot.forEach((doc) => {
        docId = doc.id;
        console.log(docId);
      })

      await deleteDoc(doc(db, "properties", docId));
      navigate("/account")
    }
    //deletePropertybyaccount
    const deletePropertyByAccount = async() => {
      const dbPropertiesRef = collection(db, "properties")
      const queryRef = query(dbPropertiesRef, where("created_by", "==", userInfo.email))
      
      const querySnapshot = await getDocs(queryRef);

      const updates = [];

      querySnapshot.forEach((doc) => {
        updates.push(deleteDoc(doc.ref))
      })
      await Promise.all(updates)
    }

    //saveproperty = updatedoc with agent email attached (as unique identifier)
    const saveProperty = async(address) => {
      const dbPropertiesRef = collection(db, "properties")
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
      const dbPropertiesRef = collection(db, "properties")
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
    updateProperty,
    deleteProperty,
    deletePropertyByAccount,
    saveProperty,
    unsaveProperty,
    unsaveAllPropertiesLinkedToAccount,
    checkIfPropertySaved,
    uploadImage,
    getAllProperties,
    getAllPropertiesFromAgency,
    getSavedProperties,
    getSingleProperty
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}