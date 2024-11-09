import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import IPRForm from "./components/IPRPage1"; // Import the IPRForm component
import IPRPage2 from "./components/IPRPage2"; // Import the second page component (create this file)
import IPRPage3 from "./components/IPRPage3";
import IPRPage4 from "./components/IPRPage4";
import IPRPage5 from "./components/IPRPage5";
import "./index.css";
import VisitorsForm from "./src/components/VisitorsForm";

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<VisitorsForm />} />

        {/* <Route path="/IPRPage2" element={<IPRPage2 />} />
                <Route path="/IPRPage3" element={<IPRPage3 />} />
                <Route path="/IPRPage4" element={<IPRPage4 />} />
                <Route path="/IPRPage5" element={<IPRPage5 />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
