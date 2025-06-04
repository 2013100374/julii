import { configureStore } from "@reduxjs/toolkit";
import gsReducer from './gsSlice';
import captchaReducer from './captchaSlice';
import languageReducer from './langSlice';
import userSlice from './userSlice';
import instructorSlice from './instructorSlice';
import customPageReducer from './customPageSlice';
import extensionReducer from './extensionSlice';
import frontendReducer from './frontendSlice'; 
import courseSlice from './courseSlice'; 
import categoriesSlice from './categoriesSlice'; 
import quizSlice from './quizSlice'; 
import filterSlice from './filterSlice'; 
import reviewSlice from './reviewSlice'; 

export const store = configureStore({
    reducer: {
        gs: gsReducer,
        captcha: captchaReducer,
        language: languageReducer,
        user: userSlice,
        customPage: customPageReducer,
        extension: extensionReducer,
        frontend: frontendReducer,
        instructor: instructorSlice,
        course: courseSlice,  
        categories: categoriesSlice,
        quiz:quizSlice,
        filter:filterSlice,
        reviews:reviewSlice,

    }
});


