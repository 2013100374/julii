import ENDPOINTS from "@/lib/endpoints";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchSections = createAsyncThunk(
    'settings/fetchSections',
    async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(baseUrl + ENDPOINTS.ALL_SECTIONS);
        return response.json();
    }
);

const initialState = {
    sections: [],
    status: 'idle',
    error: null,
}

const frontendSlice = createSlice({
    name: "frontendData",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(fetchSections.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchSections.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.sections = payload;
            })
            .addCase(fetchSections.rejected, (state, action) => {
                state.status = 'failed';
                state.sections = [];
            });
    }
});

export const selectSectionByKey = (state, key) => {
    if(state?.frontend?.sections?.remark == 'maintenance_mode') return [];
    return (state?.frontend?.sections ?? [])?.find(s => s.key === key);
};

export default frontendSlice.reducer;