import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

const YouLoggedIn = () => {
    const {userInfo} = useAuth()
    return (
        <div>
            <h2>Welcome back {userInfo.name} from {userInfo.agency}</h2>
            <Link to="/home">
            <button>Continue</button>
            </Link>
        </div>
    )
}

export default YouLoggedIn