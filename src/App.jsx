import './App.scss';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import LogIn from './Containers/LogIn/LogIn';
import SignUp from './Containers/SignUp/SignUp';
import Account from './Containers/Account/Account';
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


  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
