import React from 'react';
import logo from '../Assets/logo.png';
import { Link, useNavigate} from 'react-router-dom';
import {PersonCircle } from 'react-bootstrap-icons';


export default function Navbar() {

  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication details from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    // Redirect to the login page after logout
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg  justify-content-center mb-0 mt-0"style={{ backgroundColor: '#030612' }}>
      <div className="container-fluid px-4">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Bootstrap"
            width="200"
            height="200"
            style={{ marginLeft: 'calc(50% + 60px)' }} 
          />
        </a>
        
        <div className="collapse navbar-collapse justify-content-center " id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" style={{ marginRight: '60px' }}>
            <Link to="/" className="nav-link active text-white" aria-current="page"> Home </Link>
            </li>
            <li className="nav-item " style={{ marginRight: '60px' }}> 
              <a className="nav-link text-white" href="#">
                News
              </a>
            </li>
            <li className="nav-item" style={{ marginRight: '60px' }}> 
              <a className="nav-link text-white" href="#">
                About Us
              </a>
            </li>
            <li className="nav-item" style={{ marginRight: '60px' }}>
              <a className="nav-link text-white" href="#">
                Contact Us 
              </a>
            </li>
          </ul>
          <Link to="/login" className="btn btn-warning ms-3" >Log in</Link>
          <button onClick={handleLogout} className="btn btn-warning ms-3" style={{ marginRight: '60px' }}>Log out</button>
          <PersonCircle color="white" size={25} />
          {userName ? (
            <span className='text-white me-3'>{userName}</span>
          ) : (
            <span className='text-white me-3'>Unauthorized User</span>
          )}
          
        </div>
      </div>
    </nav>
  );
}
