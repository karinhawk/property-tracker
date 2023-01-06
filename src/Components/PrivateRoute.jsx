import React from 'react'
import {Navigate} from "react-router-dom"
import { auth } from "../firebase.js"

const PrivateRoute = ({children}) => {
    console.log(auth.currentUser);
  return auth.currentUser ? children : <Navigate to="/" />;
}

export default PrivateRoute