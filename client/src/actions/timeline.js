import Swal from 'sweetalert2';
import { UploadFiles } from "../helpers/UploadFiles"
import { types } from "../types/types"


const urlLocal = process.env.REACT_APP_API_URL

export const startAddMemory = ( memory ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        memory.user = uid
        console.log(memory)

        const resp = await fetch( 'http://localhost:4000/memory/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( memory)
        });

        const body = await resp.json();
        console.log(body)

        if( body.ok ) {

            dispatch( addMemory( memory ) )

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
    return async( dispatch ) => {

        const fileUrl = await UploadFiles(memory)
        memory.images = fileUrl
        dispatch( addPhotos( memory ) )
    }
}

const addPhotos = ( memory ) => ({ 
    type: types.timelineAddPhotos,
    payload: memory
})