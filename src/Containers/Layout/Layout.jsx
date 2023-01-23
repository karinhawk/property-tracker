import "./Layout.scss"
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { useAppContext } from "../../AppContext"

const Layout = ({children}) => {
  const {currentUser} = useAppContext()
  return (
    <div className="layout">
    {currentUser && <Navbar />}
    {children}
    <Footer />
    </div>
  )
}

export default Layout