import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTimes, FaTrash } from 'react-icons/fa';

import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import "./comments.css";
import { startAddComment, startCleanComments, startDeleteComment, startGetComments } from "../../../actions/comment";




const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");


export const Comments = ({handleComents, commentsOpen}) => {
    
    const dispatch = useDispatch()
    const { activeMemory } = useSelector(state => state.timeline)
    const { id:memoryId } = activeMemory
    const { type } = useSelector(state => state.auth)
    const { comments } = useSelector(state => state.comments)
    
    const [comment, setComment] = useState('')

    useEffect(() => {
        dispatch(startGetComments(memoryId))    
    }, [dispatch, memoryId ])


  const postComment = (e) => {
      e.preventDefault()
      dispatch( startAddComment( comment ))
      setComment('')
  }


    const closeModal = () => {
        handleComents()
        dispatch(startCleanComments())
    };

    const handleDelete = (commentId) => {
        dispatch( startDeleteComment (commentId) )
    }

  return (
    <Modal
      isOpen={commentsOpen}
      onRequestClose={handleComents}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
        <div className='encabezadoLetter'>          
            <FaTimes className="fas fa-times-circle fa-lg pointer icono" onClick= {closeModal}  aria-hidden="true" title="Cerrar"/> 
        </div>
       <div className='comments-wrapper'>
            <h3>Comentarios</h3>
            
            <div className='post-comments'>

           { comments?.length > 0 
            ?
                
                comments?.map( (comment) => (
                        <div 
                            className='post-one-comment'
                            key={comment.id}
                        >
                                <p 
                                    className='post-p'
                                >
                                    <b>{ comment.author } </b>{ comment.message }<br/>
                                    <small> { moment(comment.date).fromNow(true)  } </small>
                                </p>
                                {
                                    type === 'user' 
                                    &&
                                        <FaTrash
                                            className='post-button-delete pointer'
                                            onClick={ () => handleDelete(comment.id)}
                                        />
                                }
                        </div>
                    ))
                            
            : <p> No hay comentarios</p>
                }

            </div>

            
       </div>
           <form 
                onSubmit= { postComment }
                className='post-form'
            >
                <input
                    type='text'
                    placeholder='Agrega un comentario...'
                    value={comment}
                    className='post-input'
                    onChange= { (e) => setComment( e.target.value )}
                >
                </input>

                <button
                    disabled={!comment}
                    type='submit'
                    className='post-button'
                >
                    Publicar
                </button>
           </form>
    </Modal>
  );
};



    


