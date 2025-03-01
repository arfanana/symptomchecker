import React, { useState } from 'react';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Common symptoms list for auto-suggestions
  const commonSymptoms = [
    'Fever', 'Cough', 'Headache', 'Fatigue', 'Sore throat', 
    'Shortness of breath', 'Muscle pain', 'Nausea', 'Vomiting',
    'Diarrhea', 'Chest pain', 'Abdominal pain', 'Rash', 'Chills',
    'Joint pain', 'Loss of appetite', 'Dizziness', 'Runny nose',
    'Sneezing', 'Congestion', 'Watery eyes', 'Itchy eyes', 
    'Loss of taste or smell', 'Visual disturbances', 'Sensitivity to light',
    'Sensitivity to sound', 'Heartburn', 'Regurgitation', 
    'Difficulty swallowing', 'Excessive worry', 'Restlessness',
    'Sleep problems', 'Irritability'
  ];

  const filteredSymptoms = commonSymptoms.filter(
    symptom => 
      symptom.toLowerCase().includes(inputValue.toLowerCase()) && 
      !symptoms.includes(symptom)
  );

  const addSymptom = (symptom) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setInputValue('');
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const analyzeSymptoms = async () => {
    if (symptoms.length === 0) {
      setError('Please enter at least one symptom');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Call the backend API
      const response = await fetch('http://localhost:5000/api/analyze-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to analyze symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">Symptom Checker</h1>
      
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-2">
          Enter your symptoms to check possible conditions. This tool provides general information only and should not replace professional medical advice.
        </p>
      </div>
      
      <div className="mb-6">
        <label className="block mb-2 font-medium">Enter your symptoms:</label>
        
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a symptom..."
          />
          <button 
            onClick={() => addSymptom(inputValue)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        
        {inputValue && filteredSymptoms.length > 0 && (
          <div className="bg-white border rounded shadow-md p-2 mt-1">
            {filteredSymptoms.slice(0, 5).map(symptom => (
              <div 
                key={symptom} 
                className="p-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => addSymptom(symptom)}
              >
                {symptom}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {symptoms.length > 0 && (
        <div className="mb-6">
          <p className="mb-2 font-medium">Your symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {symptoms.map(symptom => (
              <div 
                key={symptom} 
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
              >
                {symptom}
                <button 
                  onClick={() => removeSymptom(symptom)}
                  className="ml-2 text-blue-800 hover:text-blue-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      <button 
        onClick={analyzeSymptoms} 
        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium mb-6"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Symptoms'}
      </button>
      
      {results && results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Possible Conditions</h2>
          
          {results.map((result, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold">{result.disease}</h3>
                <div className={`text-white font-bold px-3 py-1 rounded-lg ${
                  result.probability > 70 ? 'bg-red-600' : 
                  result.probability > 40 ? 'bg-orange-500' : 'bg-yellow-500'
                }`}>
                  {result.probability}% match
                </div>
              </div>
              
              <p className="mb-2 text-gray-700">
                Matching symptoms: {result.matchingSymptoms.join(', ')} 
                ({result.matchingSymptoms.length} of {result.totalDiseaseSymptoms} typical symptoms)
              </p>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Home remedies:</h4>
                <ul className="list-disc pl-5">
                  {result.remedies.map((remedy, i) => (
                    <li key={i} className="mb-1 text-gray-700">{remedy}</li>
                  ))}
                </ul>
              </div>
              
              {result.severityLevel === 'high' || result.probability > 50 ? (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">
                    {result.severityLevel === 'high' 
                      ? 'This condition is classified as high severity. Please consult a healthcare professional.' 
                      : 'Your symptom match is over 50%. We recommend consulting a healthcare professional for proper diagnosis and treatment.'}
                  </p>
                </div>
              ) : null}
              
              {result.consultDoctorIf && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Consult a doctor if:</h4>
                  <ul className="list-disc pl-5">
                    {result.consultDoctorIf.map((reason, i) => (
                      <li key={i} className="mb-1 text-gray-700">{reason}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-blue-800 text-sm">
              <strong>Disclaimer:</strong> This tool provides general information only and is not a substitute for professional medical advice. 
              Always consult with a qualified healthcare provider for proper diagnosis and treatment of medical conditions.
            </p>
          </div>
        </div>
      )}
      
      {results && results.length === 0 && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg text-center">
          <p>No matching conditions found for your symptoms. If you're feeling unwell, please consult a healthcare professional.</p>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
