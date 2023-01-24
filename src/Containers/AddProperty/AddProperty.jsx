import "./AddProperty.scss"
import { Link } from 'react-router-dom'
import { useAppContext } from '../../AppContext'
import AddPropertyForm from '../../Components/AddPropertyForm/AddPropertyForm'

const AddProperty = () => {

  //form ! 
const {userInfo} = useAppContext()
  return (
    <div className="add-property">
            <h3 className="add-property__title">Add a new property</h3>
      <Link to="/account"><button className="add-property__back">Back to account</button></Link>
      <AddPropertyForm userInfo={userInfo}/>
    </div>
  )
}

export default AddProperty