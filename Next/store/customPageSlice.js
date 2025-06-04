import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ENDPOINTS from "@/lib/endpoints";

export const fetchCustomPages = createAsyncThunk(
    'fetchCustomPages',
    async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(baseUrl + ENDPOINTS.CUSTOM_PAGES);
   
        const data =  await response.json();
       
        
        return data;
    }
);

const customPageSlice = createSlice({
    name: "customPage",
    initialState: {
        data: null,
        status: 'idle'
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomPages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCustomPages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCustomPages.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { updateCustomPage } = customPageSlice.actions;

export default customPageSlice.reducer;


