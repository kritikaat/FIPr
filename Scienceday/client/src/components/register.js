import React, { useState } from "react";
import { Link } from 'react-router-dom'; // Use named import
import { useNavigate } from "react-router-dom";
import logoImage from './logo.png'; 

const Register = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    email: "",
    address: "",
    cityVillage: "",
    pincode: "",
    affiliationNumber: "",
    password: ""
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowError(false);
    try {

      const dataToSubmit = {
        ...formData,
        password: formData.password || `${formData.schoolName}@123` // Default password format
      };

      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setShowError(true); // Show error alert when registration fails
        return; // Exit early if there's an error
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('schoolId', data.school.id);
      navigate('/login');
      
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Error registering school');
      setShowError(true);
    }
  };


  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-16 max-w-7xl w-full">
          {/* Form Section */}
          
          <div className="border border-gray-300 rounded-lg p-6 max-w-full shadow-xl max-md:mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">

            {showError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">{error}</span>
                  <span 
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    onClick={() => setShowError(false)}
                  >
                    <svg 
                      className="fill-current h-6 w-6 text-red-500" 
                      role="button" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                    </svg>
                  </span>
                </div>
              )}

<header className="bg-gradient-to-r from-white to-gray-50 border-b border-orange-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-0">
        <div className="flex items-center space-x-4 group">
          <div className="w-12 h-12 flex items-center justify-center transform transition-transform group-hover:scale-105">
            <img src={logoImage} alt={'IPR'} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-bold text-orange-500 tracking-wide">
              प्लाज्मा अनुसंधान संस्थान
            </h1>
            <h2 className="text-xl font-semibold text-blue-600 tracking-wide">
              Institute for Plasma Research
            </h2>
          </div>
        </div>
      </div>
    </header>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Register your school</h3>
              </div>

              {/* School Name Input */}
              <div>
                <label className="text-gray-800 text-lg block">Name of the School</label>
                <input
                  name="schoolName"
                  type="text"
                  value={formData.schoolName}
                  onChange={handleChange}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-600"
                  placeholder="Enter name of the school"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="text-gray-800 text-lg block">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-600"
                  placeholder="Enter email address"
                />
              </div>

              {/* Address Input */}
              <div>
                <label className="text-gray-800 text-lg block">Address of the School</label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-600"
                  placeholder="Enter address of the school"
                />
              </div>

              {/* City and Pincode in the same row */}
              <div className="flex space-x-4">
                <div className="w-full">
                  <label className="text-gray-800 text-lg block">City/Village</label>
                  <input
                    name="cityVillage"
                    type="text"
                    value={formData.cityVillage}
                    onChange={handleChange}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-600"
                    placeholder="Enter city/village"
                  />
                </div>
                <div className="w-full">
                  <label className="text-gray-800 text-lg block">Pincode</label>
                  <input
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-600"
                    placeholder="Enter pincode"
                  />
                </div>
              </div>

              {/* Affiliation Number Input */}
              <div>
                <label className="text-gray-800 text-lg block">Affiliation Number of the School</label>
                <input
                  name="affiliationNumber"
                  type="text"
                  value={formData.affiliationNumber}
                  onChange={handleChange}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-600"
                  placeholder="Enter affiliation number (Gujarat Board/CBSE/ICSC/other)"
                />
              </div>

              <div>
                <label className="text-gray-800 text-lg block">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-600"
                  placeholder="Enter password (optional)"
                />
              </div>

              {/* Register Button */}
              <div className="!mt-6">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2 font-bold px-4 text-lg tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Register
                </button>
              </div>

              {/* Login Link */}
              <p className="text-sm text-center text-gray-800">
                Already have an account?
                <Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                  Login here
                </Link>
              </p>
            </form>
          </div>

          {/* Image Section */}
          <div className="lg:h-full md:h-full">
            <img
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?t=st=1727685763~exp=1727689363~hmac=365246c3a09dde622ffe5051fdb7cd897364ff52f2d4734ee88422b1f3377563&w=1380"
              className="w-full h-full block object-cover"
              alt="Register"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
