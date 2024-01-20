import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '../features/students/studentSlice';

function AddStudentInput() {
    const dispatch = useDispatch()
  const [studentData, setStudentData] = useState({
    name: '',
    age: '',
    class: '',
    marks: '',
    attendance: '',
    gender: '',
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(studentData)
   dispatch( addStudent(studentData) )
    setStudentData({
      name: '',
      age: '',
      class: '',
      marks: '',
      attendance: '',
      gender: '',
    });
  };

  return (
    <form className="add-student-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={studentData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={studentData.age}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="class"
          placeholder="Class"
          value={studentData.class}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="marks"
          placeholder="Marks"
          value={studentData.marks}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="attendance"
          placeholder="Attendance"
          value={studentData.attendance}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={studentData.gender}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="submit-button">
        Add Student
      </button>
    </form>
  );
}

export default AddStudentInput;
