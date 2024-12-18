import React, { useState } from 'react';
import axios from 'axios';

const CognitiveAssessment = () => {
  const [assessmentData, setAssessmentData] = useState({
    // Example: predefined fields
    name: '',
    age: '',
    responses: []
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssessmentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAssessment = async () => {
    setErrorMessage(null); // Clear any previous error messages
    try {
      const response = await axios.post('http://localhost:5000/cognitive-profile', assessmentData);
      setResult(response.data); // Assuming the response contains assessment results
    } catch (error) {
      console.error('Assessment failed', error);
      setErrorMessage('Failed to complete assessment. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-blue-100">
      <h2>Cognitive Profile Assessment</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={assessmentData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={assessmentData.age}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button onClick={handleAssessment}>Assess Profile</button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {result && <p className="text-green-500">Assessment Complete: {JSON.stringify(result)}</p>}
    </div>
  );
};

export default CognitiveAssessment;
