const { Schema, model } = require('mongoose');

const CommentSchema = Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    memoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Memory',
        required: true
    },
    author: {
        type: String,
        required: true
    },

});

// Como quiero que se vea mi Squema (No hace modificaciones en la base de datos, solo es para verlo como quiero)
CommentSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
})


module.exports = model('Comment', CommentSchema );

