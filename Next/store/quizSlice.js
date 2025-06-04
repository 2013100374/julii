const { createSlice } = require("@reduxjs/toolkit");

const quizSlice = createSlice({
    name: "quizData",
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    
    reducers: {
        setQuizData: (state, action) => {
            state.data = action.payload;
        },

    },
});

export const { setQuizData } = quizSlice.actions;

export default quizSlice.reducer;
