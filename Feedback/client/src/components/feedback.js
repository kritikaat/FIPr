import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from "react-toastify";
import logoImage from './logo.png'; 
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS


const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        institutionName: '',
        website: '',
        visitDate: '',
        staffName: '',
        staffEmail: '',
        staffMobile: '',
        totalStudents: '',
        accompanyingStaff: '',
        sources: [],
        campuses: [],
        ratings: {
            iprRating: '',
            fciptRating: '',
            knowledge: '',
            explanationsIPR: '',
            explanationsFCIPT: '',
            knowledgeBefore: '',
            knowledgeAfter: '',
            technicalContents: '',
            easeOfUnderstanding: ''
        },
        best: '',
        worst: '',
        suggestions: '',
        comments: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked
                    ? [...(prevData[name] || []), value] // Ensure it's an array
                    : prevData[name].filter((item) => item !== value)
            }));
        } else if (name in formData.ratings) {
            setFormData((prevData) => ({
                ...prevData,
                ratings: { ...prevData.ratings, [name]: value }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // First, submit the feedback
            const feedbackResponse = await fetch('http://localhost:3000/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    institutionName: formData.institutionName,
                    website: formData.website,
                    visitDate: new Date(formData.visitDate).toISOString(),
                    staffName: formData.staffName,
                    staffEmail: formData.staffEmail,
                    staffMobile: formData.staffMobile,
                    totalStudents: parseInt(formData.totalStudents),
                    accompanyingStaff: parseInt(formData.accompanyingStaff),
                    sources: formData.sources,
                    campuses: formData.campuses,
                    best: formData.best,
                    worst: formData.worst,
                    suggestions: formData.suggestions,
                    comments: formData.comments
                }),
            });

            if (!feedbackResponse.ok) {
                throw new Error(`Feedback submission failed: ${feedbackResponse.statusText}`);
            }

            const feedbackResult = await feedbackResponse.json();
            console.log('Feedback submitted successfully:', feedbackResult);

            // Then, submit the ratings
            const ratingsResponse = await fetch('http://localhost:3000/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    feedbackFormId: feedbackResult.id, // Assuming the feedback API returns the created feedback's ID
                    iprRating: parseInt(formData.ratings.iprRating),
                    fciptRating: parseInt(formData.ratings.fciptRating),
                    knowledge: parseInt(formData.ratings.knowledge),
                    explanationsIPR: parseInt(formData.ratings.explanationsIPR),
                    explanationsFCIPT: parseInt(formData.ratings.explanationsFCIPT),
                    knowledgeBefore: parseInt(formData.ratings.knowledgeBefore),
                    knowledgeAfter: parseInt(formData.ratings.knowledgeAfter),
                    technicalContents: parseInt(formData.ratings.technicalContents),
                    easeOfUnderstanding: parseInt(formData.ratings.easeOfUnderstanding)
                }),
            });

            if (!ratingsResponse.ok) {
                throw new Error(`Ratings submission failed: ${ratingsResponse.statusText}`);
            }

            const ratingsResult = await ratingsResponse.json();
            console.log('Ratings submitted successfully:', ratingsResult);
            // Show a success toast
            toast.success('Feedback and ratings submitted successfully!', { autoClose: 3000 });

            setFormData({
                institutionName: '',
                website: '',
                visitDate: '',
                staffName: '',
                staffEmail: '',
                staffMobile: '',
                totalStudents: '',
                accompanyingStaff: '',
                sources: [],
                campuses: [],
                ratings: {
                    iprRating: '',
                    fciptRating: '',
                    knowledge: '',
                    explanationsIPR: '',
                    explanationsFCIPT: '',
                    knowledgeBefore: '',
                    knowledgeAfter: '',
                    technicalContents: '',
                    easeOfUnderstanding: ''
                },
                best: '',
                worst: '',
                suggestions: '',
                comments: ''
            });
        } catch (error) {
            console.error('Error submitting feedback and ratings:', error);
            alert(`An error occurred: ${error.message}`);
        }
    }

    return (
        
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto p-5 bg-blue-50 shadow-lg rounded-lg min-h-screen overflow-y-auto"
        >
            <motion.div 
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="form-section mb-5 bg-white text-blue-900 p-8 rounded-lg shadow-md"
            >
              <ToastContainer />


              <header className="bg-gradient-to-r from-white to-gray-50 border-b border-orange-200 shadow-md py-4 mb-4">
  <div className="container mx-auto flex items-center justify-between px-6 md:px-0">
    <div className="flex items-center space-x-4 group">
      <div className="w-14 h-14 flex items-center justify-center transform transition-transform group-hover:scale-105">
        <img src={logoImage} alt="IPR" className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col items-start space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-500 tracking-wide">
          प्लाज्मा अनुसंधान संस्थान
        </h1>
        <h2 className="text-lg md:text-xl font-semibold text-blue-600 tracking-wide">
          Institute for Plasma Research
        </h2>
      </div>
    </div>
    {/* Feedback Form Title */}
    <div className="ml-auto text-right">
      <h2 className="text-xl md:text-2xl font-bold text-blue-600 ">
        FEEDBACK FORM
      </h2>
    </div>
  </div>
</header>

<form onSubmit={handleSubmit} className="space-y-6 px-6 py-8bg-gradient-to-r from-white to-gray-50 shadow-lg rounded-lg mx-auto mt-2 mb-2">
    {/* Input Fields */}
    {[
        { name: "institutionName", label: "Name of the visiting Institution", type: "text" },
        { name: "website", label: "Website of the institution", type: "text" },
        { name: "visitDate", label: "Date of visit", type: "date" },
        { name: "staffName", label: "Name of the in-charge staff member", type: "text" },
        { name: "staffEmail", label: "Email of in-charge staff member", type: "email" },
        { name: "staffMobile", label: "Mobile number of in-charge staff member", type: "tel" },
        { name: "totalStudents", label: "Total number of students", type: "number" },
        { name: "accompanyingStaff", label: "Number of accompanying staff members", type: "number" },
    ].map((field) => (
        <motion.div key={field.name} whileHover={{ scale: 1.02 }} className="form-field">
            <label htmlFor={field.name} className="block mb-1 font-semibold text-gray-700">
                {field.label} <span className="text-red-500">*</span>
            </label>
            <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
        </motion.div>
    ))}

    {/* Sources */}
    <motion.div whileHover={{ scale: 1.02 }} className="form-field">
        <label className="block mb-1 font-semibold text-gray-700">
            How did you come to know about IPR? <span className="text-red-500">*</span>
        </label>
        {["Internet", "Social Media", "Friends", "Other"].map((source) => (
            <div key={source} className="flex items-center mb-2">
                <input
                    type="checkbox"
                    id={source.toLowerCase()}
                    name="sources"
                    value={source}
                    checked={formData.sources.includes(source)}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={source.toLowerCase()} className="ml-2 text-gray-800">{source}</label>
            </div>
        ))}
    </motion.div>

    {/* Campuses */}
    <motion.div whileHover={{ scale: 1.02 }} className="form-field">
        <label className="block mb-1 font-semibold text-gray-700">
            IPR Campuses visited during the trip? <span className="text-red-500">*</span>
        </label>
        {["IPR Main", "FCIPT"].map((campus) => (
            <div key={campus} className="flex items-center mb-2">
                <input
                    type="checkbox"
                    id={campus.toLowerCase()}
                    name="campuses"
                    value={campus}
                    checked={formData.campuses.includes(campus)}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={campus.toLowerCase()} className="ml-2 text-gray-800">{campus}</label>
            </div>
        ))}
    </motion.div>

    {/* Ratings */}
    {[
        { field: 'iprRating', label: 'How do you rate IPR?' },
        { field: 'fciptRating', label: 'FCIPT Rating' },
        { field: 'knowledge', label: 'Overall Knowledge' },
        { field: 'explanationsIPR', label: 'Explanations for IPR' },
        { field: 'explanationsFCIPT', label: 'Explanations for FCIPT' },
        { field: 'knowledgeBefore', label: 'Knowledge Before' },
        { field: 'knowledgeAfter', label: 'Knowledge After' },
        { field: 'technicalContents', label: 'Technical Contents' },
        { field: 'easeOfUnderstanding', label: 'Ease of Understanding' }
    ].map((rating, index) => (
        <motion.div key={index} whileHover={{ scale: 1.02 }} className="rating-group mb-6">
            <label className="rating-label block mb-1 font-semibold text-gray-700">
                {rating.label} <span className="text-red-500">*</span>
            </label>
            <div className="rating-options flex items-center space-x-4">
                {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name={rating.field}
                            value={value}
                            checked={formData.ratings[rating.field] === value.toString()}
                            onChange={handleChange}
                            className="sr-only"
                            required
                        />
                        <span className={`px-3 py-2 rounded-full transition-colors duration-150 ease-in-out ${
                            formData.ratings[rating.field] === value.toString()
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                            {value}
                        </span>
                    </label>
                ))}
            </div>
        </motion.div>
    ))}

    {/* Comments */}
    {["best", "worst", "suggestions", "comments"].map((field) => (
        <motion.div key={field} whileHover={{ scale: 1.02 }} className="form-field">
            <label htmlFor={field} className="block mb-1 font-semibold text-gray-700">
                {field === "best" ? "What did you like best about the visit?" :
                 field === "worst" ? "What did you like the least about the visit?" :
                 field === "suggestions" ? "Any suggestions for improvement?" :
                 "Any additional comments?"}
            </label>
            <textarea
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                rows="3"
            />
        </motion.div>
    ))}

    {/* Submit Button */}
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
    >
        Submit Feedback
    </motion.button>
</form>

            </motion.div>
        </motion.div>
    );
};

export default FeedbackForm;