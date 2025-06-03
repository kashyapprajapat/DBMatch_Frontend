// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const initialForm = {
//   productCategory: "",
//   dataSize: "",
//   initialUsers: "",
//   readWritePattern: "",
//   schemaChangeFrequency: [],
//   dataAccuracyImportance: 5,
//   scalabilityImportance: 5,
//   budget: "",
//   userGeography: [],
//   latencyImportance: 5,
// };

// const questions = [
//   "What category best describes your product?",
//   "How much data will your product store in the first year?",
//   "How many users do you expect initially?",
//   "Will your product mostly handle:",
//   "How often will your data structure change?",
//   "How important is data accuracy and consistency?",
//   "How important is scalability to handle rapid growth?",
//   "What is your budget for database infrastructure?",
//   "Will your product serve users globally or locally?",
//   "How important is fast response time (latency)?",
// ];

// export default function DBMatchSurvey() {
//   const [step, setStep] = useState(0);
//   const [form, setForm] = useState(initialForm);
//   const [isLoading, setIsLoading] = useState(false);
//   const [recommendation, setRecommendation] = useState(null);
//   const [showOkButton, setShowOkButton] = useState(false);
//   const navigate = useNavigate();

//   const handleNext = () => {
//     if (!validateCurrentStep()) return;
//     if (step < questions.length - 1) setStep((prev) => prev + 1);
//   };

//   const handleFinish = async () => {
//     if (!validateCurrentStep()) return;
    
//     setIsLoading(true);
    
//     try {
//       // Prepare data for API
//       const apiData = {
//         productCategory: form.productCategory,
//         dataSize: form.dataSize,
//         initialUsers: form.initialUsers,
//         readWritePattern: form.readWritePattern,
//         schemaChangeFrequency: Array.isArray(form.schemaChangeFrequency) ? form.schemaChangeFrequency.join(", ") : form.schemaChangeFrequency,
//         dataAccuracyImportance: form.dataAccuracyImportance,
//         scalabilityImportance: form.scalabilityImportance,
//         budget: form.budget,
//         userGeography: Array.isArray(form.userGeography) ? form.userGeography.join(", ") : form.userGeography,
//         latencyImportance: form.latencyImportance,
//       };

//       const response = await fetch('https://dbmatch-backend.onrender.com/recommend-database', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(apiData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to get recommendation');
//       }

//       const result = await response.json();
//       setRecommendation(result.recommendation);
      
//       // Show OK button after 2 seconds
//       setTimeout(() => {
//         setShowOkButton(true);
//       }, 2000);
      
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Sorry, there was an error getting your recommendation. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const validateCurrentStep = () => {
//     const requiredFields = [
//       ["productCategory"],
//       ["dataSize"],
//       ["initialUsers"],
//       ["readWritePattern"],
//       ["schemaChangeFrequency"],
//       [],
//       [],
//       ["budget"],
//       ["userGeography"],
//       [],
//     ];
//     const field = requiredFields[step];
//     return field.every((f) =>
//       Array.isArray(form[f]) ? form[f].length > 0 : form[f] !== ""
//     );
//   };

//   const handleChange = (key, value) => {
//     setForm({ ...form, [key]: value });
//   };

//   const extractDatabaseName = (recommendation) => {
//     const match = recommendation.match(/\*\*Recommended Database:\*\*\s*([^*\n]+)/);
//     return match ? match[1].trim() : "Database Recommendation";
//   };

//   const formatSummary = (recommendation) => {
//     const summaryMatch = recommendation.match(/\*\*Summary:\*\*\s*(.*)/s);
//     return summaryMatch ? summaryMatch[1].trim() : recommendation;
//   };

//   const handleGoHome = () => {
//     navigate('/');
//   };

//   const renderQuestion = () => {
//     switch (step) {
//       case 0:
//         return (
//           <div className="space-y-3">
//             <select
//               required
//               className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-700"
//               value={form.productCategory}
//               onChange={(e) => handleChange("productCategory", e.target.value)}
//             >
//               <option value="">Select your product category...</option>
//               {["E-commerce","Food Delivery","Social Networking","Content Management / Blogging","Finance / Banking","Healthcare","Gaming","Education / E-learning","Others (please specify)"].map(opt => (
//                 <option key={opt} value={opt}>{opt}</option>
//               ))}
//             </select>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="space-y-3">
//             {["Small (up to 1 GB)", "Medium (1 GB to 100 GB)", "Large (100 GB or more)"]
//               .map((opt) => (
//                 <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
//                   <input
//                     type="radio"
//                     name="dataSize"
//                     value={opt}
//                     checked={form.dataSize === opt}
//                     onChange={(e) => handleChange("dataSize", e.target.value)}
//                     className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
//                   />
//                   <span className="ml-3 text-gray-700 font-medium">{opt}</span>
//                 </label>
//               ))}
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-3">
//             {["Less than 100", "100 to 1,000", "More than 1,000"].map((opt) => (
//               <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
//                 <input
//                   type="radio"
//                   name="initialUsers"
//                   value={opt}
//                   checked={form.initialUsers === opt}
//                   onChange={(e) => handleChange("initialUsers", e.target.value)}
//                   className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
//                 />
//                 <span className="ml-3 text-gray-700 font-medium">{opt}</span>
//               </label>
//             ))}
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-3">
//             <select
//               className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-700"
//               value={form.readWritePattern}
//               onChange={(e) => handleChange("readWritePattern", e.target.value)}
//             >
//               <option value="">Select usage pattern...</option>
//               {["Mostly reading/viewing information", "Mostly writing/updating information", "Both reading and writing equally"].map((opt) => (
//                 <option key={opt} value={opt}>{opt}</option>
//               ))}
//             </select>
//           </div>
//         );
//       case 4:
//         return (
//           <div className="space-y-3">
//             {["Rarely or never", "Sometimes", "Frequently"].map((opt) => (
//               <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
//                 <input
//                   type="checkbox"
//                   checked={form.schemaChangeFrequency.includes(opt)}
//                   onChange={(e) => {
//                     const updated = e.target.checked
//                       ? [...form.schemaChangeFrequency, opt]
//                       : form.schemaChangeFrequency.filter((v) => v !== opt);
//                     handleChange("schemaChangeFrequency", updated);
//                   }}
//                   className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
//                 />
//                 <span className="ml-3 text-gray-700 font-medium">{opt}</span>
//               </label>
//             ))}
//           </div>
//         );
//       case 5:
//         return (
//           <div className="space-y-4">
//             <div className="flex justify-between text-sm text-gray-600 mb-2">
//               <span>Not Important (1)</span>
//               <span>Very Important (10)</span>
//             </div>
//             <input
//               type="range"
//               min="1"
//               max="10"
//               value={form.dataAccuracyImportance}
//               onChange={(e) => handleChange("dataAccuracyImportance", +e.target.value)}
//               className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//             />
//             <div className="text-center">
//               <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
//                 {form.dataAccuracyImportance}/10
//               </span>
//             </div>
//           </div>
//         );
//       case 6:
//         return (
//           <div className="space-y-4">
//             <div className="flex justify-between text-sm text-gray-600 mb-2">
//               <span>Not Important (1)</span>
//               <span>Very Important (10)</span>
//             </div>
//             <input
//               type="range"
//               min="1"
//               max="10"
//               value={form.scalabilityImportance}
//               onChange={(e) => handleChange("scalabilityImportance", +e.target.value)}
//               className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//             />
//             <div className="text-center">
//               <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
//                 {form.scalabilityImportance}/10
//               </span>
//             </div>
//           </div>
//         );
//       case 7:
//         return (
//           <div className="space-y-3">
//             {["Low (free or minimal cost)", "Medium (some budget for managed services)", "High (open to paid cloud solutions)"].map((opt) => (
//               <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
//                 <input
//                   type="radio"
//                   name="budget"
//                   value={opt}
//                   checked={form.budget === opt}
//                   onChange={(e) => handleChange("budget", e.target.value)}
//                   className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
//                 />
//                 <span className="ml-3 text-gray-700 font-medium">{opt}</span>
//               </label>
//             ))}
//           </div>
//         );
//       case 8:
//         return (
//           <div className="space-y-3">
//             {["Globally (users from multiple countries)", "Locally (users from one country or region)"].map((opt) => (
//               <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
//                 <input
//                   type="checkbox"
//                   checked={form.userGeography.includes(opt)}
//                   onChange={(e) => {
//                     const updated = e.target.checked
//                       ? [...form.userGeography, opt]
//                       : form.userGeography.filter((v) => v !== opt);
//                     handleChange("userGeography", updated);
//                   }}
//                   className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
//                 />
//                 <span className="ml-3 text-gray-700 font-medium">{opt}</span>
//               </label>
//             ))}
//           </div>
//         );
//       case 9:
//         return (
//           <div className="space-y-4">
//             <div className="flex justify-between text-sm text-gray-600 mb-2">
//               <span>Not Important (1)</span>
//               <span>Very Important (10)</span>
//             </div>
//             <input
//               type="range"
//               min="1"
//               max="10"
//               value={form.latencyImportance}
//               onChange={(e) => handleChange("latencyImportance", +e.target.value)}
//               className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//             />
//             <div className="text-center">
//               <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
//                 {form.latencyImportance}/10
//               </span>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const progress = ((step + 1) / questions.length) * 100;

//   // Show loading screen
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyzing Your Requirements</h2>
//           <p className="text-gray-600">Finding the perfect database for your project...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show recommendation result
//   if (recommendation) {
//     const databaseName = extractDatabaseName(recommendation);
//     const summary = formatSummary(recommendation);
    
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
//         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
//           <div className="mb-6">
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">Perfect Match Found!</h2>
//             <div className="text-2xl font-semibold text-blue-600 mb-6">
//               {databaseName}
//             </div>
//           </div>
          
//           <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary:</h3>
//             <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
//               {summary}
//             </div>
//           </div>
          
//           {showOkButton && (
//             <button
//               onClick={handleGoHome}
//               className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               Back to Home
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 min-h-screen">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">
//             Find Your Perfect Database
//           </h1>
//           <p className="text-gray-600">Answer a few questions to get personalized recommendations</p>
//         </div>

//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between text-sm text-gray-600 mb-2">
//             <span>Question {step + 1} of {questions.length}</span>
//             <span>{Math.round(progress)}% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-3">
//             <div 
//               className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Question Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//             {questions[step]}
//           </h2>
//           <div className="mb-8">
//             {renderQuestion()}
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="flex justify-between items-center">
//           {step > 0 ? (
//             <button
//               className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
//               onClick={() => setStep((prev) => prev - 1)}
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               Back
//             </button>
//           ) : (
//             <div></div>
//           )}
          
//           {step < questions.length - 1 ? (
//             <button
//               className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
//                 validateCurrentStep()
//                   ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//               onClick={handleNext}
//               disabled={!validateCurrentStep()}
//             >
//               Next
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           ) : (
//             <button
//               className={`flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
//                 validateCurrentStep()
//                   ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//               onClick={handleFinish}
//               disabled={!validateCurrentStep()}
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//               Get Recommendation
//             </button>
//           )}
//         </div>
        
//         {/* Extra spacing for footer */}
//         <div className="h-20"></div>
//       </div>

//       <style jsx>{`
//         .slider::-webkit-slider-thumb {
//           appearance: none;
//           height: 24px;
//           width: 24px;
//           border-radius: 50%;
//           background: #3B82F6;
//           cursor: pointer;
//           border: 2px solid #ffffff;
//           box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//         }
        
//         .slider::-moz-range-thumb {
//           height: 24px;
//           width: 24px;
//           border-radius: 50%;
//           background: #3B82F6;
//           cursor: pointer;
//           border: 2px solid #ffffff;
//           box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//         }
//       `}</style>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  productCategory: "",
  dataSize: "",
  initialUsers: "",
  readWritePattern: "",
  schemaChangeFrequency: [],
  dataAccuracyImportance: 5,
  scalabilityImportance: 5,
  budget: "",
  userGeography: [],
  latencyImportance: 5,
};

const questions = [
  "What category best describes your product?",
  "How much data will your product store in the first year?",
  "How many users do you expect initially?",
  "Will your product mostly handle:",
  "How often will your data structure change?",
  "How important is data accuracy and consistency?",
  "How important is scalability to handle rapid growth?",
  "What is your budget for database infrastructure?",
  "Will your product serve users globally or locally?",
  "How important is fast response time (latency)?",
];

// Firework component
const Firework = ({ x, y, delay }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i * 30) * (Math.PI / 180),
        velocity: Math.random() * 3 + 2,
        color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)]
      }));
      setParticles(newParticles);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-ping"
          style={{
            backgroundColor: particle.color,
            transform: `translate(${Math.cos(particle.angle) * particle.velocity * 50}px, ${Math.sin(particle.angle) * particle.velocity * 50}px)`,
            animationDuration: '1s',
            animationDelay: '0s'
          }}
        />
      ))}
    </div>
  );
};

// Confetti component
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 3,
    backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98FB98'][Math.floor(Math.random() * 8)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 opacity-80 animate-bounce"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.backgroundColor,
            animationDelay: `${piece.animationDelay}s`,
            animationDuration: '3s',
            transform: 'rotate(45deg)'
          }}
        />
      ))}
    </div>
  );
};

export default function DBMatchSurvey() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [showOkButton, setShowOkButton] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (step < questions.length - 1) setStep((prev) => prev + 1);
  };

  const playSuccessSound = () => {
    // Create audio element and play success sound
    try {
      const audio = new Audio('/successnotification.wav');
      audio.volume = 0.7;
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      console.log('Audio not available:', error);
    }
  };

  const triggerCelebration = () => {
    setShowCelebration(true);
    
    // Play success sound
    playSuccessSound();
    
    // Create fireworks at random positions
    const newFireworks = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * (window.innerHeight * 0.6) + 100,
      delay: i * 200
    }));
    setFireworks(newFireworks);

    // Hide celebration after 4 seconds
    setTimeout(() => {
      setShowCelebration(false);
      setFireworks([]);
    }, 4000);
  };

  const handleFinish = async () => {
    if (!validateCurrentStep()) return;
    
    setIsLoading(true);
    
    try {
      // Prepare data for API
      const apiData = {
        productCategory: form.productCategory,
        dataSize: form.dataSize,
        initialUsers: form.initialUsers,
        readWritePattern: form.readWritePattern,
        schemaChangeFrequency: Array.isArray(form.schemaChangeFrequency) ? form.schemaChangeFrequency.join(", ") : form.schemaChangeFrequency,
        dataAccuracyImportance: form.dataAccuracyImportance,
        scalabilityImportance: form.scalabilityImportance,
        budget: form.budget,
        userGeography: Array.isArray(form.userGeography) ? form.userGeography.join(", ") : form.userGeography,
        latencyImportance: form.latencyImportance,
      };

      const response = await fetch('https://dbmatch-backend.onrender.com/recommend-database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendation');
      }

      const result = await response.json();
      setRecommendation(result.recommendation);
      
      // Trigger celebration immediately when recommendation is set
      setTimeout(() => {
        triggerCelebration();
      }, 500);
      
      // Show OK button after celebration starts
      setTimeout(() => {
        setShowOkButton(true);
      }, 2500);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Sorry, there was an error getting your recommendation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateCurrentStep = () => {
    const requiredFields = [
      ["productCategory"],
      ["dataSize"],
      ["initialUsers"],
      ["readWritePattern"],
      ["schemaChangeFrequency"],
      [],
      [],
      ["budget"],
      ["userGeography"],
      [],
    ];
    const field = requiredFields[step];
    return field.every((f) =>
      Array.isArray(form[f]) ? form[f].length > 0 : form[f] !== ""
    );
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const extractDatabaseName = (recommendation) => {
    const match = recommendation.match(/\*\*Recommended Database:\*\*\s*([^*\n]+)/);
    return match ? match[1].trim() : "Database Recommendation";
  };

  const formatSummary = (recommendation) => {
    const summaryMatch = recommendation.match(/\*\*Summary:\*\*\s*(.*)/s);
    return summaryMatch ? summaryMatch[1].trim() : recommendation;
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const renderQuestion = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-3">
            <select
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-700"
              value={form.productCategory}
              onChange={(e) => handleChange("productCategory", e.target.value)}
            >
              <option value="">Select your product category...</option>
              {["E-commerce","Food Delivery","Social Networking","Content Management / Blogging","Finance / Banking","Healthcare","Gaming","Education / E-learning","Others (please specify)"].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        );
      case 1:
        return (
          <div className="space-y-3">
            {["Small (up to 1 GB)", "Medium (1 GB to 100 GB)", "Large (100 GB or more)"]
              .map((opt) => (
                <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                  <input
                    type="radio"
                    name="dataSize"
                    value={opt}
                    checked={form.dataSize === opt}
                    onChange={(e) => handleChange("dataSize", e.target.value)}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{opt}</span>
                </label>
              ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-3">
            {["Less than 100", "100 to 1,000", "More than 1,000"].map((opt) => (
              <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                <input
                  type="radio"
                  name="initialUsers"
                  value={opt}
                  checked={form.initialUsers === opt}
                  onChange={(e) => handleChange("initialUsers", e.target.value)}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-3 text-gray-700 font-medium">{opt}</span>
              </label>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-3">
            <select
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-700"
              value={form.readWritePattern}
              onChange={(e) => handleChange("readWritePattern", e.target.value)}
            >
              <option value="">Select usage pattern...</option>
              {["Mostly reading/viewing information", "Mostly writing/updating information", "Both reading and writing equally"].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        );
      case 4:
        return (
          <div className="space-y-3">
            {["Rarely or never", "Sometimes", "Frequently"].map((opt) => (
              <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                <input
                  type="checkbox"
                  checked={form.schemaChangeFrequency.includes(opt)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...form.schemaChangeFrequency, opt]
                      : form.schemaChangeFrequency.filter((v) => v !== opt);
                    handleChange("schemaChangeFrequency", updated);
                  }}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-3 text-gray-700 font-medium">{opt}</span>
              </label>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Not Important (1)</span>
              <span>Very Important (10)</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={form.dataAccuracyImportance}
              onChange={(e) => handleChange("dataAccuracyImportance", +e.target.value)}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                {form.dataAccuracyImportance}/10
              </span>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Not Important (1)</span>
              <span>Very Important (10)</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={form.scalabilityImportance}
              onChange={(e) => handleChange("scalabilityImportance", +e.target.value)}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center">
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                {form.scalabilityImportance}/10
              </span>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-3">
            {["Low (free or minimal cost)", "Medium (some budget for managed services)", "High (open to paid cloud solutions)"].map((opt) => (
              <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                <input
                  type="radio"
                  name="budget"
                  value={opt}
                  checked={form.budget === opt}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-3 text-gray-700 font-medium">{opt}</span>
              </label>
            ))}
          </div>
        );
      case 8:
        return (
          <div className="space-y-3">
            {["Globally (users from multiple countries)", "Locally (users from one country or region)"].map((opt) => (
              <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                <input
                  type="checkbox"
                  checked={form.userGeography.includes(opt)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...form.userGeography, opt]
                      : form.userGeography.filter((v) => v !== opt);
                    handleChange("userGeography", updated);
                  }}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-3 text-gray-700 font-medium">{opt}</span>
              </label>
            ))}
          </div>
        );
      case 9:
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Not Important (1)</span>
              <span>Very Important (10)</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={form.latencyImportance}
              onChange={(e) => handleChange("latencyImportance", +e.target.value)}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center">
              <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
                {form.latencyImportance}/10
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progress = ((step + 1) / questions.length) * 100;

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyzing Your Requirements</h2>
          <p className="text-gray-600">Finding the perfect database for your project...</p>
        </div>
      </div>
    );
  }

  // Show recommendation result with celebration
  if (recommendation) {
    const databaseName = extractDatabaseName(recommendation);
    const summary = formatSummary(recommendation);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Celebration Effects */}
        {showCelebration && (
          <>
            <Confetti />
            {fireworks.map((fw) => (
              <Firework key={fw.id} x={fw.x} y={fw.y} delay={fw.delay} />
            ))}
          </>
        )}
        
        <div className={`bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center relative z-10 transform transition-all duration-1000 ${
          showCelebration ? 'scale-105 shadow-2xl' : 'scale-100'
        }`}>
          <div className="mb-6">
            <div className={`w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-1000 ${
              showCelebration ? 'animate-bounce shadow-lg' : ''
            }`}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className={`transform transition-all duration-1000 ${showCelebration ? 'animate-pulse' : ''}`}>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                🎉 Perfect Match Found! 🎉
              </h2>
              <div className="text-3xl font-bold text-blue-600 mb-6 animate-pulse">
                ⭐ {databaseName} ⭐
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-6 text-left border-2 border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📋</span>
              Recommendation Summary:
            </h3>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {summary}
            </div>
          </div>
          
          {showOkButton && (
            <button
              onClick={handleGoHome}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 animate-bounce"
            >
              🏠 Back to Home
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Find Your Perfect Database
          </h1>
          <p className="text-gray-600">Answer a few questions to get personalized recommendations</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {questions[step]}
          </h2>
          <div className="mb-8">
            {renderQuestion()}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {step > 0 ? (
            <button
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {step < questions.length - 1 ? (
            <button
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                validateCurrentStep()
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleNext}
              disabled={!validateCurrentStep()}
            >
              Next
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              className={`flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                validateCurrentStep()
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleFinish}
              disabled={!validateCurrentStep()}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Get Recommendation
            </button>
          )}
        </div>
        
        {/* Extra spacing for footer */}
        <div className="h-20"></div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }
        
        .animate-sparkle {
          animation: sparkle 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}