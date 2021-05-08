import { types } from "../types/types";
import moment from 'moment';
import 'moment/locale/es';

import bebe1 from '../images/bebe.jpg'
import bebe2 from '../images/bebe2.jpg'
import bebe3 from '../images/bebe3.jpg'


moment.locale('es');

const now = moment().format("DD - MMMM - YYYY")
const mañana = moment().add(3, 'days').format("DD - MMMM - YYYY")



const initialState = {
    memories: 
            [
                {
                    id: 156987,
                    date: now,
                    title: 'Cumpleaños n° 1',
                    message: 'Saliste hermoso',
                    letter: 'It is a long established fact thIt is a long estabestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conlished fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long establiIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteshed fact that a reader will be distracted by the readable conteat a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usinking it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
                    images: null,
                    video: null,
                    author: 'Fernando'  
                },
                {
                    id: 458962,
                    date: mañana,
                    title: 'Tus primeros pasos',
                    message: 'Este es un mensaje 2. Ahora iria una cartaaa',
                    letter: null,
                    images: [bebe1, bebe2, bebe3],
                    video: null,
                    author: 'Florencia'  
                },
                {
                    id: 754896,
                    date: mañana,
                    title: 'Este es otro ',
                    message: 'Este es un mensaje  Este es un mensaje 2Este es un mensaje 2Este es un mensaje 22',
                    letter: 'Aca iria una cartaaaaaaaaaaaaaaaaaaaa. Este es un mensaje 2Este es un mensaje 2Este es un mensaj',
                    images: null,
                    video: null,
                    author: 'Florencia'  
                },
                
            ],
    activeMemory: null
}

export const timelineReducer = ( state=initialState , action ) => {
    switch (action.type) {
        case types.timelineAddLetter:
            return {
                ...state,
                memories: [ ...state.memories, action.payload]
            }
        
        case types.timelineActiveMemory:
            return {
                ...state,
                activeMemory: action.payload
            }
        case types.timelineCleanActiveMemory:
            return {
                ...state,
                activeMemory: null
            }
        
            

        default:
            return state;
    }
}