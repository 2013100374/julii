import ENDPOINTS from "@/lib/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchGoogleCaptcha = createAsyncThunk(
    'google-captcha',
    async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(baseUrl + ENDPOINTS.GET_EXTENSION+'/google-recaptcha2');
        return response.json();
    }
);


export const fetchCustomCaptcha = createAsyncThunk(
    'custom-captcha',
    async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(baseUrl + ENDPOINTS.GET_EXTENSION+'/custom-captcha');
        return response.json();
    }
);

const captchaSlice = createSlice({
    name: "captcha",
    initialState: {
        googleCaptcha:{
            data: null,
            status: 'idle',
            error: null,
        },
        customCaptcha:{
            data: null,
            status: 'idle',
            error: null,
        }
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            //for google captcha
            .addCase(fetchGoogleCaptcha.pending, (state) => {
                state.googleCaptcha.status = 'loading';
            })
            .addCase(fetchGoogleCaptcha.fulfilled, (state, action) => {
                state.googleCaptcha.status = 'succeeded';
                state.googleCaptcha.data = action.payload;
            })
            .addCase(fetchGoogleCaptcha.rejected, (state, action) => {
                state.googleCaptcha.status = 'failed';
                state.googleCaptcha.error = action.error.message;
            })

            //for custom captcha
            .addCase(fetchCustomCaptcha.pending, (state) => {
                state.customCaptcha.status = 'loading';
            })
            .addCase(fetchCustomCaptcha.fulfilled, (state, action) => {
                state.customCaptcha.status = 'succeeded';
                state.customCaptcha.data = action.payload;
            })
            .addCase(fetchCustomCaptcha.rejected, (state, action) => {
                state.customCaptcha.status = 'failed';
                state.customCaptcha.error = action.error.message;
            });
    }
});

export default captchaSlice.reducer;