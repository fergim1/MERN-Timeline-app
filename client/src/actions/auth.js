import { types } from '../types/types';
import Swal from 'sweetalert2';
// import { eventLogout } from './events';


const localHost = process.env.REACT_APP_API_URL

export const startLogin = ( email, password ) => {

    const data = { email, password }

    return async( dispatch ) => {

        const resp = await fetch( `${localHost}auth/login`, {
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
            localStorage.setItem('type', 'user')

            dispatch( login({
                uid: body.uid,
                name: body.name,
                type: 'user'
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

export const startRegister = ( name, email, password ) => {
    return async( dispatch ) => {
        console.log('name: ' , name)
        console.log('email: ' , email)
        console.log('password: ' , password)
        const data  = {name, email, password }

        const resp = await fetch( `${localHost}auth/register`, {
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
            name,
            type: 'user'
        }) )
    }

}

export const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })


export const startGuestLogin = ( email ) => {
  
    const data = { email }

    return async( dispatch ) => {

        const resp = await fetch( `${localHost}auth/guest`, {
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
            localStorage.setItem('type', 'guest')
            localStorage.setItem('guestName', body.guestName)
            localStorage.setItem('guestId', body.guestId)

            dispatch( loginGuest({
                uid: body.uid,
                name: body.name,
                type: 'guest',
                guestName: body.guestName,
                guestId: body.guestId,
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const loginGuest = ( guest ) => ({
    type: types.authLoginGuest,
    payload: guest
});

export const loginGuestStorage = (uid, name, guestId, guestName)=>{
    return (dispatch) =>{
        dispatch( login({
            uid,
            name,
            type: 'guest',
            guestName: guestName,
            guestId: guestId,
        }) )
    }

}