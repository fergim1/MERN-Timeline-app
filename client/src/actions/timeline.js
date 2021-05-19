import Swal from 'sweetalert2';
import { UploadFiles } from "../helpers/UploadFiles"
import { types } from "../types/types"


const localHost = process.env.REACT_APP_API_URL


export const startGetMemories = ( userID ) => {
    return async ( dispatch ) => {


        const resp = await fetch ( `${localHost}memory/${userID}`)

        const body = await resp.json();

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

        const { uid, name } = getState().auth
        memory.user = uid
        memory.author = name

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

        const { uid, name } = getState().auth
        memory.user = uid
        memory.author = name

        const fileUrl = await UploadFiles(memory)

        memory.images = fileUrl

        const resp = await fetch ( 'http://localhost:4000/memory/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( memory)
        });

        const body = await resp.json();
        const memoryGuardado = body.memory

        if( body.ok ) {

            dispatch( addMemory( memoryGuardado ) )

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}




export const startDelete = () => {

    return async ( dispatch, getState ) => {

        const { id } = getState().timeline.activeMemory;

        try {

            const resp = await fetch ( `${localHost}memory/${ id }`, {
                method: 'DELETE'
            });

            const body= await resp.json();

            if ( body.ok ) {
                dispatch ( memoryDeleted() )
            }
            else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }
    }
}
const memoryDeleted = ( ) => ({ type: types.timelineMemoryDeleted })


export const startUpdate = ( memory ) => {

    console.log(memory)
    return async (dispatch) => {

        try {
            const resp = await fetch ( `${localHost}memory/${ memory.id }`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(memory)
            });

            const body= await resp.json();

            if ( body.ok ) {
                dispatch (memoryUpdated ( memory ))
            }
            else {
                Swal.fire('Error', body.msg, 'error')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

}
const memoryUpdated = ( memory ) => ({
    type: types.timelineMemoryUpdated,
    payload: memory
})