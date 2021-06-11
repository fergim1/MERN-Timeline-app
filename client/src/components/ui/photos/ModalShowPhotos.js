import React, { useState } from "react";
import Modal1 from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { timelineCleanActiveMemory , startDelete} from "../../../actions/timeline";
import { uiCloseModalShowPhotos } from "../../../actions/ui";
import { prepararArrayUrlFotos } from "../../../helpers/prepararArrayUrlFotos";
import { GalleryAndLightbox } from "../photos/GalleryAndLightbox";
import { FaTrash, FaTimes, FaRegComment } from 'react-icons/fa';
import Swal from 'sweetalert2';
import moment from 'moment'

import "./styleModalShowPhotos.css";
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

Modal1.setAppElement("#root");


export const ModalShowPhotos = () => {

  const dispatch = useDispatch()

  const { activeMemory } = useSelector(state => state.timeline)
  const { type } = useSelector(state => state.auth)
  const { ModalShowPhotos } = useSelector(state => state.ui)
  const [commentsOpen, setCommentsOpen] = useState (false)


    const closeModal = () => {
    dispatch( uiCloseModalShowPhotos () )
    dispatch (timelineCleanActiveMemory())
    };

    const fotos = prepararArrayUrlFotos (  activeMemory )

    const handleDelete = () => {
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
          dispatch( startDelete ( ) )
          dispatch( uiCloseModalShowPhotos () )
          Swal.fire({
            title: 'Eliminadas!',
            text: 'Tus fotos fueron eliminadas!.',
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

    const handleComents = () => {
      setCommentsOpen(!commentsOpen)
    }

  return (
    <Modal1
      isOpen={ModalShowPhotos}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
        <div className='encabezado'>
          <div className='tituloYfecha'>
             <h5>{ activeMemory?.title }   </h5>  
             <small>{ moment(activeMemory?.date).format("DD - MMMM - YYYY")} </small> 
          </div>
          <FaTimes className="fas fa-times-circle fa-lg pointer icon" onClick= {closeModal}  aria-hidden="true"  
            title="Cerrar"/>   
        </div>
          <div className='div-photos'>
                {
                  (fotos)

                  ? <GalleryAndLightbox fotos={fotos}/>    

                  : <h4> No hay imagenes para mostrar </h4>

                }
          </div>

        {
         (type === 'user') 
         && 
            <div className='icons-user'>         

                <FaTrash
                  className='pointer'
                  aria-hidden="true"  
                  title="Borrar"
                  onClick={ handleDelete } 
                />     

                <FaRegComment
                    className='pointer'
                    aria-hidden="true"  
                    title="Comentarios"
                    onClick={ handleComents }
                />
           
            </div>
        }
        {
          type ==='guest' 
          && 
            <div className='div-comment-guest'
            > 
              <button
                  className='button-comment-guest pointer'
                  onClick={ handleComents }
              >
                  <FaRegComment/>
              </button>
          </div> 
        }
        {
          commentsOpen 
          && <Comments handleComents={handleComents} commentsOpen={commentsOpen}/>
        }

    </Modal1>
  );
};



    


