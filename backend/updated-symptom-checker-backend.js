// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const diseaseDatabase = require('./disease-database-model');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint for symptom analysis
app.post('/api/analyze-symptoms', (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: 'Valid symptoms array is required' });
    }

    const results = analyzeSymptoms(symptoms);
    return res.json(results);
    
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to analyze symptoms and calculate probabilities
function analyzeSymptoms(userSymptoms) {
  const results = [];

  // Calculate match percentage for each disease
  Object.entries(diseaseDatabase).forEach(([disease, info]) => {
    const matchingSymptoms = userSymptoms.filter(symptom => 
      info.symptoms.includes(symptom)
    );
    
    if (matchingSymptoms.length > 0) {
      // Calculate probability based on matching symptoms
      const matchPercentage = (matchingSymptoms.length / info.symptoms.length) * 100;
      const coveragePercentage = (matchingSymptoms.length / userSymptoms.length) * 100;
      
      // Base probability calculation
      let probability = (matchPercentage * 0.6 + coveragePercentage * 0.4) / 100 * info.baseProbability * 100;
      
      // Additional adjustment for symptom specificity
      if (matchingSymptoms.length >= 3 && matchPercentage > 60) {
        probability *= 1.5;
      }
      
      // Adjust for severity level
      const severityMultiplier = {
        'low': 0.9,
        'moderate': 1.0,
        'high': 1.2
      };
      
      probability *= severityMultiplier[info.severityLevel] || 1.0;
      
      // Cap at 100%
      probability = Math.min(probability, 99);
      probability = Math.round(probability);
      
      // Create result object with comprehensive information
      const result = {
        disease,
        probability,
        matchingSymptoms,
        totalDiseaseSymptoms: info.symptoms.length,
        remedies: info.remedies,
        severityLevel: info.severityLevel
      };
      
      // Add additional information if available
      if (info.consultDoctorIf) {
        result.consultDoctorIf = info.consultDoctorIf;
      }
      
      if (info.riskFactors) {
        result.riskFactors = info.riskFactors;
      }
      
      if (info.category) {
        result.category = info.category;
      }
      
      results.push(result);
    }
  });

  // Sort by probability (highest first)
  return results.sort((a, b) => b.probability - a.probability);
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing purposes
