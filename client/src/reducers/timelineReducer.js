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
                    letter: 'It is a long established fact thIt is a long estabestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conlished fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long establiIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteshed fact that a reader will be distracted by the readable conteat a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usinking it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
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
                {
                    id: 754896,
                    date: mañana,
                    title: 'Este es otro ',
                    message: 'Este es un mensaje  Este es un mensaje 2Este es un mensaje 2Este es un mensaje 22',
                    letter: 'Aca iria una cartaaaaaaaaaaaaaaaaaaaa. Este es un mensaje 2Este es un mensaje 2Este es un mensaj',
                    user: {
                        id: 452896,
                        name: 'Roberto'
                      }    
                },
                {
                    id: 458759,
                    date: mañana,
                    title: 'Este es otro ',
                    message: 'Este es un mensaje  Este es un mensaje 2Este es un mensaje 2Este es un mensaje 22',
                    images: 'https://doculinux.files.wordpress.com/2010/03/batux-tux-g2-hd-200x200.png',
                    user: {
                        id: 417896,
                        name: 'Fer'
                      }    
                },
                {
                    id: 456854,
                    date: mañana,
                    title: 'Este es otro ',
                    message: 'Este es un mensaje  Este es un mensaje 2Este es un mensaje 2Este es un mensaje 22',
                    letter: 'Aca iria una cartaaaaaaaaaaaaaaaaaaaa. Este es un mensaje 2Este es un mensaje 2Este es un mensaj',
                    user: {
                        id: 417826,
                        name: 'claudio'
                        
                         },
                },
                {
                    id: 418759,
                    date: mañana,
                    title: 'Este es otro ',
                    message: 'Este es un mensaje  Este es un mensaje 2Este es un mensaje 2Este es un mensaje 22',
                    letter: 'Aca iria una cartaaaaaaaaaaaaaaaaaaaa. Este es un mensaje 2Este es un mensaje 2Este es un mensaj',
                    user: {
                        id: 412896,
                        name: 'Fernanding'
                          }
                },
                {
                    id: 658478,
                    date: mañana,
                    title: 'Este es otro ',
                    message: 'Este es un mensaje  Este es un mensaje 2Este es un mensaje 2Este es un mensaje 22',
                    letter: 'Aca iria una cartaaaaaaaaaaaaaaaaaaaa. Este es un mensaje 2Este es un mensaje 2Este es un mensaj',
                    user: {
                        id: 417846,
                        name: 'Feflor'
                        }
                },
                {
                    id: 458459,
                    date: otroDia,
                    title: 'llega hasta aca',
                    message: 'Este es un mensaje  Este es un mensaje 2Este es un mensaje 2Este es un mensaje 22',
                    video: 'video',
                    user: {
                        id: 417896,
                        name: 'sasasasa'
                    }  
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
        case types.timelineAddPhotos:
            return {
                ...state,
                memories: [ ...state.memories, action.payload]
            }
        
            

        default:
            return state;
    }
}