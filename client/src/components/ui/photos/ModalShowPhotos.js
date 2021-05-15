import React from "react";
import Modal1 from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { timelineCleanActiveMemory } from "../../../actions/timeline";
import { uiCloseModalShowPhotos } from "../../../actions/ui";
import { prepararArrayUrlFotos } from "../../../helpers/prepararArrayUrlFotos";
import { GalleryAndLightbox } from "../photos/GalleryAndLightbox";
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
            <h3> Fotos </h3>
            <i className="fas fa-times-circle fa-lg pointer" onClick= {closeModal} ></i>
        </div>
        <hr /> 
          <h5>
            { activeMemory?.title}
          </h5>

          {
            (fotos)

            ? <GalleryAndLightbox fotos={fotos}/>    

            : <h4> No hay imagenes para mostrar </h4>

          }

    </Modal1>
  );
};



    


