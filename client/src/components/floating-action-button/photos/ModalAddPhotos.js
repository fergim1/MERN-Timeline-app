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

  date: moment().format("DD - MMM - YYYY"),
  title: '',
  message: '',
  images: null,
  user: ''
}

export const ModalAddPhotos = () => {

  const dispatch = useDispatch()

  const { modalAddPhotos } = useSelector(state => state.ui)
  
  const [formValues, setFormValues] = useState( initialMemory )

  const { date, title, message } = formValues;


const closeModal = () => {
  dispatch( uiCloseModalAddPhotos() )
};


const handleDateChange = ( e ) => {
   const fecha = moment(e).format("DD - MMM - YYYY")
  
  setFormValues ( {
    ...formValues,
    date : fecha
  })
  
}

const handleInputChange = ( { target }) => {
  setFormValues ( {
    ...formValues,
    [target.name] : target.value
  })
}

const handleSubmitForm = async ( e ) => {
      e.preventDefault(); 
      dispatch( startAddPhotos ( formValues ) )   
      // console.log(formValues)
      setFormValues(initialMemory)
      closeModal()      
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
                rows="2"
                name="message"
                value= { message }
                onChange= { handleInputChange }
            ></textarea>
        </div>

        <div className="form-group">
            <input
                type="file"
                // multiple
                // id='files'
                // name='images'
                className= 'form-control'
                onChange={ (e) => subirArchivos (e.target.files)}
                // value= { images }
            />
            {/* <input type='submit'/> */}

        </div>

        <div className='form-group'>
            <button type="submit" className="btn btn-primary btn-block">
            Guardar 
            </button>
            
        </div>
      </form>
      


    </Modal>
  );
};



    


