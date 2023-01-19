import "./Navbar.scss"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="navbar">
        <Link to="/">
        <h3 className="navbar__item">HOME</h3>
        </Link>
        <Link to="/all-properties">
        <h3 className="navbar__item">PROPERTIES</h3>
        </Link>
        <Link to="/account">
        <h3 className="navbar__item">ACCOUNT</h3>
        </Link>
    </header>
  )
}

export default Navbar