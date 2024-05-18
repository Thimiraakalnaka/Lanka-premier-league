import React, { useState } from 'react';
import coverImage from '../Assets/cover.png'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://51.20.8.206:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      if (response.ok) {

        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userName', responseData.user.name);
        alert(responseData.message); 
        navigate('/');
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container-fluid p-0 pt-0 mt-0">
      <div className="row">
        
        <div className="col-md-5"style={{ backgroundColor: '#030612' }}>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)', marginTop:'100px' }}>
              <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="email" onChange={handleChange} required/>
              </div>
            </div>
            <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)' }}>
              <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="password"  onChange={handleChange} required/>
              </div>
            </div>
            
            <p><Link to="/Register" className="link-offset-2 link-underline link-underline-opacity-0" style={{ marginLeft: 'calc(25%)' }} > I Don't have an account</Link></p>
            <button type="submit" className="btn btn-warning"style={{ marginLeft: 'calc(25%)' }}>Sign in</button>
          </form>
        </div>
        <div className="col-md-7" style={{ backgroundColor: '#030612' }}>
          <img src={coverImage} className="img-fluid" alt="Cover" />
        </div>
        
      </div>
      
    </div>
  )
}
