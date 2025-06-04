const { createSlice } = require("@reduxjs/toolkit");

const reviewSlice = createSlice({
    name: "courseData",
    initialState: {
        data: null,
        status: 'idle',
        error: null,
     
    }, 
    reducers: {
        setReviewData: (state, action) => {
            state.data = action.payload;
        },

    },
});

export const { setReviewData } = reviewSlice.actions;

export default reviewSlice.reducer;
