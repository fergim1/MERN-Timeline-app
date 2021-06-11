const { response } = require('express')
const Comment = require('../models/Comment')

const addComment = async (req, res=response) => {

    const { memoryId } = req.body    

    try {
        
        comment = new Comment (req.body);
    
        await comment.save()
    
        const comments = await Comment.find({memoryId}).sort({ date: 'asc'}).exec();
    
        res.json( {
            ok: true,
            comments  
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }   
}

const getComments = async (req, res=response) => {

    try {
        const memoryId = req.params.memoryId;

        const comments = await Comment.find({memoryId}).sort({ date: 'asc'}).exec();

        res.json( {
            ok: true,
            comments  
        })
        
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })            
    }        
}



const deleteComment = async ( req, res=response ) => {
    
    const commentId = req.params.commentId
    
    try {
        
        let comment = await Comment.findById( commentId ).exec() 
        
        if ( !comment ) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo eliminar, porque no existe ningún comentario con ese id!'
            });
        }
    
        await Comment.findOneAndDelete( { _id: commentId });
    
        return res.json({
            ok: true,
            msg: 'Eliminado correctamente'
        })
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })        
    }
}



module.exports = {
    addComment,
    getComments,
    deleteComment
 }