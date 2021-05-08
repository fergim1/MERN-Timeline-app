import { types } from "../types/types"

const initialState = {
    modalAddLetterOpen: false,
    ModalShowLetter: false,

}

export const uiReducer = ( state= initialState, action ) => {

    switch ( action.type ) {
        case types.uiAddLetterOpenModal:
            return {
                ...state,
                modalAddLetterOpen: true,
                ModalShowLetter: false
            }            
    
        case types.uiAddLetterCloseModal:
            return {
                ...state,
                modalAddLetterOpen: false
            }
            
        case types.uiOpenModalShowLetter:
            return {
                ...state,
                ModalShowLetter: true
            }
        
        case types.uiCloseModalShowLetter:
            return {
                ...state,
                ModalShowLetter: false
            }
         
    
        default:
            return state
    }
}
