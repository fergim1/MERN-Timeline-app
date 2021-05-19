import React from "react";
import Modal from "react-modal";
import { FaTrash, FaSync, FaGripLinesVertical } from 'react-icons/fa';


import {  uiCloseModalShowLetter, uiOpenModalAddLetter } from "../../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import "./styleModal.css";
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
      dispatch( startDelete () )
      dispatch( uiCloseModalShowLetter () )
    }

    const handleUpdate = ( ) => {
      // dispatch( startUpdate () 
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
            <h3> Carta </h3><small className='date' > {activeMemory?.date } </small>
            <i className="fas fa-times-circle fa-lg pointer" onClick= {closeModal} ></i>
        </div>
        <hr /> 
        <div className='letter'>
            <p >
              { activeMemory?.letter}
            </p>        
            <small className='firma'>
              { activeMemory?.author}
            </small>    
        </div>
        <div className='borraryactualizar'>
          <FaTrash
            onClick={ handleDelete } 
          /> <small> Borrar </small>   
          
          <FaGripLinesVertical/> 
          
          <small> Actualizar  </small>  
          <FaSync
          onClick={ handleUpdate }
          />
        </div>

    </Modal>
  );
};



    


