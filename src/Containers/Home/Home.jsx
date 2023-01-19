import "./Home.scss"
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'

const Home = () => {
    //post account to db without name 
    //on creation of account - must input name and agency name - posted to firebase db
    //default modal shown here is registered modal
    //access db and if user exists on db and has a name show the logged in modal



  const {userInfo, logout} = useAppContext()
    
  return (
    <div className="home">Home
        <button onClick={logout}>logout</button>
        <Link to="/account">
        <button>Account</button>
        </Link>
        <Link to="/all-properties">
        <button>view all properties</button>
        </Link>
    </div>
  )
}

export default Home