import React from 'react';

const SuccessMessage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen p-24 px-96 bg-gray-100">
            <div className="bg-white h-full rounded-lg shadow-lg w-full text-center">
                <div className="bg-green-500 h-2 rounded-t-md"></div>

                {/* Success Icon */}
                <div className="flex justify-center mt-32">
                    <div className="w-24 h-24 bg-green-400 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Text content */}
                <div className="mt-8">
                    <h2 className="text-4xl font-bold text-gray-800">THANK YOU</h2>
                    <p className="text-gray-600 mt-6 mb-32 text-xl">Form has been successfully submitted</p>
                </div>
            </div>
        </div>
    );
};

export default SuccessMessage;
