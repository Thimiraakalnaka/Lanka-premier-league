import React, { useState, useEffect } from "react";
import coverImage from '../Assets/cover.png'; 


const PreInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    bowling_team: "",
    batting_team: "",
    city: "",
    target: "",
    score: "",
    overs: "",
    wickets: "",
  });

  
  const [result, setResult] = useState("");
  const [showSpan, setShowSpan] = useState(false);
  const [errors, setErrors] = useState({});

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  // const parsedValue = ["target", "score", "overs", "wickets"].includes(name)
  //   ? parseInt(value, 10) || "" 
  //   : value;

  // setFormData(prevFormData => ({
  //   ...prevFormData,
  //   [name]: parsedValue,
  // }));
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    
    if (value.trim() === "") {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: "Field cannot be empty!",
      }));
      
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: "",
      }));
      return;
    } else {
      
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  
    
    if ((name === "batting_team" && value === formData.bowling_team) || 
        (name === "bowling_team" && value === formData.batting_team)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: "Batting and bowling teams cannot be the same!",
      }));
      return;
    } else {
      
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  
    
    const validators = {
      target: (value) => {
        if (!/^\d+$/.test(value) || parseInt(value, 10) < 0) {
          return "Invalid input, please enter a non-negative integer!";
        }
        return "";
      },
      score: (value) => {
        if (parseInt(value, 10) >= formData.target) {
          return "Current score must be lower than target!";
        }
        return "";
      },
      overs: (value) => {
        if (parseInt(value, 10) <= 0 || parseInt(value, 10) > 19) {
          return "Overs must be between 1 and 20";
        }
        return "";
      },
      wickets: (value) => {
        if (!/^\d+$/.test(value) || parseInt(value, 10) < 0 || parseInt(value, 10) > 9) {
          return "Wickets must be between 0 and 9";
        }
        return "";
      },
      default: () => "",
    };
  
    
    const validator = validators[name] || validators.default;
  
    
    const errorMessage = validator(value);
  
    
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  
    
    if (errorMessage) {
      
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: "",
      }));
      return;
    }
  
    
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  

  useEffect(() => {
    const progressContainer = document.querySelector(".progress-container");
    if (progressContainer) {
      progressContainer.style.display = "block";
    }
  }, []);

  const fetchPredictionResult = () => {
    const url = "http://localhost:5000/predict";

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setIsLoading(false);
        setShowSpan(true);
      })
      .catch((error) => {
        console.error('Error fetching prediction result:', error);
      });
  };

  const handlePredictClick = () => {
    setIsLoading(true);
    fetchPredictionResult();
  };

  return (
    <div className="container-fluid p-0 pt-0 mt-0">
      <div className="row">
        
        <div className="col-md-5"style={{ backgroundColor: '#030612' }}>
          <form method="post">
          <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)'}}>
              <label htmlFor="bowling_team" className="col-sm-7 col-form-label ">Select Bowling Team</label>
            <div className="col-sm-12 col-md-10">
            <select
                name="bowling_team"
                id="bowling_team"
                className="form-select"
                style={{ width: '100%' }}
                value={formData.bowling_team}
                onChange={handleChange}
                required
            >
                <option value="" selected hidden>Select</option>
                <option value="B-Love Kandy">B-Love Kandy</option>
                            <option value="Colombo Strikers">Colombo Strikers</option>
                            <option value="Dambulla Aura">Dambulla Aura</option>
                            <option value="Galle Titans">Galle Titans</option>
                            <option value="Jaffna Kings">Jaffna Kings</option>
            </select>
            </div>
              
            </div>
            <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)'}}>
              <label htmlFor="batting_team" className="col-sm-7 col-form-label">Select Batting Team </label>
              <div className="col-sm-10">
              <select name="batting_team" 
                      id="batting_team" 
                      className="form-select" 
                      style={{ width: '100%' }} 
                      value={formData.batting_team}
                      onChange={handleChange}
                      required>
                            <option value="" selected hidden>Select</option>
                            <option value="B-Love Kandy">B-Love Kandy</option>
                            <option value="Colombo Strikers">Colombo Strikers</option>
                            <option value="Dambulla Aura">Dambulla Aura</option>
                            <option value="Galle Titans">Galle Titans</option>
                            <option value="Jaffna Kings">Jaffna Kings</option>
                        </select>
              </div>
            </div>
            <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)'}}>
              <label htmlFor="city" className="col-sm-5 col-form-label">Select City</label>
              <div className="col-sm-10">
                <select name="city" 
                        id="city" 
                        className="form-select" 
                        style={{ width: '100%' }}
                        value={formData.city}
                        onChange={handleChange}
                        required>
                            <option value="" selected hidden>Select</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Hambantota">Hambantota</option>
                            <option value="Kandy">Kandy</option>
                        </select> 
              </div>
            </div>
            <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)'}}>
              <label htmlFor="target" className="col-sm-3 col-form-label re">Target</label>
              <div className="col-sm-10">
                <input type="text" 
                        className="form-control" 
                        id="target" 
                        name="target"
                        value={formData.target}
                        onChange={handleChange}
                        required/>
                        {errors.target && <span className="text-danger">{errors.target}</span>}
              </div>
            </div>
            <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)' }}>
              <label htmlFor="score" className="col-sm-6 col-form-label">Current Score</label>
              <div className="col-sm-10">
                <input type="text" 
                        className="form-control" 
                        id="score"
                        name="score"
                        value={formData.score}
                        onChange={handleChange}
                        required />
                        {errors.score && <span className="text-danger">{errors.score}</span>}
              </div>
            </div>
            <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)' }}>
              <label htmlFor="overs" className="col-sm-7 col-form-label"> Overs Completed</label>
              <div className="col-sm-10">
                <input type="text" 
                        className="form-control" 
                        id="overs" 
                        name="overs"
                        value={formData.overs}
                        onChange={handleChange}
                        required />
                        {errors.overs && <span className="text-danger">{errors.overs}</span>}
              </div>
            </div>
            <div className="row mb-3 text-white"style={{ marginLeft: 'calc(25%)' }}>
              <label htmlFor="wickets" className="col-sm-4 col-form-label"> Wickets </label>
              <div className="col-sm-10">
                <input type="text" 
                      className="form-control" 
                      id="wickets"
                      name="wickets"
                      value={formData.wickets}
                      onChange={handleChange} 
                      required/>
                      {errors.wickets && <span className="text-danger">{errors.wickets}</span>}
              </div>
            </div>
            
        
            <button className="btn btn-warning"
                    style={{ marginLeft: 'calc(25%)' }}
                    // disabled={isLoading}
                    // onClick={!isLoading ? handlePredictClick : null}
                    disabled={isLoading || Object.values(formData).some(value => value === "")}
                    onClick={!isLoading ? handlePredictClick : null}
                    >
                      Predict Winner
                      </button>

{/* Display win probability result */}
{/* {showSpan && (
              <div className="result text-white">
                <h2>Win Probability</h2>
                <br />
                <p>{formData.batting_team} - {result.win.toFixed(2)}%</p>
                <p>{formData.bowling_team} - {result.loss.toFixed(2)}%</p>
              </div>
            )} */}

{/* {showSpan && (
    <div className="result text-white">
        <br />
        <div className="d-flex justify-content-between">
            <span>{formData.batting_team} {result.win.toFixed(2)}%</span>
            <span>{formData.bowling_team} {result.loss.toFixed(2)}%</span>
        </div>
        <div className="progress">
            <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${result.win}%` }} aria-valuenow={result.win} aria-valuemin="0" aria-valuemax="100"></div>
            <div className="progress-bar bg-white" role="progressbar" style={{ width: `${result.loss}%` }} aria-valuenow={result.loss} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
)} */}
          </form>

          <br/><br/>


        </div>
        <div className="col-md-7 position-relative" style={{ backgroundColor: '#030612' }}>
    <img src={coverImage} className="img-fluid" alt="Cover" />

    <div className="card position-absolute top-50 start-50 translate-middle" style={{ width: '50%', backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <div className="card-body">
            <h2 className="card-title">Win Probability</h2>
            {showSpan && (
    <div className="result text-white">
        <br />
        <div className="d-flex justify-content-between">
            <span>{formData.batting_team} {result.win.toFixed(2)}%</span>
            <span>{formData.bowling_team} {result.loss.toFixed(2)}%</span>
        </div>
        <div className="progress">
            <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${result.win}%` }} aria-valuenow={result.win} aria-valuemin="0" aria-valuemax="100"></div>
            <div className="progress-bar bg-white" role="progressbar" style={{ width: `${result.loss}%` }} aria-valuenow={result.loss} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
)}
        </div>
    </div>
</div>
      </div>
    </div>
  )
}

export default PreInput;