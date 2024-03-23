import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchStudents = createAsyncThunk(
  'teachers/fetchStudents',
  async () => {
    try {
      const response = await fetch('https://school-management-backend-eight.vercel.app/students');
      const data = await response.json();
      console.log(data);
      return data.data;  
    } catch (error) {
      console.error('Error fetching event data:', error);
      throw error;  
    }
  }
);

export const addStudent = createAsyncThunk(
  'teachers/addStudent',
  async (studentData, { dispatch }) => {
    try {
      console.log(studentData);

      const response = await fetch('https://school-management-backend-eight.vercel.app/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      const addedStudent = await response.json();
      console.log(addedStudent.data);
      return addedStudent.data;  
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'teachers/deleteStudent',
  async (studentId, { dispatch }) => {
    try {
      console.log(studentId);

      const response = await fetch(`https://school-management-backend-eight.vercel.app/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      const deletedStudent = await response.json();
      console.log(deletedStudent.data);
      return deletedStudent.data; 
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }
);

export const editStudent = createAsyncThunk(
  'students/editStudent',
  async (updatedStudent, { dispatch }) => {
    console.log(updatedStudent)
    try {
      const studentId = updatedStudent._id;

      const response = await fetch(`https://school-management-backend-eight.vercel.app/students/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
      });

      if (!response.ok) {
        console.log(response)
        throw new Error('Failed to edit student');
      }
      console.log(response)
      const editedStudent = await response.json();
      console.log(editedStudent);
      return editedStudent.data;  
    } catch (error) {
      console.error('Error editing event:', error);
      throw error;  
    }
  }
);







const initialState = {
  students: [],
  status: "idle",
  error: null,
  filter: "All",
  sortBy: "name"
};

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  },
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.status = "success";
      state.students = action.payload;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.status = "error";
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [addStudent.pending]: (state) => {
      state.status = "loading";
    },
    [addStudent.fulfilled]: (state, action) => {
      state.status = "success";
      state.students.push(action.payload);
    },
    [addStudent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editStudent.pending]: (state) => {
      state.status = "loading";
    },
    [editStudent.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload;
      const index = state.students.findIndex((s) => s._id === updatedStudent._id);
      if (index !== -1) {
        state.students[index] = updatedStudent;
      }
    },
    [editStudent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteStudent.pending]: (state) => {
      state.status = "loading";
    },
    [deleteStudent.fulfilled]: (state, action) => {
        state.status = "success";
        state.students = state.students.filter(
          (student) => student._id !== action.payload._id
        );
      },
    [deleteStudent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export const { setFilter, setSortBy } = studentSlice.actions;

export default studentSlice.reducer;