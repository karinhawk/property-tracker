import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'
import AddPropertyForm from '../../Components/AddPropertyForm/AddPropertyForm'

const AddProperty = () => {

  //form ! 
const {userInfo} = useAppContext()
  return (
    <div>
      <AddPropertyForm userInfo={userInfo}/>
      <Link to="/home">home</Link>
    </div>
  )
}

export default AddProperty