import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectCount: 0, 
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        incrementProjectCount: (state) => {
            state.projectCount += 1;
        },
        setProjectCount: (state, action) => {
            state.projectCount = action.payload;
        }
    },
});

export const { incrementProjectCount, setProjectCount } = projectSlice.actions;
export default projectSlice.reducer;