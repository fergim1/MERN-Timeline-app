import Swal from 'sweetalert2';
import { UploadFiles } from "../helpers/UploadFiles"
import { types } from "../types/types"


const localHost = process.env.REACT_APP_API_URL


export const startGetMemories = ( userID ) => {
    return async ( dispatch ) => {


        const resp = await fetch ( `${localHost}memory/${userID}`)

        const body = await resp.json();
        console.log(body)
        const memories = body.memories

        if( body.ok ) {

            dispatch( getMemories( memories ) )

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const getMemories = ( memories ) => ({ 
    type: types.timelineGetMemories,
    payload: memories
})


export const startAddLetter = ( memory ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        memory.user = uid
        console.log(memory)

        const resp = await fetch ( 'http://localhost:4000/memory/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( memory)
        });

        const body = await resp.json();
        const memoryGuardada = body.memory
        console.log(body)

        if( body.ok ) {

            dispatch( addMemory( memoryGuardada ) )

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const addMemory = ( memory ) => ({ 
    type: types.timelineAddMemory,
    payload: memory
})

export const timelineStartActiveMemory = ( memory ) => {
    return async( dispatch ) => {

        dispatch( activeMemory( memory ) )

    }
}

const activeMemory = ( memory ) => ({ 
    type: types.timelineActiveMemory,
    payload: memory
})

export const timelineCleanActiveMemory = () => ({ type: types.timelineCleanActiveMemory})


export const startAddPhotos = ( memory ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        // console.log(uid)
        memory.user = uid
        // console.log(memory.user)

        const fileUrl = await UploadFiles(memory)
        memory.images = fileUrl

        console.log(memory)

        const resp = await fetch ( 'http://localhost:4000/memory/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( memory)
        });

        const body = await resp.json();
        const memoryGuardado = body.memory
        console.log(body)

        if( body.ok ) {

            dispatch( addMemory( memoryGuardado ) )

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

// const addPhotos = ( memory ) => ({ 
//     type: types.timelineAddPhotos,
//     payload: memory
// })