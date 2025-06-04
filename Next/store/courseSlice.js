const { createSlice } = require("@reduxjs/toolkit");

const courseSlice = createSlice({
    name: "courseData",
    initialState: {
        data: null,
        status: 'idle',
        error: null,
     
    },
    
    reducers: {
        setCourseData: (state, action) => {
            state.data = action.payload;
        },

    },
});

export const { setCourseData,setCourseSectionData } = courseSlice.actions;

export default courseSlice.reducer;
