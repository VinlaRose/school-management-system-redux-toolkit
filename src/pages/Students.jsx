import { useDispatch, useSelector } from "react-redux"
import AddStudentInput from "../components/AddStudent";



import FilterSortStudents from "../components/FilterSortStudents";
import { Link } from "react-router-dom";
import { deleteStudent } from "../features/students/studentSlice";

export const Student  = () => {

    const students = useSelector(state => state.students.students);
   
    console.log(students);
    
    const onUpdate = () => {
        
    }
    const onDelete = (id) => {
        console.log(id)
        dispatch(deleteStudent(id))
    }



    const dispatch = useDispatch();
    
    const filterGender = useSelector((state) => state.filterGender);
    const sortCriteria = useSelector((state) => state.sortCriteria);
    
    const applyFilter = (gender) => {
      // dispatch(filterStudents(gender));
    };
    
    const applySort = (criteria) => {
      // dispatch(sortStudents(criteria));
    };
    
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
        {students?.map((student) => (
          <tr key={student._id}>
            <td><Link to={`/students/${student._id}`}>{student.name}</Link></td>
            <td>{student.age}</td>
            <td>{student.attendance}</td>
            <td>{student.class}</td>
            <td>{student.gender}</td>
            <td>{student.marks}</td>
            <td>
              <button onClick={() => onUpdate(student)}>Update</button>
              <button onClick={() => onDelete(student._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
    )
}