import React from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Student } from './pages/Students';
import { Teachers } from './pages/Teachers';
import { IndividualTeacher } from './pages/IndividualTeacher';
import { IndividualStudent } from './pages/IndividualStudent';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="App">

<nav className="navbar">
      <h3>School Management System</h3>
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/students" className="nav-link">Students</Link>
      <Link to="/teachers" className="nav-link">Teachers</Link>
    </nav>

    


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<Student />} />
      <Route path="/teachers" element={<Teachers />} />

      <Route path="/students/:studentId" element={<IndividualStudent />} />
<Route path="/teachers/:teacherId" element={<IndividualTeacher />} />

    </Routes>
    
    </div>
  );
}

export default App;
