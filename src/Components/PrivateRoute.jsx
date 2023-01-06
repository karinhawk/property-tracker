import React from 'react'
import {Navigate} from "react-router-dom"
import { useAuth } from '../AuthContext.js'
import { auth } from "../firebase.js"

const PrivateRoute = ({children}) => {
    const {currentUser} = useAuth()
    console.log(currentUser);
  return currentUser ? children : <Navigate to="/" />;
}

export default PrivateRoute