const { createSlice } = require("@reduxjs/toolkit");

const categoriesSlice = createSlice({
    name: "categoriesData",
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setCategoriesData: (state, action) => {
            state.data = action.payload;
        },
        
    },
});

export const { setCategoriesData } = categoriesSlice.actions;

export default categoriesSlice.reducer;

// 454514bd46c8d8320e2ca93f425303a2
// 454514bd46c8d8320e2ca93f425303a2