import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from './reducer.js'
export default configureStore({
    reducer: {
        login: loginReducer,
    }
    
})