import Swal from 'sweetalert2';
import { types } from '../types/types';

const localHost = process.env.REACT_APP_API_URL

export const startAddGuest = ( formValues ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        formValues.user = uid

        const resp = await fetch ( `${localHost}guest/add`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( formValues)
        });

        const body = await resp.json();
        console.log(body)

        const guests = body.guests

        if( body.ok ) {

            dispatch( addGuest( guests ) )

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const addGuest = ( guests ) => ({
    type: types.guestAddGuest,
    payload: guests
})



export const startGetGuests = ( userId ) => {
    return async ( dispatch ) => {


        const resp = await fetch ( `${localHost}guest/${userId}`)

        const body = await resp.json();

        if( body.ok ) {
            const guests = body.guests
            dispatch( getGuests( guests ) )

        } else {
            console.log(body.msg)
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const getGuests = ( guests ) => ({ 
    type: types.guestGetGuests,
    payload: guests
})


export const startDeleteGuest = ( idGuest ) => {
    return async (dispatch) => {

        const resp = await fetch ( `${localHost}guest/${idGuest}` , {
            method: 'DELETE',            
        })

        const body = await resp.json();
        console.log(body)

        if ( body.ok ) {
            dispatch ( guestDeleted(idGuest) )
        }
        else {
            Swal.fire('Error', body.msg, 'error')
        }
       
    }
}

const guestDeleted = ( idGuest ) => ({ 
    type: types.guestDeleted,
    payload: idGuest
 })
