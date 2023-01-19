import React from 'react'
import {Navigate} from "react-router-dom"
import { useAppContext } from '../AppContext.js'
import { auth } from "../firebase.js"

const PrivateRoute = ({children}) => {
    const {currentUser} = useAppContext()
    console.log(currentUser);
  return currentUser ? children : <Navigate to="/signup-signin" />;
}

export default PrivateRoute