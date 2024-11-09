import React from "react";
import { Link } from 'react-router-dom';

const AfterRegistration = () => {
  return (
    <div className="font-[sans-serif] min-h-screen flex items-center justify-center bg-gray-50 relative">
      {/* Back to Login Button with Arrow Icon */}
      <Link
        to="/login"
        className="absolute top-4 left-4 flex items-center font-medium text-gray-600 hover:underline text-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Login
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-16 max-w-3xl shadow-lg mx-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Registration Successful</h2>
        <div className="flex justify-center mb-12">
          <div className="w-1/3 h-auto flex items-center justify-center">
            <img
              src="https://www.sonata-software.com/sites/default/files/inline-images/message-icon.svg"
              alt="MailSent"
            />
          </div>
        </div>
        <p className="text-gray-600">
          Thank you for registering. We have received your details successfully.
        </p>
        <p className="text-gray-600 mb-6">
          You will receive an email with your login credentials. Please check your inbox for updates.
        </p>
      </div>
    </div>
  );
};

export default AfterRegistration;
