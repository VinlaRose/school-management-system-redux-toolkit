import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchTeachers = createAsyncThunk(
  'events/fetchTeachers',
  async () => {
    try {
      const response = await fetch('https://school-management-backend-eight.vercel.app/teachers');
      const data = await response.json();
      console.log(data);
      return data.data;  
    } catch (error) {
      console.error('Error fetching event data:', error);
      throw error;  
    }
  }
);

export const addTeacher = createAsyncThunk(
  'teachers/addTeacher',
  async (TeacherData, { dispatch }) => {
    try {
      console.log(TeacherData);

      const response = await fetch('https://school-management-backend-eight.vercel.app/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(TeacherData),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      const addedTeacher = await response.json();
      console.log(addedTeacher.data);
      return addedTeacher.data;  // Return the data instead of dispatching an action here
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;  // Throw the error to let createAsyncThunk handle the failure action
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  'teachers/deleteTeacher',
  async (teacherId, { dispatch }) => {
    try {
      console.log(teacherId);

      const response = await fetch(`https://school-management-backend-eight.vercel.app/teachers/${teacherId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      const deletedTeacher = await response.json();
      console.log(deletedTeacher.data);
      return deletedTeacher.data; 
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;  // Throw the error to let createAsyncThunk handle the failure action
    }
  }
);

export const editTeacher = createAsyncThunk(
  'teachers/editTeacher',
  async (updatedTeacher, { dispatch }) => {
    try {
      const teacherId = updatedTeacher._id;

      const response = await fetch(`https://school-management-backend-eight.vercel.app/teachers/${teacherId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTeacher),
      });

      if (!response.ok) {
        throw new Error('Failed to edit student');
      }

      const editedTeacher = await response.json();
      console.log(editedTeacher);
      return editedTeacher.data;  // Return the data instead of dispatching an action here
    } catch (error) {
      console.error('Error editing event:', error);
      throw error;  // Throw the error to let createAsyncThunk handle the failure action
    }
  }
);


const initialState = {
  teachers: [],
  status: "idle",
  error: null,
  filter: "All",
  sortBy: "name"
};

export const teacherSlice = createSlice({
  name: "teachers",
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
    [fetchTeachers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTeachers.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    },
    [fetchTeachers.rejected]: (state, action) => {
      state.status = "error";
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [addTeacher.pending]: (state) => {
      state.status = "loading";
    },
    [addTeacher.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers.push(action.payload);
    },
    [addTeacher.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editTeacher.pending]: (state) => {
      state.status = "loading";
    },
    [editTeacher.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload;
      const index = state.teachers.findIndex((s) => s._id === updatedStudent._id);
      if (index !== -1) {
        state.teachers[index] = updatedStudent;
      }
    },
    [editTeacher.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteTeacher.pending]: (state) => {
      state.status = "loading";
    },
    [deleteTeacher.fulfilled]: (state, action) => {
        state.status = "success";
        state.teachers = state.teachers.filter(
          (student) => student._id !== action.payload._id
        );
      },
    [deleteTeacher.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export const { setFilter, setSortBy } = teacherSlice.actions;

export default teacherSlice.reducer;