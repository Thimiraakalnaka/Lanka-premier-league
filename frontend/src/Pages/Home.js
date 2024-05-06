import React from 'react';
import coverImage from '../Assets/cover.png'; 
import { Link } from 'react-router-dom';

function Home() {
  
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <div className="container-fluid p-0 pt-0 mt-0">
      <div className="row">
        <div className="col-md-6"style={{ backgroundColor: '#030612' }}>
          <div className="cover-content p-5" style={{ marginLeft: 'calc(25%)' }}>
            <h1 className="display-4 text-start text-white"><strong>Lanka premier league win probability predicter</strong></h1>
            <p className="lead text-start text-white">Accurate and valuable win probability prediction system that enhances the understanding, engagement, and strategic decision-making within the Lanka Premier League.</p>
            {/* <Link to="/PreInput" className="btn btn-warning btn-lg float-start text-dark">Predict Winner</Link>  */}
            {isAuthenticated ? (
              <Link to="/PreInput" className="btn btn-warning btn-lg float-start text-dark">Predict Winner</Link>
            ) : (
              <button className="btn btn-warning btn-lg float-start text-dark" disabled>Predict Winner</button>
            )}
          </div>
        </div>
        <div className="col-md-6 p-0 "style={{ backgroundColor: '#030612' }}>
          <img src={coverImage} className="img-fluid" alt="Cover" />
        </div>
      </div>
    </div>
  );
}

export default Home;
