import { types } from '../types/types';

const initialState = {
    checking: true,
    authenticated: false
    // uid: null,
    // name: null
}

export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false,
                authenticated: true
            }
        case types.authLoginGuest:
            return {
                ...state,
                ...action.payload,
                checking: false,
                authenticated: true
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false
            }


        default:
            return state;
    }

}


