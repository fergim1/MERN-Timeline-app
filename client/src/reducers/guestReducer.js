import { types } from '../types/types';

const initialState = {
    guests: null
}

export const guestReducer = ( state = initialState, action ) => {

    switch (action.type) {

        case types.guestAddGuest:
               return {
                   ...state,
                   guests: action.payload
               }
    
        case types.guestGetGuests:
            return {
                ...state,
                guests: action.payload
            }

        case types.guestDeleted:
            return {
                ...state,
                guests: state.guests.filter ( 
                    guest => guest.id !== action.payload
                )
            }            

        default:
            return state;
    }


}