import React from 'react'
import { useAuth } from '../../AuthContext'
import YouLoggedIn from '../../Components/YouLoggedIn/YouLoggedIn'
import YouSignedUp from '../../Components/YouSignedUp/YouSignedUp'

const Welcome = () => {
    const {userInfo} = useAuth()
    
    return (
      <div>
          {userInfo.name === null && <YouSignedUp />}
          {userInfo.name != null && <YouLoggedIn />}
      </div>
    )
}

export default Welcome