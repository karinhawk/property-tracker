import "./YouLoggedIn.scss"
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'

const YouLoggedIn = () => {
    const {userInfo} = useAppContext()
    return (
        <div className="logged-in">
            <h2 className="logged-in__greeting">Welcome back {userInfo.name} from {userInfo.agency}</h2>
            <Link to="/">
            <button className="logged-in__button">Continue</button>
            </Link>
        </div>
    )
}

export default YouLoggedIn