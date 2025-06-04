import ENDPOINTS from "@/lib/endpoints";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const facebookComment = createAsyncThunk(
    'extension/facebookComment',
    async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(baseUrl + ENDPOINTS.GET_EXTENSION + '/fb-comment');
        return response.json();
    }
);

export const googleAnalytics = createAsyncThunk(
    'extension/googleAnalytics',
    async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(baseUrl + ENDPOINTS.GET_EXTENSION + '/google-analytics');
        return response.json();
    }
);

export const tawkChat = createAsyncThunk(
    'extension/tawkChat',
    async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(baseUrl + ENDPOINTS.GET_EXTENSION + '/tawk-chat');
        return response.json();
    }
);

const extensionSlice = createSlice({
    name: "extension",
    initialState: {
        facebookComment: {
            status: 'idle',
            error: null,
        },
        googleAnalytics: {
            status: 'idle',
            error: null,
        },
        tawkChat: {
            status: 'idle',
            error: null,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(facebookComment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(facebookComment.fulfilled, (state, action) => {
                state.facebookComment.status = 'succeeded';
                state.facebookComment.data = action.payload;
            })
            .addCase(facebookComment.rejected, (state, action) => {
                state.facebookComment.status = 'failed';
                state.facebookComment.error = action.error.message;
            })
            .addCase(googleAnalytics.pending, (state) => {
                state.googleAnalytics.status = 'loading';
            })
            .addCase(googleAnalytics.fulfilled, (state, action) => {
                state.googleAnalytics.status = 'succeeded';
                state.googleAnalytics.data = action.payload;
            })
            .addCase(googleAnalytics.rejected, (state, action) => {
                state.googleAnalytics.status = 'failed';
                state.googleAnalytics.error = action.error.message;
            })
            .addCase(tawkChat.pending, (state) => {
                state.tawkChat.status = 'loading';
            })
            .addCase(tawkChat.fulfilled, (state, action) => {
                state.tawkChat.status = 'succeeded';
                state.tawkChat.data = action.payload;
            })
            .addCase(tawkChat.rejected, (state, action) => {
                state.tawkChat.status = 'failed';
                state.tawkChat.error = action.error.message;
            });
    }
});

export default extensionSlice.reducer;