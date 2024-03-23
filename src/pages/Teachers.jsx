import { useDispatch, useSelector } from "react-redux";
import AddTeacherForm from "../components/AddTeacher";
import { Link } from "react-router-dom";
import { deleteTeacher, editTeacher } from "../features/teachers/teacherSlice";
import { useState } from "react";

export const Teachers = () => {
  const teachers = useSelector((state) => state.teachers.teachers);
  const dispatch = useDispatch();

  const [editTeacherDetails, setEditTeacherDetails] = useState(null);

  const onDeleteTeacherBtn = (id) => {
    dispatch(deleteTeacher(id));
  };

  const onUpdateTeacher = (teacher) => {
    setEditTeacherDetails(teacher);
  };

  const onSaveUpdate = () => {
    dispatch(editTeacher(editTeacherDetails));
    setEditTeacherDetails(null);
  };

  const onCancelUpdate = () => {
    setEditTeacherDetails(null);
  };

  return (
    <div>
      <h1>Teachers</h1>
      <AddTeacherForm />
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
            <tr key={teacher._id}>
              <td>
                {editTeacherDetails && editTeacherDetails._id === teacher._id ? (
                  <input
                    type="text"
                    value={editTeacherDetails.name}
                    onChange={(e) =>
                      setEditTeacherDetails({
                        ...editTeacherDetails,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <Link to={`/teachers/${teacher._id}`}>{teacher.name}</Link>
                )}
              </td>
              <td>
                {editTeacherDetails && editTeacherDetails._id === teacher._id ? (
                  <input
                    type="text"
                    value={editTeacherDetails.phone}
                    onChange={(e) =>
                      setEditTeacherDetails({
                        ...editTeacherDetails,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{teacher.phone}</p>
                )}
              </td>
              <td>
                {editTeacherDetails && editTeacherDetails._id === teacher._id ? (
                  <input
                    type="text"
                    value={editTeacherDetails.subject}
                    onChange={(e) =>
                      setEditTeacherDetails({
                        ...editTeacherDetails,
                        subject: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{teacher.subject}</p>
                )}
              </td>
              <td>
                {editTeacherDetails && editTeacherDetails._id === teacher._id ? (
                  <>
                    <button className="save-button" onClick={onSaveUpdate}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={onCancelUpdate}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="update-button" onClick={() => onUpdateTeacher(teacher)}>
                    Update
                  </button>
                )}
                <button className="delete-button" onClick={() => onDeleteTeacherBtn(teacher._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
