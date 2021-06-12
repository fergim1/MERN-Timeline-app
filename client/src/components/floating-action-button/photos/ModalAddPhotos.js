import React, { useState }  from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';
import moment from 'moment';
import "react-datetime/css/react-datetime.css";
import Swal from "sweetalert2";

import {  uiCloseModalAddPhotos } from "../../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import "./styleModal.css";
import { startAddPhotos } from "../../../actions/timeline";



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

const initialMemory = {

  date: moment().toDate(),
  title: '',
  message: '',
  images: [],
  user: ''
}

export const ModalAddPhotos = () => {

  const dispatch = useDispatch()

  const { modalAddPhotos } = useSelector(state => state.ui)

  const [loading, setLoading] = useState(false)

  const [formValues, setFormValues] = useState( initialMemory )

  const { date, title, message, images } = formValues;


const closeModal = () => {
  dispatch( uiCloseModalAddPhotos() )
};


const handleDateChange = ( e ) => {
  setFormValues ( {
    ...formValues,
    date : e
  })
  
}

const handleInputChange = ( { target }) => {
  setFormValues ( {
    ...formValues,
    [target.name] : target.value
  })
}

const handleSubmitForm = ( e ) => {
      e.preventDefault(); 

      if( title.trim().length === 0 || message.trim().length  === 0 || images.length  === 0 ) {
        return Swal.fire({
          title: 'Falta completar algún campo',
          text: 'El título, el mensaje y las fotos, son obligatorios',
          icon: 'error'

        })
      }

      dispatch( startAddPhotos ( formValues , setLoading , closeModal) )   
      setFormValues(initialMemory)      
}
  const subirArchivos = ( imagenes ) => { 
    setFormValues({
      ...formValues,
      images: imagenes
    })
  }


  return (
    <Modal
      isOpen={modalAddPhotos}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      {
        (!loading) 
        ?
        <div>

          <div className='div-icon-close'>
              <i className="fas fa-times fa-lg pointer" onClick= {closeModal} ></i>
          </div> 
              <h3 className='title-add-photos'> Cargar Fotos </h3>
             
          <form 
              onSubmit= { handleSubmitForm }
              className='form'
          >
                        <Datetime
                            dateFormat="DD-MM-YYYY"
                            timeFormat={false}
                            onChange={ handleDateChange }
                            value = { date }
                            className='input-add-photos'
                        />

                    <input
                        type="text"
                        className= 'input-add-photos '
                        placeholder="Título"
                        name="title"
                        autoComplete="off"
                        value= { title }
                        onChange= { handleInputChange }
                    />

                    <textarea
                        type="text"
                        className="input-add-photos "
                        placeholder="Mensaje"
                        rows="3"
                        name="message"
                        value= { message }
                        onChange= { handleInputChange }
                    ></textarea>
              
                    <label
                            htmlFor='upload-files'
                            className= 'input-add-photos margin-plus'                           
                        >
                          <div className='div-label'>
                            {
                              formValues.images.length === 0 
                              ? 'Subir fotos'
                              : 'Cantidad: ' + formValues.images.length
                            }
                          
                            <i className="fas fa-cloud-upload-alt fa-lg icon-upload"></i>
                          </div>
                    </label>  

                    <input
                        type="file"
                        id='upload-files'
                        multiple
                        className= 'input-add-photos margin-plus upload-files '
                        onChange={ (e) => subirArchivos (e.target.files)}
                    />

                    <button type="submit" className="button-agregar">
                        Subir 
                    </button>
                    
          </form>
        </div>

        :
        <div className='cargando'> 
          <div className='content'>
          <h6> Cargando imagenes...</h6>
          <br></br>
          <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
          </div>

          </div>
        </div>
      }
 
    </Modal>
  );
};



    


