import React, { useState, useCallback } from "react";
import Modal1 from "react-modal";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import { useDispatch, useSelector } from "react-redux";
import { timelineCleanActiveMemory } from "../../../actions/timeline";
import { uiCloseModalShowPhotos } from "../../../actions/ui";

import "./styleModal.css";
import { fotos, arrayFotos} from "./fotos";


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
  const { memories } = useSelector(state => state.timeline)

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

    const fotitos = arrayFotos (memories)

    
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
          <img src={activeMemory?.images} alt='' />


{/* GALLERY and LIGHTBOX */}
          {/* <div className='fotos'>

            <Gallery photos={fotitos} onClick={openLightbox} />
          </div>
                <ModalGateway>
                {
                    viewerIsOpen 
                    ?  (
                        <Modal onClose={closeLightbox}>
                          <Carousel
                            currentIndex={currentImage}
                            views={fotitos.map(x => ({
                              ...x,
                              srcset: x.srcSet,
                              caption: x.title
                            }))}
                          />
                        </Modal>
                        ) 
                    : null
                }
                </ModalGateway>             */}
{/* end GALLERY and LIGHTBOX */}


        </div>

    </Modal1>
  );
};



    


