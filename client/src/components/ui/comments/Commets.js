import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTimes } from 'react-icons/fa';

import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import "./comments.css";
import { startAddComment, startCleanComments, startGetComments } from "../../../actions/comment";



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


// const initialComments = [
//     {   
//         message: 'Que linda carta!!',
//         date: new Date().getTime(),
//         memoryId: '60ac558ac4509024f09cd008',
//         author: 'Rosita',
//         id: 15665
//     },
//     {   
//         message: 'Divinas palabras!!',
//         date: new Date().getTime(),
//         memoryId: '60ac558ac4509024f09cd008',
//         author: 'Florencia',
//         id: 156655646
//     },
// ]


export const Comments = ({handleComents, commentsOpen}) => {
    
    const dispatch = useDispatch()
    const { activeMemory } = useSelector(state => state.timeline)
    const { id:memoryId } = activeMemory
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

console.log(comments)

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
                        <p key={comment.id}>
                            <b>{ comment.author } </b>{ comment.message }<br/>
                            <small> { comment.date } </small>
                        </p>
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
       {/* <div className='div-button-close'>
           <button 
                onClick= {closeModal} 
                className='button-close'
            >
               Cerrar
           </button>
       </div> */}


    </Modal>
  );
};



    


