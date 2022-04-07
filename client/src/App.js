import React from 'react';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/suggest" element={<Page2 />} />
    </Routes>
  );
}

export default App;
