import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
// Reducers:
import { timelineReducer } from "./timelineReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    // como se va a ver mi rootRecuder: 
    auth: authReducer,
    timeline: timelineReducer,
    ui: uiReducer,

})