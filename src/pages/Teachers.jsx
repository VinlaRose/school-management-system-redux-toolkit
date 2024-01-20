import { useDispatch, useSelector } from "react-redux"
import AddTeacherForm from "../components/AddTeacher"

import { Link } from "react-router-dom";
import { deleteTeacher } from "../features/teachers/teacherSlice";

export const Teachers = () => {
 const teachers = useSelector((state) => state.teachers.teachers)
console.log(teachers);
const dispatch = useDispatch()
        
const onDeleteTeacherBtn = (id) => {
          console.log(id);
          dispatch(deleteTeacher(id))

        }
    return (
        <div>
            <h1>Teachers</h1>
            <AddTeacherForm/>
            <table className="teacher-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Subject</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {teachers?.map((teacher) => (
          <tr key={teacher._id} >
            <td >
            <Link to={`/teachers/${teacher._id}`}>{teacher.name}</Link>

              </td>
            <td>{teacher.phone}</td>
            <td>{teacher.subject}</td>
            <td>
              <button className="update-button" >Update</button>
              <button className="delete-button" onClick={() => onDeleteTeacherBtn(teacher._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
    )
}