import React, { useEffect, useState }  from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';
import moment from 'moment';

import "react-datetime/css/react-datetime.css";

import { uiCloseModalAddLetter } from "../../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import { startAddLetter, startUpdate, timelineCleanActiveMemory } from "../../../actions/timeline";
import "./modalAddLetter.css";
import Swal from "sweetalert2";



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
  letter: '',
  user: '' 
}


export const ModalAddLetter = () => {

  const dispatch = useDispatch()
  
  const { activeMemory } = useSelector(state => state.timeline)

  const { modalAddLetterOpen } = useSelector(state => state.ui)
  
  const [formValues, setFormValues] = useState( initialMemory )

  const { date, title, message, letter } = formValues;

  useEffect(() => {
    if (activeMemory.id){
      setFormValues(activeMemory)
    }
    else {
      setFormValues(initialMemory)
    }
    
  }, [activeMemory])

const closeModal = () => {
  dispatch( uiCloseModalAddLetter() )
  dispatch (timelineCleanActiveMemory())
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
      if( title.trim().length === 0 || message.trim().length  === 0 || letter.trim().length  === 0 ) {
        return Swal.fire({
          title: 'Falta completar algún campo',
          text: 'El título, el mensaje y la carta son obligatorios',
          icon: 'error'

        })
      }

      if (activeMemory.id) {
        dispatch ( startUpdate ( formValues ))
        setFormValues(initialMemory)
        closeModal() 
      } 

      else {
        dispatch( startAddLetter ( formValues ) )           
        setFormValues(initialMemory)
        closeModal()    
      }
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
          {
            (activeMemory.id)
            ? <h3> Actualizar carta </h3>
            : <h3> Agregar Carta </h3>
          }
            
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
                    value = { activeMemory ? moment(activeMemory.date).format("DD - MMMM - YYYY")  : date }

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
                rows="10"
                name="letter"
                value= { letter }
                onChange= { handleInputChange }
            ></textarea>
        </div>

        <div className='form-group'>
            <button type="submit" className="btn btn-primary btn-lg">
            Guardar 
            </button>
            
        </div>
      </form>      

    </Modal>
  );
};



    


