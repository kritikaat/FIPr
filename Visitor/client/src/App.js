import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VisitorsForm from './components/VisitorsForm.js';
// import IPRPage1 from './components/IPRPage1.js';
// import IPRPage2 from './components/IPRPage2.js';
// import IPRPage3 from './components/IPRPage3.js';
// import IPRPage4 from './components/IPRPage4.js';
// import IPRPage5 from './components/IPRPage5.js';
import './index.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VisitorsForm />} /> {/* Use the combined form */}
                {/* <Route path='/ipr1' element={<IPRPage1 />} />
                <Route path='/ipr2' element={<IPRPage2 />} />
                <Route path='/ipr3' element={<IPRPage3 />} />
                <Route path='/ipr4' element={<IPRPage4 />} />
                <Route path='/ipr5' element={<IPRPage5 />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
