import React from 'react'
import YouLoggedIn from '../../Components/YouLoggedIn/YouLoggedIn'
import YouSignedUp from '../../Components/YouSignedUp/YouSignedUp'

const Home = () => {
    //post account to db without name 
    //on creation of account - must input name and agency name - posted to firebase db
    //default modal shown here is registered modal
    //access db and if user exists on db and has a name show the logged in modal

    //usestate for interacted with modal - modal goes away - can then see properties

    //uid
    //display name
    //photoUrl??
    //email
    //password
    //access token????!!
  return (
    <div>Home
        <YouSignedUp />
        <YouLoggedIn />
    </div>
  )
}

export default Home