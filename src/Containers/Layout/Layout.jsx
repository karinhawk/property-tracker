import "./Layout.scss"
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'

const Layout = ({children}) => {
  return (
    <div className="layout">
    <Navbar />
    {children}
    <Footer />
    </div>
  )
}

export default Layout