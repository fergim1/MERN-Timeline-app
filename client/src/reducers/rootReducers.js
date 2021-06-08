import { combineReducers } from "redux";

// Reducers:
import { authReducer } from "./authReducer";
import { timelineReducer } from "./timelineReducer";
import { uiReducer } from "./uiReducer";
import { guestReducer } from './guestReducer'
import { commentReducer } from "./commentReducer";

export const rootReducer = combineReducers({
    // como se va a ver mi rootRecuder: 
    auth: authReducer,
    timeline: timelineReducer,
    ui: uiReducer,
    guests: guestReducer,
    comments: commentReducer,


})