const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: "userData",
    initialState: {
        data: null,
        progress: 0,  // Store progress separately
        status: 'idle',
        error: null,
    },
    
    reducers: {
        setUserData: (state, action) => {
            state.data = action.payload;
        },
        setUserProgress: (state, action) => {
            state.progress = action.payload; // Store progress independently
        },
    },
});

export const { setUserData, setUserProgress } = userSlice.actions;
export default userSlice.reducer;

