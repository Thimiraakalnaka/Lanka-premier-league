import React, { useState }  from 'react'
import coverImage from '../Assets/cover.png'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://13.49.230.6:4000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (response.ok) {
        alert(responseData.message); 
        navigate('/Login');
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
          <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)'}}>
              <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
              <div className="col-sm-10">
                <input type="name" className="form-control" id="name" onChange={handleChange} required/>
              </div>
            </div>
            <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)'}}>
              <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="email" onChange={handleChange} required/>
              </div>
            </div>
            <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)' }}>
              <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="password" onChange={handleChange}required />
              </div>
            </div>
            
            <p><Link to="/Login" className="link-offset-2 link-underline link-underline-opacity-0" style={{ marginLeft: 'calc(25%)' }}>I already have an account</Link></p>
            <button type="submit" className="btn btn-warning"style={{ marginLeft: 'calc(25%)' }}>Sign Up</button>
          </form>
        </div>
        <div className="col-md-7" style={{ backgroundColor: '#030612' }}>
          <img src={coverImage} className="img-fluid" alt="Cover" />
        </div>
      </div>
    </div>
  )
}
