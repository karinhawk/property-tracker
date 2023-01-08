import React from 'react'
import { useAppContext } from '../../AppContext'
import YouLoggedIn from '../../Components/YouLoggedIn/YouLoggedIn'
import YouSignedUp from '../../Components/YouSignedUp/YouSignedUp'

const Welcome = () => {
    const {userInfo} = useAppContext()
    
    return (
      <div>
          {userInfo.name === null && <YouSignedUp />}
          {userInfo.name != null && <YouLoggedIn />}
      </div>
    )
}

export default Welcome