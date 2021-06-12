import React, { useState } from "react";
import Modal from "react-modal";
import { FaSearch } from "react-icons/fa";

import { uiCloseModalSearch } from "../../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import "./search.css";
import Swal from "sweetalert2";
import { startSearchMemories } from "../../../actions/timeline";


Modal.setAppElement("#root");

export const ModalSearch = () => {
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState('')

  const { modalSearch } = useSelector((state) => state.ui);
  const { uid } = useSelector((state) => state.auth);

  const closeModal = () => {
    dispatch(uiCloseModalSearch());
  };

  const handleInputSearch = ({target}) => {
    setInputSearch( target.value );
  };

  const handleIconSearch = () => {
      if ( inputSearch.length === 0 ) {
          Swal.fire({
              title: 'No ingresó ningún texto',
              icon: 'error',
              focusConfirm: false,
              buttonsStyling: false,
              customClass: {
                confirmButton: 'buttonSwalOk',
              },
              timer: 3000

          })
      }
      dispatch( startSearchMemories (uid, inputSearch))
      dispatch(uiCloseModalSearch());
      setInputSearch( '' )

  }
 

  return (
    <Modal
      isOpen={modalSearch}
      onRequestClose={closeModal}
      className="search"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <div className="search-container">

            <div className='div-icon-close-search'>         
                <i className="fas fa-times fa-lg pointer" onClick= {closeModal} ></i>
            </div>
            
            <div className='div-search-input'>
                <input
                    className='search-input'
                    placeholder='Buscar ...'
                    value= {inputSearch}
                    onChange= { handleInputSearch }
                />
                <FaSearch
                    className='search-icon pointer'
                    onClick={ handleIconSearch }
                />
            </div>
      </div>
    </Modal>
  );
};
