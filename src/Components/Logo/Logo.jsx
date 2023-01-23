import "./Logo.scss"
import logo from "../../assets/logo.svg"

const Logo = () => {
    return (
        <div className="logo">
            <h1 className="logo__title">Estate Haven</h1>
            <img src={logo} alt="red house logo" className="logo__img" />
        </div>
    )
}

export default Logo