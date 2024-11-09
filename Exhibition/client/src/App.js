import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IPRExForm from './components/iprexhibition'; // Import the IPRForm component
import SubmitPage from './components/submitpage'; // Import the second page component (create this file)
import './index.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IPRExForm />} /> {/* Home route with IPRForm */}
                <Route path="/Submit" element={<SubmitPage />} /> {/* Second page route */}
            </Routes>
        </Router>
    );
};

export default App;
