
const initialState = {
    memories: 
            [
                {
                    id: 132465,
                    date: 'Abril 2019',
                    title: 'Cumpleaños n° 1',
                    note: 'Saliste hermoso, te amamos',
                    img: null,
                    video: null,
                    author: 'Fernando'  
                    },
                    {
                    id: 324656,
                    date: 'Marzo 2020',
                    title: 'Tus primeros pasos',
                    note: 'Este es un mensaje 2',
                    img: null,
                    video: null,
                    author: 'Florencia'  
                    },
            ],
}

export const timelineReducer = ( state=initialState , action ) => {
    switch (action.type) {
        // case value:
            

        default:
            return state;
    }
}