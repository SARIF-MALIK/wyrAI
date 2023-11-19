import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './screens/Home.js';
import Signup from './screens/Signup.js';
import ResetPass from './screens/ResetPass.js';
import Companydetail from './screens/Companydetail.js';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/newuser' element={<Signup/>}/>
        <Route exact path='/resetpassword' element={<ResetPass/>}/>
        <Route exact path='/companydetail' element={<Companydetail/>}/>

      </Routes>
    </div>
    </Router>
  );
}

export default App;


