import { types } from "../types/types"


export const startAddLetter = ( letter ) => {
    return async( dispatch ) => {

        dispatch( addLetter( letter ) )

    }
}

const addLetter = ( letter ) => ({ 
    type: types.timelineAddLetter,
    payload: letter
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