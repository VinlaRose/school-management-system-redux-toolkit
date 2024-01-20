import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTeacher } from '../features/teachers/teacherSlice';

function AddTeacherForm() {
  const dispatch = useDispatch();
  const [teacherData, setTeacherData] = useState({
    name: '',
    phone: '',
    subject: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTeacher(teacherData)); 
   
    setTeacherData({
      name: '',
      phone: '',
      subject: '',
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  return (
    <form className="teacher-form" onSubmit={handleSubmit}>
    <input
      className="teacher-input"
      type="text"
      name="name"
      value={teacherData.name}
      onChange={handleChange}
      placeholder="Name"
    />
    <input
      className="teacher-input"
      type="text"
      name="phone"
      value={teacherData.phone}
      onChange={handleChange}
      placeholder="Phone"
    />
    <input
      className="teacher-input"
      type="text"
      name="subject"
      value={teacherData.subject}
      onChange={handleChange}
      placeholder="Subject"
    />
    <button className="teacher-button" type="submit">Add Teacher</button>
  </form>
  );
}

export default AddTeacherForm;
