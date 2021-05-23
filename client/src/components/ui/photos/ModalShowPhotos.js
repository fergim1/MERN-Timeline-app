import React from "react";
import Modal1 from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { timelineCleanActiveMemory , startDelete} from "../../../actions/timeline";
import { uiCloseModalShowPhotos } from "../../../actions/ui";
import { prepararArrayUrlFotos } from "../../../helpers/prepararArrayUrlFotos";
import { GalleryAndLightbox } from "../photos/GalleryAndLightbox";
import { FaTrash, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import "./styleModalShowPhotos.css";


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
  const { ModalShowPhotos } = useSelector(state => state.ui)

    const closeModal = () => {
    dispatch( uiCloseModalShowPhotos () )
    dispatch (timelineCleanActiveMemory())
    };

    const fotos = prepararArrayUrlFotos (  activeMemory )

    const handleDelete = () => {
      Swal.fire({
        title: '¿ Estas seguro ?',
        text: "No podrás recuperar esta información!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch( startDelete ( ) )
          dispatch( uiCloseModalShowPhotos () )
          Swal.fire(
            'Eliminado!',
            'Tus fotos fueron eliminadas.',
            'success'
          )
        }
      })
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
             <small> { activeMemory?.date } </small> 
             <FaTrash
              className='pointer icono'
              aria-hidden="true"  
              title="Borrar"
              onClick={ handleDelete } 
            /> 
          </div>
          <FaTimesCircle className="fas fa-times-circle fa-lg pointer icono" onClick= {closeModal}  aria-hidden="true"  
            title="Cerrar"/>   
        </div>
        <hr /> 
          {
            (fotos)

            ? <GalleryAndLightbox fotos={fotos}/>    

            : <h4> No hay imagenes para mostrar </h4>

          }
          {/* <div className='borrar'>

            <FaTrash
              className='pointer icono'
              aria-hidden="true"  
              title="Borrar"
              onClick={ handleDelete } 
            /> 
          </div> */}

    </Modal1>
  );
};



    


