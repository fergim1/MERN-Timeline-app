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

        case types.commentDeleted:
            return {
                ...state,
                comments: state.comments.filter ( 
                    comment => comment.id !== action.payload
                )
            }            

        default:
            return state;
    }


}