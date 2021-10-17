const { Schema, model } = require('mongoose');

const GuestSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});

// Como quiero que se vea mi Squema (No hace modificaciones en la base de datos, solo es para verlo como quiero)
GuestSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
})


module.exports = model('Guest', GuestSchema );

