import "./Home.scss"
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'

const Home = () => {
   
  //show top 3 saved properties?




  const {userInfo, logout} = useAppContext()
    
  return (
    <div className="home">
  <p className="home__text">Welcome to our comprehensive property listing website, designed for estate agents. Our platform is designed to make it easy for you to upload and showcase your properties to a wider audience. We understand that as an estate agent, your time is valuable, and that's why we've made our website user-friendly and intuitive.</p>
  <br />
  <p className="home__text">As an estate agent, you'll also appreciate the ability to manage your listings easily, editing details and removing properties that are no longer available. This allows you to keep your listings up-to-date and accurate, so you can focus on what you do best, selling properties.</p>
    </div>
  )
}

export default Home