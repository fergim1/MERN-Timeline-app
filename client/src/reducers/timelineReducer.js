import { types } from "../types/types";
import moment from 'moment';
import 'moment/locale/es';


moment.locale('es');

const initialState = {
    memories: [ ],
    activeMemory: {}
}

export const timelineReducer = ( state=initialState , action ) => {
    switch (action.type) {
        case types.timelineAddMemory:
            return {
                ...state,
                memories: [ ...state.memories, action.payload]
            }
        
        case types.timelineActiveMemory:
            return {
                ...state,
                activeMemory: action.payload
            }
        case types.timelineCleanActiveMemory:
            return {
                ...state,
                activeMemory: {}
            }
        case types.timelineAddPhotos:
            return {
                ...state,
                memories: [ ...state.memories, action.payload]
            }
        
        case types.timelineGetMemories:
            return {
                ...state,
                memories: action.payload
            }   
            
        default:
            return state;
    }
}