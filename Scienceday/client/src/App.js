import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IPRForm from './components/mainexhibitionpage'; // Import the IPRForm component
import Register from './components/register';
import Login from './components/login';
import Scienceday from './components/IPRScienceVisitform'
import Submit from './components/SubmitPage'
import './index.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} /> {/* Home route with IPRForm */}
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/IPRForm' element={<Scienceday/>}></Route>
                <Route path='/submit' element={<Submit/>}></Route>
            </Routes>
        </Router>
    );
};

export default App;
