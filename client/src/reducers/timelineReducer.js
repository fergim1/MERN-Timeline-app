import { types } from "../types/types";
import moment from 'moment';
import 'moment/locale/es';


moment.locale('es');

const now = moment().format("DD - MMMM - YYYY")
const mañana = moment().add(3, 'days').format("DD - MMMM - YYYY")
const otroDia = moment().add(40, 'days').format("DD - MMMM - YYYY")


const initialState = {
    memories: 
            [
                {
                    id: 156987,
                    date: now,
                    title: 'Cumpleaños n° 1',
                    message: 'Saliste hermoso',
                    letter: 'It is a long established fact thIt is a long estabestablished fact that.',
                    user: {
                            id: 457896,
                            name: 'Florencia'
                          }  
                },
                {
                    id: 458962,
                    date: mañana,
                    title: 'Tus primeros pasos',
                    message: 'Este es un mensaje 2. Ahora iria una cartaaa',
                    images: 'https://tdj.gg/uploads/attachs/20560_w9RC4W-QqXw-200x200.jpg',
                    user: {
                        id: 457596,
                        name: 'Florencia'
                      }   
                },
                // {
                //     id: 458459,
                //     date: otroDia,
                //     title: 'llega hasta aca',
                //     message: 'Este es un mensaje  Este es un mensaje 2Este es un mensaje 2Este es un mensaje 22',
                //     video: 'video',
                //     user: {
                //         id: 417896,
                //         name: 'sasasasa'
                //     }  
                // },
                
            ],
    activeMemory: null
}

export const timelineReducer = ( state=initialState , action ) => {
    switch (action.type) {
        case types.timelineAddMemory:
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
        case types.timelineAddPhotos:
            return {
                ...state,
                memories: [ ...state.memories, action.payload]
            }
        
        case types.timelineGetMemories:
            return {
                ...state,
                memories: action.payload
            }   
            
        default:
            return state;
    }
}