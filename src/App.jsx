import './App.scss';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Containers/LandingPage/LandingPage';
import Account from './Containers/Account/Account';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Containers/Home/Home';
import { useState } from 'react';
import { AuthAndDBProvider } from "./AppContext.js"
import Welcome from './Containers/Welcome/Welcome';
import AddProperty from './Containers/AddProperty/AddProperty';
import Layout from './Containers/Layout/Layout';
import PropertiesPage from './Containers/PropertiesPage/PropertiesPage';
import PropertyPage from './Containers/PropertyPage/PropertyPage';
import EditProperty from "./Containers/EditProperty/EditProperty";
import EditAccount from './Containers/EditAccount/EditAccount';
function App() {

  const [user, setUser] = useState({})

  return (
    <Router>
    <div className="App">
      <AuthAndDBProvider>
        <Layout>
      <Routes>
        <Route path='/welcome' element={<PrivateRoute><Welcome/></PrivateRoute>}/>
        <Route path='/account' element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path='/edit-account' element={<PrivateRoute><EditAccount /></PrivateRoute>} />
        <Route path='/add-property' element={<PrivateRoute><AddProperty /></PrivateRoute>} />
        <Route path='/edit-property' element={<PrivateRoute><EditProperty /></PrivateRoute>} />
        <Route path='/all-properties' element={<PrivateRoute><PropertiesPage/></PrivateRoute>} />
        <Route path='/:address' element={<PrivateRoute><PropertyPage/></PrivateRoute>} />
        <Route path='/signup-signin' element={<LandingPage setUser={setUser} user={user} />} />
        <Route exact path='/' element={<PrivateRoute><Home /></PrivateRoute>}/>
      </Routes>
      </Layout>
      </AuthAndDBProvider>
    </div>
    </Router>
  );
}

export default App;
