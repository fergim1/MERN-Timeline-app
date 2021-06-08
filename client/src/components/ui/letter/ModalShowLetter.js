import React, { useState } from "react";
import Modal from "react-modal";
import { FaTrash, FaSync, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import moment from 'moment'
import {  uiCloseModalShowLetter, uiOpenModalAddLetter } from "../../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import "./styleLetter.css";
import { startDelete, timelineCleanActiveMemory } from "../../../actions/timeline";
import { Comments } from "../comments/Commets";



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


export const ModalShowLetter = () => {

  const dispatch = useDispatch()
  const [commentsOpen, setCommentsOpen] = useState(false)
  const { activeMemory } = useSelector(state => state.timeline)
  const { type } = useSelector(state => state.auth)
  const { ModalShowLetter } = useSelector(state => state.ui)

//   useEffect(() => {
//     dispatch(startGetComments(activeMemory.id))
// }, [ ])

    const closeModal = () => {
    dispatch( uiCloseModalShowLetter () )
    dispatch (timelineCleanActiveMemory())
    };


    const handleDelete = ( ) => {
      Swal.fire({
        title: '¿ Seguro querés eliminarlo ?',
        text: "No podrás recuperar esta información!",
        icon: 'question',
        showCancelButton: true,
        focusConfirm: false,
        focusCancel: false,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'buttonEliminar',
          cancelButton: 'buttonCancelar',
        },
        cancelButtonColor: '#1b007b',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch( startDelete () )
          dispatch( uiCloseModalShowLetter () )
          Swal.fire({
            title: 'Eliminada!',
            text: 'Tu carta fue eliminada!.',
            icon: 'success',
            focusConfirm: false,
            buttonsStyling: false,
            customClass: {
              confirmButton: 'buttonEliminar',
            },
            timer: 3000                     
         })
        }
      })


    }

    const handleUpdate = ( ) => {
      dispatch( uiCloseModalShowLetter () )
      dispatch (uiOpenModalAddLetter() )
    }


    const handleComents = () => {
      setCommentsOpen(!commentsOpen)
    }

  return (
    <Modal
      isOpen={ModalShowLetter}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
        <div className='encabezadoLetter'>          
            <FaTimesCircle className="fas fa-times-circle fa-lg pointer icono" onClick= {closeModal}  aria-hidden="true" title="Cerrar"/> 
        </div>
        <div className='letter'>
            <div className='tituloYfechaLetter'>
              <small> { activeMemory ? moment(activeMemory?.date).format("DD - MMMM - YYYY") : ''
              } </small>
              <h3 > { activeMemory?.title} </h3> 
            </div>
            <p >
              { activeMemory?.letter}
            </p>        
            <p className='firma'>
              { activeMemory?.author} .
            </p>    
     
        </div>

        {
         (type === 'user') 
         && 
            <div className='borraryactualizar'>         

              <FaTrash
                className='pointer'
                aria-hidden="true"  
                title="Borrar"
                onClick={ handleDelete } 
              />     

              <FaSync
                className='pointer iconActualizar'
                aria-hidden="true"  
                title="Actualizar"
                onClick={ handleUpdate }
              />

              <div
                className='comment pointer'
                 onClick={ handleComents }
              > 
                 <small>Ver comentarios</small>  
              </div>
           
            </div>
        }
        {
          commentsOpen 
          && <Comments handleComents={handleComents} commentsOpen={commentsOpen}/>
        }
    </Modal>
  );
};



    


