import { types } from "../types/types"

const initialState = {
    modalAddLetterOpen: false,
    ModalShowLetter: false,
    modalAddPhotos: false,
    ModalShowPhotos: false,
    modalGuest: false

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
         case types.uiOpenModalAddPhotos:
             return {
                 ...state,
                 modalAddPhotos: true,
                 modalAddLetterOpen: false,
                 ModalShowLetter: false,
                 modalGuest: false                 
             }
    
        case types.uiCloseModalAddPhotos:
             return {
                 ...state,
                 modalAddPhotos: false
             }

        case types.uiOpenModalShowPhotos:
            return {
                ...state,
                ModalShowPhotos: true,
                modalAddLetterOpen: false,
                ModalShowLetter: false,
                modalAddPhotos: false,
                modalGuest: false
            }
        case types.uiCloseModalShowPhotos:
            return {
                ...state,
                ModalShowPhotos: false,
            }

        case types.uiOpenModalGuest:
            return {
                ...state,
                modalGuest: true,
                modalAddLetterOpen: false,
                ModalShowLetter: false,
                modalAddPhotos: false,
                ModalShowPhotos: false,
            }

        case types.uiCloseModalGuest:
            return {
                ...state,
                modalGuest: false,
            }

        default:
            return state
    }
}
