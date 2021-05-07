import React, { useState }  from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

import { uiCloseModal } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
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

const initialEvent = {

  id: 132465,
  date: new Date(),
  title: '',
  note: 'Aca iria una nota',
  img: null,
  video: null,
  author: 'Fernando' 
}

export const ModalNote = () => {

  const dispatch = useDispatch()

  const { modalOpen } = useSelector(state => state.ui)
  
  const [formValues, setFormValues] = useState( initialEvent )

  const { date, title, note } = formValues;


const closeModal = () => {
  dispatch( uiCloseModal() )
};

  const handleSubmitForm = ( e ) => {
        e.preventDefault();            
        console.log(formValues)
        closeModal()      
  }

  const handleDateChange = ( e ) => {

    setFormValues ( {
      ...formValues,
        date : e._d
  })

  }

  const handleInputChange = ( { target }) => {
    setFormValues ( {
        ...formValues,
        [target.name] : target.value
    })
  }



  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
        <div className='encabezado'>
            <h3> Nota</h3>
            <i className="fas fa-times-circle fa-lg" onClick= {closeModal} ></i>
        </div>
        <hr />
 
             
        <form 
            className="container"
            onSubmit= { handleSubmitForm }
      >
        <div className="form-group">
            {/* <label>Fecha</label> */}
                <Datetime
                    // initialValue={ date }
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
                placeholder="Notas"
                rows="8"
                name="note"
                value= { note }
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



    


