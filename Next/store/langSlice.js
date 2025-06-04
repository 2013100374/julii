import ENDPOINTS from "@/lib/endpoints";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

let langKey = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;

export const fetchLangKeys = createAsyncThunk(
    'fetchLangKeys',
    async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(baseUrl + ENDPOINTS.LANG_KEYS + (langKey ? '/' + langKey : ''));
        
        return response.json();
    }
);

const langSlice = createSlice({
    name: "lang",
    initialState: {
        data: null,
        status: 'idle',
        error: null,
        selectedLanguage: null,
    },
    reducers:{
        updateLanguage: (state,action) => {
            state.data = action.payload;
            langKey = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : 'en';
            state.selectedLanguage = action.payload.data.languages.find(language => language.code === langKey);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLangKeys.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLangKeys.fulfilled, (state, action) => {
                state.status = 'succeeded';
            
                state.data = action.payload;
                if(!langKey){
                    localStorage.setItem('lang', action?.payload?.data?.code ?? 'en');
                }
                langKey = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : 'en';
                state.selectedLanguage = action?.payload?.data?.languages?.find(language => language.code === langKey);
            })
            .addCase(fetchLangKeys.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { updateLanguage } = langSlice.actions;

export default langSlice.reducer;