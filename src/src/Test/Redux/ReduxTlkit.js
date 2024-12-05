import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    userDetails: {} ,
    courses: [],
    toggleUserCourses: "",
};

const CreateStore= createSlice({
    name: 'Course',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload; // Store full user details
          },
        addCourse: (state, action) => {
            state.courses.push(action.payload);
        },
        setToggleUserCourses: (state, action) => {
            state.toggleUserCourses = action.payload;
        }
    },
});

export const { setUserDetails, addCourse , setToggleUserCourses} = CreateStore.actions;

export default CreateStore;