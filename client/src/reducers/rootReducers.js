import { combineReducers } from "redux";
// Reducers:
import { timelineReducer } from "./timelineReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    // como se va a ver mi rootRecuder: 
    timeline: timelineReducer,
    ui: uiReducer,

})