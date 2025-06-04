const { createSlice } = require("@reduxjs/toolkit");

const instructorSlice = createSlice({
    name: "instructorData",
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setInstructorData: (state, action) => {
            state.data = action.payload;
        },
        
    },
});

export const { setInstructorData } = instructorSlice.actions;

export default instructorSlice.reducer;

// 454514bd46c8d8320e2ca93f425303a2
// 454514bd46c8d8320e2ca93f425303a2