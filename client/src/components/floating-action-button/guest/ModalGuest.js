import React, { useEffect, useState }  from "react";
import Modal from "react-modal";
import { FaTrash } from 'react-icons/fa';
// import "react-datetime/css/react-datetime.css";

import { uiCloseModalGuest } from "../../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import "./modalGuest.css";
import Swal from "sweetalert2";
import { startAddGuest, startDeleteGuest, startGetGuests } from "../../../actions/guest";



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

const initialGuest = {
  name: '',
  email: '',
  email2: '' 
}


export const ModalGuest = () => {

  const dispatch = useDispatch()
  
  const { modalGuest } = useSelector(state => state.ui)
  const { guests }  = useSelector(state => state.guests)
  const { uid }  = useSelector(state => state.auth)


  
  const [formValues, setFormValues] = useState( initialGuest )

  const { name, email, email2 } = formValues;

  useEffect(() => {
    dispatch ( startGetGuests ( uid ))
  }, [dispatch, uid])


const closeModal = () => {
  dispatch( uiCloseModalGuest() )

};


const handleInputChange = ( { target }) => {
  setFormValues ( {
    ...formValues,
    [target.name] : target.value
  })
}

const handleSubmitForm = ( e ) => {
      e.preventDefault();
      if( name.trim().length === 0 || email.trim().length  === 0 || email2.trim().length  === 0 ) {
        return Swal.fire({
          title: 'Falta completar algún campo',
          text: 'El nombre y el email son obligatorios',
          icon: 'error'
        })
      }

      if(email.trim() !== email2.trim()) {
        return Swal.fire({
          title: 'Los emails son distintos',
          text: 'el email y su confirmación deben ser iguales',
          icon: 'error'
        })
      }

      dispatch ( startAddGuest ( formValues ))
      setFormValues(initialGuest)
}

const handleDelete = (idGuest) =>{
  Swal.fire({
    title: '¿ Seguro querés eliminarlo ?',
    text: "Se borrará el invitado definitivamente!",
    icon: 'question',
    showCancelButton: true,
    focusConfirm: false,
    focusCancel: false,
    buttonsStyling: false,
    customClass: {
      confirmButton: 'buttonEliminar',
      cancelButton: 'buttonCancelar',
    },
    cancelButtonColor: '#1b007b',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch( startDeleteGuest (idGuest))     
   
      Swal.fire({
        title: 'Eliminado!',
        text: 'Tu invitado fue eliminado!.',
        icon: 'success',
        focusConfirm: false,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'buttonEliminar',
        },
        timer: 3000

      }
        
        
        
      )
    }
  })


  
}


  return (
    <Modal
      isOpen={modalGuest}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
        <div className='div-icon-close'>      
           <i className="fas fa-times fa-lg pointer" onClick= {closeModal} ></i>
       </div>
           <h3 className='title-guest'> Invitados </h3>         
       {/* <hr /> */}

       <div className='divTable' >

          <table className="table table-hover ">

            <thead>
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Borrar</th>
                </tr>
            </thead>

            <tbody className='guestList'>
              {
                guests?.map( (guest) => (
                        <tr key={guest.id} >
                            <td> {guest.name} </td>
                            <td> {guest.email} </td>
                            <td>
                                  <FaTrash
                                    className='icon-delete pointer'
                                    aria-hidden="true"  
                                    title="Borrar"
                                    onClick={ () => handleDelete (guest.id) } 
                                  />     
                            </td>
                        </tr>
                ) )
              }

            </tbody>

          </table>
       </div>
       

      <div className='divAddGuest'>

                  <form 
                      onSubmit= { handleSubmitForm }
                      className='form-guest'
                >

                  {/* <div className="form-group"> */}
                      <input
                          type="text"
                          className= 'input-guest'
                          placeholder="Nombre"
                          name="name"
                          autoComplete="off"
                          value= { name }
                          onChange= { handleInputChange }
                      />
                  {/* </div> */}

                  {/* <div className="form-group"> */}
                      <input
                          type="email"
                          className= 'input-guest'
                          placeholder="Email"
                          name="email"
                          autoComplete="off"
                          value= { email }
                          onChange= { handleInputChange }
                      />
                  {/* </div> */}

                  {/* <div className="form-group"> */}
                      <input
                          type="email"
                          className= 'input-guest'
                          placeholder="Confirmar email"
                          name="email2"
                          autoComplete="off"
                          value= { email2 }
                          onChange= { handleInputChange }
                      />
                  {/* </div> */}

                  {/* <div className='form-group'> */}
                      <button type="submit" className="button-agregar-invitado">
                         Agregar invitado
                      </button>
                      
                  {/* </div> */}
                </form>  
                
       </div>





    </Modal>
  );
};



    


