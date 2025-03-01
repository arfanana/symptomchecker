// diseaseDatabase.js

/**
 * Disease Database Model
 * 
 * This model contains information about various diseases, their symptoms,
 * probabilities, and recommended remedies. It can be expanded with additional
 * diseases and more detailed information as needed.
 */

const diseaseDatabase = {
  // Respiratory Conditions
  'Common Cold': {
    category: 'Respiratory',
    symptoms: [
      'Cough', 'Runny nose', 'Sore throat', 'Fever', 'Headache', 
      'Sneezing', 'Congestion', 'Mild fatigue'
    ],
    baseProbability: 0.35,
    riskFactors: ['Recent exposure to infected people', 'Seasonal changes', 'Weakened immune system'],
    remedies: [
      'Rest and stay hydrated',
      'Take over-the-counter pain relievers',
      'Use a humidifier or take hot showers to ease congestion',
      'Gargle with salt water for sore throat relief',
      'Drink warm fluids like tea with honey'
    ],
    severityLevel: 'low',
    consultDoctorIf: [
      'Symptoms last more than 10 days',
      'Fever above 101.3°F (38.5°C)',
      'Severe headache or sinus pain'
    ]
  },
  'Influenza (Flu)': {
    category: 'Respiratory',
    symptoms: [
      'Fever', 'Cough', 'Fatigue', 'Muscle pain', 'Headache', 
      'Chills', 'Sore throat', 'Runny or stuffy nose'
    ],
    baseProbability: 0.25,
    riskFactors: ['Flu season', 'Exposure to infected individuals', 'Not vaccinated', 'Age (very young or elderly)'],
    remedies: [
      'Rest and stay hydrated',
      'Take over-the-counter fever reducers if needed',
      'Use a humidifier to ease cough and congestion',
      'Consider antiviral medications within 48 hours of symptoms (consult doctor)'
    ],
    severityLevel: 'moderate',
    consultDoctorIf: [
      'Difficulty breathing',
      'Persistent chest pain',
      'Sudden dizziness or confusion',
      'Severe vomiting',
      'Symptoms improve then return with worse fever and cough'
    ]
  },
  'COVID-19': {
    category: 'Respiratory',
    symptoms: [
      'Fever', 'Cough', 'Shortness of breath', 'Fatigue', 
      'Loss of taste or smell', 'Sore throat', 'Body aches',
      'Headache', 'Congestion', 'Nausea', 'Diarrhea'
    ],
    baseProbability: 0.20,
    riskFactors: ['Exposure to infected individuals', 'Crowded indoor settings', 'Not vaccinated', 'Underlying health conditions'],
    remedies: [
      'Isolate to prevent spreading',
      'Rest and stay hydrated',
      'Monitor your oxygen levels with a pulse oximeter',
      'Take over-the-counter fever reducers if needed',
      'Use breathing exercises to help with respiratory symptoms'
    ],
    severityLevel: 'high',
    consultDoctorIf: [
      'Difficulty breathing',
      'Persistent chest pain or pressure',
      'Confusion or inability to wake/stay awake',
      'Bluish lips or face',
      'Oxygen saturation below 94%'
    ]
  },
  
  // Allergic Conditions
  'Allergic Rhinitis': {
    category: 'Allergic',
    symptoms: [
      'Runny nose', 'Sneezing', 'Itchy eyes', 'Congestion', 
      'Watery eyes', 'Itchy nose or throat', 'Postnasal drip'
    ],
    baseProbability: 0.15,
    riskFactors: ['Seasonal allergens', 'Pet dander', 'Dust mites', 'Family history of allergies'],
    remedies: [
      'Avoid known allergens',
      'Use over-the-counter antihistamines',
      'Try nasal irrigation with saline solution',
      'Use air purifiers in your home',
      'Keep windows closed during high pollen seasons'
    ],
    severityLevel: 'low',
    consultDoctorIf: [
      'Symptoms significantly impact quality of life',
      'Over-the-counter medications don\'t provide relief',
      'Symptoms are accompanied by asthma',
      'Chronic sinusitis develops'
    ]
  },
  
  // Neurological Conditions
  'Migraine': {
    category: 'Neurological',
    symptoms: [
      'Headache', 'Nausea', 'Sensitivity to light', 'Sensitivity to sound', 
      'Visual disturbances', 'Dizziness', 'Throbbing pain on one side of head'
    ],
    baseProbability: 0.10,
    riskFactors: ['Family history', 'Hormonal changes', 'Stress', 'Certain foods or additives', 'Alcohol'],
    remedies: [
      'Rest in a dark, quiet room',
      'Apply cold compresses to your head',
      'Practice relaxation techniques',
      'Stay hydrated',
      'Maintain a regular sleep schedule'
    ],
    severityLevel: 'moderate',
    consultDoctorIf: [
      'Headache is severe or abrupt onset',
      'Headache accompanied by fever, stiff neck, confusion',
      'Headache after head injury',
      'Experiencing the "worst headache of your life"',
      'Headache with weakness or numbness'
    ]
  },
  
  // Gastrointestinal Conditions
  'Gastroenteritis': {
    category: 'Gastrointestinal',
    symptoms: [
      'Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain', 
      'Fever', 'Headache', 'Muscle aches', 'Loss of appetite'
    ],
    baseProbability: 0.18,
    riskFactors: ['Contaminated food or water', 'Contact with infected person', 'Poor hand hygiene'],
    remedies: [
      'Stay hydrated with clear fluids',
      'Eat bland, easy-to-digest foods (BRAT diet)',
      'Get plenty of rest',
      'Avoid dairy, caffeine, and fatty foods',
      'Try small, frequent sips of water or electrolyte solutions'
    ],
    severityLevel: 'moderate',
    consultDoctorIf: [
      'Severe abdominal pain',
      'High fever (above 102°F or 39°C)',
      'Bloody stools',
      'Signs of dehydration (excessive thirst, dry mouth, little or no urination)',
      'Symptoms lasting more than 3 days'
    ]
  },
  'Acid Reflux (GERD)': {
    category: 'Gastrointestinal',
    symptoms: [
      'Heartburn', 'Chest pain', 'Regurgitation', 'Difficulty swallowing', 
      'Sore throat', 'Cough', 'Feeling of lump in throat'
    ],
    baseProbability: 0.15,
    riskFactors: ['Obesity', 'Smoking', 'Pregnancy', 'Hiatal hernia', 'Certain medications'],
    remedies: [
      'Avoid trigger foods (spicy, fatty, citrus)',
      'Eat smaller meals',
      'Don\'t lie down right after eating',
      'Elevate head of bed',
      'Avoid eating at least 3 hours before bedtime'
    ],
    severityLevel: 'low',
    consultDoctorIf: [
      'Symptoms occur more than twice a week',
      'Medications don\'t provide relief',
      'Difficulty swallowing',
      'Nausea or vomiting',
      'Weight loss'
    ]
  },
  
  // Cardiovascular Conditions
  'Hypertension': {
    category: 'Cardiovascular',
    symptoms: [
      'Headache', 'Shortness of breath', 'Dizziness', 
      'Chest pain', 'Visual changes', 'Fatigue',
      'Most often asymptomatic'
    ],
    baseProbability: 0.22,
    riskFactors: ['Family history', 'Age', 'Obesity', 'High sodium diet', 'Sedentary lifestyle', 'Stress'],
    remedies: [
      'Reduce sodium intake',
      'Exercise regularly',
      'Manage stress with meditation or deep breathing',
      'Maintain a healthy weight',
      'Monitor blood pressure regularly'
    ],
    severityLevel: 'high',
    consultDoctorIf: [
      'Blood pressure consistently above 130/80 mmHg',
      'Severe headache',
      'Vision problems',
      'Chest pain',
      'Difficulty breathing'
    ]
  },
  
  // Mental Health Conditions
  'Anxiety': {
    category: 'Mental Health',
    symptoms: [
      'Restlessness', 'Fatigue', 'Difficulty concentrating', 
      'Irritability', 'Muscle tension', 'Sleep problems', 
      'Excessive worry', 'Racing heart', 'Sweating'
    ],
    baseProbability: 0.25,
    riskFactors: ['Stress', 'Traumatic events', 'Family history', 'Health problems', 'Substance use'],
    remedies: [
      'Practice deep breathing exercises',
      'Regular physical activity',
      'Limit caffeine and alcohol',
      'Practice mindfulness meditation',
      'Maintain a regular sleep schedule'
    ],
    severityLevel: 'moderate',
    consultDoctorIf: [
      'Anxiety interferes with daily activities',
      'You have suicidal thoughts',
      'You're using alcohol or drugs to cope',
      'You have other mental health concerns',
      'You have a physical health condition that worries you'
    ]
  }
};

module.exports = diseaseDatabase;
