import './App.scss';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Containers/LandingPage/LandingPage';
import SignUp from './Containers/SignUp/SignUp';
import Account from './Containers/Account/Account';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Containers/Home/Home';
import {auth} from "./firebase.js"
import { useState } from 'react';
import { AuthAndDBProvider } from "./AppContext.js"
import Welcome from './Containers/Welcome/Welcome';
import AddProperty from './Containers/AddProperty/AddProperty';
import PropertyList from './Components/PropertyList/PropertyList';
import Layout from './Containers/Layout/Layout';
import PropertiesPage from './Containers/PropertiesPage/PropertiesPage';
function App() {
  //register
  // Sign In
  // Sign Out
  // See their basic details (Name, Agency, Profile Picture)
  // Add a property to the database
  // Add photos of the property to the database (with tagline)
  // See properties that the agent has previously saved (including images)
  // Give the property a rating out of 10

  //all properties attached to a user (someone has to have uploaded it)
  //other users can save another's property
  const [user, setUser] = useState({})


  return (
    <Router>
    <div className="App">
      <AuthAndDBProvider>
        <Layout>
      <Routes>
        <Route path='/welcome' element={<PrivateRoute><Welcome/></PrivateRoute>}/>
        <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/account' element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path='/add-property' element={<PrivateRoute><AddProperty /></PrivateRoute>} />
        <Route path='/all-properties' element={<PrivateRoute><PropertiesPage/></PrivateRoute>} />
        <Route path='/' element={<LandingPage setUser={setUser} user={user} />} />
      </Routes>
      </Layout>
      </AuthAndDBProvider>
    </div>
    </Router>
  );
}

export default App;
