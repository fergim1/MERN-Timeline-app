import React from "react";
import Modal from "react-modal";


import {  uiCloseModalShowLetter } from "../../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import "./styleModal.css";
import { timelineCleanActiveMemory } from "../../../actions/timeline";



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
        <div className='container letter'>
            <p >
              { activeMemory?.letter}
            </p>        
            <small className='firma'>
              { activeMemory?.user.name}
            </small>    
        </div>

    </Modal>
  );
};



    


