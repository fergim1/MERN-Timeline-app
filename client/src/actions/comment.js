import Swal from 'sweetalert2';
import { types } from '../types/types';
import moment from 'moment';

const localHost = process.env.REACT_APP_API_URL

export const startAddComment = ( comment ) => {
    return async( dispatch, getState ) => {

        const { activeMemory } = getState().timeline
        const { type, name, guestName } = getState().auth
        const postComment = {}
        postComment.message =  comment
        postComment.date = moment()
        postComment.memoryId =  activeMemory.id
        
        if( type === 'user') {
            postComment.author =  name            
        } else {
            postComment.author =  guestName
        }

        const resp = await fetch ( `${localHost}comment/add`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( postComment )
        });

        const body = await resp.json();
        const comments = body.comments

        if( body.ok ) {

            dispatch( addComment( comments ) )

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const addComment = ( comment ) => ({
    type: types.commentAdd,
    payload: comment
})


export const startGetComments = ( memoryId ) => {
    return async ( dispatch ) => {

        const resp = await fetch ( `${localHost}comment/${memoryId}`)

        const body = await resp.json();

        if( body.ok ) {
            const comments = body.comments
            dispatch( getComments( comments ) )

        } else {
            console.log(body.msg)
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const getComments = ( comments ) => ({ 
    type: types.commentsGet,
    payload: comments
})

export const startCleanComments = () => ({ type: types.commentsClean})


export const startDeleteComment = ( commentId ) => {
    return async (dispatch) => {

        const resp = await fetch ( `${localHost}comment/${commentId}` , {
            method: 'DELETE',            
        })

        const body = await resp.json();
        console.log(body)

        if ( body.ok ) {
            dispatch ( commentDeleted(commentId) )
        }
        else {
            Swal.fire('Error', body.msg, 'error')
        }
       
    }
}

const commentDeleted = ( commentId ) => ({ 
    type: types.commentDeleted,
    payload: commentId
 })
