import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'

const YouLoggedIn = () => {
    const {userInfo} = useAppContext()
    return (
        <div>
            <h2>Welcome back {userInfo.name} from {userInfo.agency}</h2>
            <Link to="/">
            <button>Continue</button>
            </Link>
        </div>
    )
}

export default YouLoggedIn