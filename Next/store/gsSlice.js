import ENDPOINTS from "@/lib/endpoints";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(baseUrl + ENDPOINTS.GENERAL_SETTINGS);
        return response.json();
    }
);

const gsSlice = createSlice({
    name: "gs",
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default gsSlice.reducer;