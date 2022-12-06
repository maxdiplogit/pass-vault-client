import { createSlice, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';


const initialLoginState = { isLoggedIn: false, loggedInUser: {} };


const authSlice = createSlice({
    name: 'auth',
    initialState: initialLoginState,
    reducers: {
        changeIsLoggedIn(curretState, action) {
            curretState.isLoggedIn = action.payload;
        },
        changeLoggedInUser(currentState, action) {
            currentState.loggedInUser = action.payload;
        },
        changeLoggedInUserAccessToken(currentState, action) {
            currentState.loggedInUser.accessToken = action.payload;
        }
    }
});


const reducers = combineReducers({
    auth: authSlice.reducer
});


const persistConfig = {
    key: 'root',
    storage
};


const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});


export const authActions = authSlice.actions;


export default store;