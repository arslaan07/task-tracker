import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskCount: 0, 
  taskUpdated: false
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    incrementTaskCount: (state) => {
      state.taskCount += 1;
    },
    decrementTaskCount: (state) => {
      state.taskCount -= 1;
    },
    updateTask: (state) => {
      state.taskUpdated = !state.taskUpdated
    },
    setTaskCount: (state, action) => {
      state.taskCount = action.payload;
    },
    setTaskToDelete: (state, action) => {
      state.taskCount = action.payload;
    }
  }
});

export const { incrementTaskCount, decrementTaskCount, setTaskCount, setTaskToDelete, updateTask} = taskSlice.actions;
export default taskSlice.reducer;