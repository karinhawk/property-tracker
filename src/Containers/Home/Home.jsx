import "./Home.scss"
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'

const Home = () => {
   
  //show top 3 saved properties?




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