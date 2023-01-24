import "./EditProperty.scss"
import { Link } from 'react-router-dom'
import EditPropertyForm from '../../Components/EditPropertyForm/EditPropertyForm'

const EditProperty = () => {
  return (
    <div className='edit-property'>
         <h3 className='edit-property__title'>Edit an existing property</h3>
      <Link to="/account">
      <button className="edit-property__back">Back to account</button></Link>
      <EditPropertyForm />
    </div>
  )
}

export default EditProperty