import { useDispatch, useSelector } from "react-redux"
import AddStudentInput from "../components/AddStudent";



import FilterSortStudents from "../components/FilterSortStudents";
import { Link } from "react-router-dom";
import { deleteStudent, editStudent } from "../features/students/studentSlice";
import { useState } from "react";

export const Student = () => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);

  const [editStudentDetails, setEditStudentDetails] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState('All'); 
  const [sortCriteria, setSortCriteria] = useState(null)


  const onUpdate = (student) => {
      setEditStudentDetails(student);
  }

  const onDelete = (id) => {
      
      dispatch(deleteStudent(id));
  }

  const onSaveUpdate = () => {
      
      console.log(editStudentDetails);
      dispatch(editStudent(editStudentDetails))
      setEditStudentDetails(null);
  }

  const onCancelUpdate = () => {
      
      setEditStudentDetails(null);
  }

  const applyFilter = (gender) => {
    setFilterCriteria(gender); 
  };

  const applySort = (criteria) => {
   setSortCriteria(criteria)
  };

 

  let filteredStudents = students;

  if (filterCriteria === "All") {
    filteredStudents = students;
  }else{
    filteredStudents = filteredStudents.filter(student => student.gender === filterCriteria);
  }

  if(sortCriteria){
    const sortedStudents = [...filteredStudents];
    sortedStudents.sort((a, b) => {
      if (a[sortCriteria] < b[sortCriteria]) return -1;
      if (a[sortCriteria] > b[sortCriteria]) return 1;
      return 0;
    });
    
    filteredStudents = sortedStudents
  }



  

  return (
      <div>
          <h1>Students </h1>
          <AddStudentInput />
          <FilterSortStudents onFilter={applyFilter} onSort={applySort} />
          
          <table>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Attendance</th>
                      <th>Class</th>
                      <th>Gender</th>
                      <th>Marks</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
    {filteredStudents?.map((student) => (
        <tr key={student._id}>
            <td>
                {editStudentDetails && editStudentDetails._id === student._id ? (
                    <input type="text" value={editStudentDetails.name} onChange={(e) => setEditStudentDetails({ ...editStudentDetails, name: e.target.value })} />
                ) : (
                    <Link to={`/students/${student._id}`}>{student.name}</Link>
                )}
            </td>
            
            <td>
                {editStudentDetails && editStudentDetails._id === student._id ? (
                    <input type="number" value={editStudentDetails.age} onChange={(e) => setEditStudentDetails({ ...editStudentDetails, age: e.target.value })} />
                ) : (
                    <p>{student.age}</p>
                )}
            </td>
            <td>
                {editStudentDetails && editStudentDetails._id === student._id ? (
                    <input type="number" value={editStudentDetails.attendance} onChange={(e) => setEditStudentDetails({ ...editStudentDetails, attendance: e.target.value })} />
                ) : (
                    <p>{student.attendance}</p>
                )}
            </td>
            <td>
                {editStudentDetails && editStudentDetails._id === student._id ? (
                    <input type="text" value={editStudentDetails.class} onChange={(e) => setEditStudentDetails({ ...editStudentDetails, class: e.target.value })} />
                ) : (
                    <p>{student.class}</p>
                )}
            </td>
            <td>
                {editStudentDetails && editStudentDetails._id === student._id ? (
                    <input type="text" value={editStudentDetails.gender} onChange={(e) => setEditStudentDetails({ ...editStudentDetails, gender: e.target.value })} />
                ) : (
                    <p>{student.gender}</p>
                )}
            </td>
            <td>
                {editStudentDetails && editStudentDetails._id === student._id ? (
                    <input type="number" value={editStudentDetails.marks} onChange={(e) => setEditStudentDetails({ ...editStudentDetails, marks: e.target.value })} />
                ) : (
                    <p>{student.marks}</p>
                )}
            </td>
            <td>
                {editStudentDetails && editStudentDetails._id === student._id ? (
                    <>
                        <button onClick={onSaveUpdate}>Save</button>
                        <button onClick={onCancelUpdate}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => onUpdate(student)}>Update</button>
                )}
                <button onClick={() => onDelete(student._id)}>Delete</button>
            </td>
        </tr>
    ))}
</tbody>

          </table>
      </div>
  )
}
