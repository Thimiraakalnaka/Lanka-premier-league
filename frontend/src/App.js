import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Layouts/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import PreInput from './Pages/PreInput';

function App() {
  return (
    <div className="App">
    <Router>
    <Navbar/>
    <Routes>
    <Route exact path = "/" element={<Home/>}/>
    <Route exact path = "/Login" element={<Login/>}/>
    <Route exact path = "/Register" element={<Register/>}/>
    <Route exact path = "/PreInput" element={<PreInput/>}/>
    </Routes>
    </Router>
     
     {/* <Home/> */}
     {/* <Login/> */}
     {/* <Register/> */}
     {/* <PreInput/> */}
     {/* <PreResult/> */}
    </div>
  );
}

export default App;
