const { Schema, model } = require('mongoose');

    // id: 156987,
    // date: now,
    // title: 'Cumpleaños n° 1',
    // message: 'Saliste hermoso',
    // letter: 'It is a long established fact thIt is a long estabestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conestablished fact that a reader will be distracted by the readable conlished fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long establiIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteIt is a long established fact that a reader will be distracted by the readable conteshed fact that a reader will be distracted by the readable conteat a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usinking it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    // images: null,
    // video: null,
    // user: {
    //         id: 457896,
    //         name: 'Florencia'
    //       }  


const MemorySchema = Schema({
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    letter: {
        type: String,
    },
    images: {
        type: String,
    },
    video: {
        type: String,
    },
    // Para saber quien creo este evento, hacemos una referencia al usuario
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});

// Como quiero que se vea mi Squema (No hace modificaciones en la base de datos, solo es para verlo como quiero)
MemorySchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
})


module.exports = model('Memory', MemorySchema );

