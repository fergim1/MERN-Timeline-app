import { types } from '../types/types';
import Swal from 'sweetalert2';
// import { eventLogout } from './events';


const urlLocal = process.env.REACT_APP_API_URL

export const startLogin = ( email, password ) => {

    const data = { email, password }

    return async( dispatch ) => {

        const resp = await fetch( `${urlLocal}auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });

        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('uid', body.uid );
            localStorage.setItem('name', body.name );



            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

export const startRegister = ( name, email, password ) => {
    return async( dispatch ) => {

        const data  = {name, email, password }
        console.log(data)

        const resp = await fetch( 'http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data)
        });

        const body = await resp.json();
        console.log(body)

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('uid', body.uid );
            localStorage.setItem('name', body.name );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}


export const loginStorage = (uid, name) =>{
    return (dispatch) =>{
        dispatch( login({
            uid,
            name
        }) )
    }

}
const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});


// export const startChecking = () => {
//     return async(dispatch) => {

//         const resp = await fetchConToken( 'auth/renew' );
//         const body = await resp.json();

//         if( body.ok ) {
//             localStorage.setItem('token', body.token );

//             dispatch( login({
//                 uid: body.uid,
//                 name: body.name
//             }) )
//         } else {
//             dispatch( checkingFinish() );
//         }
//     }
// }
// const checkingFinish = () => ({ type: types.authCheckingFinish });





// export const startLogout = () => {
//     return ( dispatch ) => {

//         localStorage.clear();
//         // dispatch( eventLogout() )
//         dispatch( logout() );
//     }
// }

// const logout = () => ({ type: types.authLogout })