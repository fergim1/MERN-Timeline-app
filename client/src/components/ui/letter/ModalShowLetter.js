import React from "react";
import Modal from "react-modal";
import { FaTrash, FaSync, FaGripLinesVertical } from 'react-icons/fa';
import Swal from 'sweetalert2';
import moment from 'moment'
import {  uiCloseModalShowLetter, uiOpenModalAddLetter } from "../../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import "./styleLetter.css";
import { startDelete, timelineCleanActiveMemory, startUpdate } from "../../../actions/timeline";



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

  const { activeMemory } = useSelector(state => state.timeline)

  const { ModalShowLetter } = useSelector(state => state.ui)

    const closeModal = () => {
    dispatch( uiCloseModalShowLetter () )
    dispatch (timelineCleanActiveMemory())
    };


    const handleDelete = ( ) => {
      Swal.fire({
        title: '¿ Seguro querés eliminarlo ?',
        text: "No podrás recuperar esta información!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch( startDelete () )
          dispatch( uiCloseModalShowLetter () )
       
          Swal.fire(
            'Eliminado!',
            'Tu carta fue eliminada!.',
            'success'
          )
        }
      })


    }

    const handleUpdate = ( ) => {
      // dispatch( startUpdate (activeMemory) )
      dispatch( uiCloseModalShowLetter () )
      dispatch (uiOpenModalAddLetter() )
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
        <div className='encabezado'>          
            <h3> Carta </h3>
            <i className="fas fa-times-circle fa-lg pointer" onClick= {closeModal} aria-hidden="true"  
            title="Cerrar" ></i>
        </div>
        <hr /> 
        <div className='letter'>
            <div className='tituloYfecha'>
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
        <div className='borraryactualizar'>
          <FaTrash
            className='pointer'
            aria-hidden="true"  
            title="Borrar"
            onClick={ handleDelete } 
          />    

          <FaGripLinesVertical/> 

          <FaSync
            className='pointer'
            aria-hidden="true"  
            title="Actualizar"
            onClick={ handleUpdate }
          />

        </div>

    </Modal>
  );
};



    


