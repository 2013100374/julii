const { createSlice } = require("@reduxjs/toolkit");

const filterSlice = createSlice({
    name: "filterData",
    initialState: {
        data: null,
        status: 'idle',
        error: null,
     
    },
    
    reducers: {
        setFilterData: (state, action) => {
            state.data = action.payload;
        },

    },
});

export const { setFilterData,setCourseSectionData } = filterSlice.actions;

export default filterSlice.reducer;
