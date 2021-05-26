import Swal from 'sweetalert2';
import { prepararFormData } from '../helpers/prepararFormData';
import { types } from "../types/types"


const localHost = process.env.REACT_APP_API_URL


export const startGetMemories = ( userID ) => {
    return async ( dispatch ) => {


        const resp = await fetch ( `${localHost}memory/${userID}`)

        const body = await resp.json();

        if( body.ok ) {
            const memories = body.memories
            dispatch( getMemories( memories ) )

        } else {
            console.log(body.msg)
            // Swal.fire('Error', body.msg, 'error');
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

        const resp = await fetch ( `${localHost}memory/addletter`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( memory)
        });

        const body = await resp.json();
        const memories = body.memories

        if( body.ok ) {

            dispatch( addMemory( memories ) )

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


export const startAddPhotos = ( memory, setLoading, closeModal ) => {
    return async( dispatch, getState ) => {
        
        setLoading((loading) => !loading)
        const { uid, name } = getState().auth
        memory.user = uid
        memory.author = name

        const formData = prepararFormData ( memory )

        const resp = await fetch ( `${localHost}memory/addphotos` , {
                method: 'POST',
                body: formData
            });

        const body = await resp.json();

        const memories = body.memories

        if( body.ok ) {
            dispatch( addMemory( memories ) )
            setLoading((loading) => !loading)
            closeModal()

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

            const memories = body.memories

            if ( body.ok ) {
                dispatch (memoryUpdated ( memories ))
            }
            else {
                Swal.fire('Error', body.msg, 'error')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

}
const memoryUpdated = ( memories ) => ({
    type: types.timelineMemoryUpdated,
    payload: memories
})