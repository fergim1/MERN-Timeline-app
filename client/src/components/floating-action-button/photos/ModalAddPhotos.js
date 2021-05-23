import React, { useState }  from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';
import moment from 'moment';
import "react-datetime/css/react-datetime.css";

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
  images: null,
  user: ''
}

export const ModalAddPhotos = () => {

  const dispatch = useDispatch()

  const { modalAddPhotos } = useSelector(state => state.ui)

  const [loading, setLoading] = useState(false)

  const [formValues, setFormValues] = useState( initialMemory )

  const { date, title, message } = formValues;


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

        <div className='encabezado'>
            <h3> Agregar Fotos </h3>
            <i className="fas fa-times-circle fa-lg pointer" onClick= {closeModal} ></i>
        </div>
        <hr />
 
             
        <form 
            onSubmit= { handleSubmitForm }
      >
        <div className="form-group">
                <Datetime
                    dateFormat="DD-MM-YYYY"
                    timeFormat={false}
                    onChange={ handleDateChange }
                    value = { date }

                />
        </div>


        <div className="form-group">
            <input
                type="text"
                className= 'form-control'
                placeholder="Título"
                name="title"
                autoComplete="off"
                value= { title }
                onChange= { handleInputChange }
            />

        </div>

        <div className="form-group">
            <textarea
                type="text"
                className="form-control"
                placeholder="Mensaje.."
                rows="3"
                name="message"
                value= { message }
                onChange= { handleInputChange }
            ></textarea>
        </div>

        <div className="form-group">
            <input
                type="file"
                multiple
                className= 'form-control'
                onChange={ (e) => subirArchivos (e.target.files)}
            />


        </div>

        <div className='form-group'>
            <button type="submit" className="btn btn-primary btn-lg ">
            Guardar 
            </button>
            
        </div>
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



    


