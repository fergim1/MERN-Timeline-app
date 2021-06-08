import { types } from '../types/types';

const initialState = {
    comments: []
}

export const commentReducer = ( state = initialState, action ) => {

    switch (action.type) {

        case types.commentAdd:
               return {
                   ...state,
                   comments: action.payload
               }
    
        case types.commentsGet:
            return {
                ...state,
                comments: action.payload
            }
        case types.commentsClean:
            return {
                ...state,
                comments: []
            }

            

        // case types.guestDeleted:
        //     return {
        //         ...state,
        //         guests: state.guests.filter ( 
        //             guest => guest.id !== action.payload
        //         )
        //     }            

        default:
            return state;
    }


}