import React from "react";
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";
import { timelineCleanActiveMemory } from "../../../actions/timeline";
import { uiCloseModalShowPhotos } from "../../../actions/ui";
import bebe from '../../../images/bebe.jpg'

import "./styleModal.css";


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


export const ModalShowPhotos = () => {

  const dispatch = useDispatch()

  const { activeMemory } = useSelector(state => state.timeline)
  const { ModalShowPhotos } = useSelector(state => state.ui)

    const closeModal = () => {
    dispatch( uiCloseModalShowPhotos () )
    dispatch (timelineCleanActiveMemory())
    };


  return (
    <Modal
      isOpen={ModalShowPhotos}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      voverlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
        <div className='encabezado'>
            <h3> Fotos </h3>
            <i className="fas fa-times-circle fa-lg" onClick= {closeModal} ></i>
        </div>
        <hr /> 
        <div className='container'>
          <h5>
            { activeMemory?.title}
          </h5>
          {
            activeMemory?.images &&
            <img src={bebe} alt=''></img>
          }              

        </div>

    </Modal>
  );
};



    


