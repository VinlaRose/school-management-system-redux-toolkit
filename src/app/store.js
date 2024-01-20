import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import teacherSlice from '../features/teachers/teacherSlice';
import studentSlice from '../features/students/studentSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    teachers: teacherSlice,
    students: studentSlice,
  },
});
