import React, { useState, useCallback } from "react";
import Modal1 from "react-modal";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import { useDispatch, useSelector } from "react-redux";
import { timelineCleanActiveMemory } from "../../../actions/timeline";
import { uiCloseModalShowPhotos } from "../../../actions/ui";

import {fotos} from './fotos'

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

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const dispatch = useDispatch()

  const { activeMemory } = useSelector(state => state.timeline)
  const { ModalShowPhotos } = useSelector(state => state.ui)

    const closeModal = () => {
    dispatch( uiCloseModalShowPhotos () )
    dispatch (timelineCleanActiveMemory())
    };

    const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };


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
        <div className='container'>
          <h5>
            { activeMemory?.title}
          </h5>
          <div className='fotos'>

            <Gallery photos={fotos} onClick={openLightbox} />
                  </div>
                <ModalGateway>
                {
                    viewerIsOpen 
                    ?  (
                        <Modal onClose={closeLightbox}>
                          <Carousel
                            currentIndex={currentImage}
                            views={fotos.map(x => ({
                              ...x,
                              srcset: x.srcSet,
                              caption: x.title
                            }))}
                          />
                        </Modal>
                        ) 
                    : null
                }
                </ModalGateway>            


        </div>

    </Modal1>
  );
};



    


