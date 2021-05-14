import React, { useEffect, useState }  from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';
import moment from 'moment';

import "react-datetime/css/react-datetime.css";

import { uiCloseModalAddLetter } from "../../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import { startAddMemory } from "../../../actions/timeline";
import "./modalAddLetter.css";



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
  letter: '',
  user: '' 
}

// user tengo que sacarlode la autenticacion, donde en user.name va a estar

export const ModalAddLetter = () => {

  const dispatch = useDispatch()

  const { modalAddLetterOpen } = useSelector(state => state.ui)
  
  const [formValues, setFormValues] = useState( initialMemory )

  const { date, title, message, letter } = formValues;

const closeModal = () => {
  dispatch( uiCloseModalAddLetter() )
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

const handleSubmitForm = ( e ) => {
      e.preventDefault(); 
      console.log(formValues)
      dispatch( startAddMemory ( formValues ) )           
      setFormValues(initialMemory)
      closeModal()      
}


  return (
    <Modal
      isOpen={modalAddLetterOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >

     
        <div className='encabezado'>
            <h3> Agregar Carta </h3>
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
            <textarea
                type="text"
                className="form-control"
                placeholder="Carta..."
                rows="8"
                name="letter"
                value= { letter }
                onChange= { handleInputChange }
            ></textarea>
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



    


