import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { startGetMemories } from "../../actions/timeline";
import { uiOpenModalAddLetter, uiOpenModalAddPhotos, uiOpenModalGuest, uiOpenModalSearch } from "../../actions/ui";


export const ButtonAddFab = () => {

  const { uid } = useSelector(state => state.auth)
  const dispatch = useDispatch()
    
     const styleButton = {
        backgroundColor: '#fc0071',
      }

      const styleButtonMain = {
        bottom: 24, 
        right: 24, 
      }

    const handleGuest = () => {
      dispatch( uiOpenModalGuest())     
    }

    const handleModalLetter = () => {
      dispatch( uiOpenModalAddLetter())
    }

    const handleModalPhotos = () => {
      dispatch ( uiOpenModalAddPhotos() )
    }

    const handleSearch = () => {
      dispatch ( uiOpenModalSearch() )
    }

    const handleShowAll = () => {
      dispatch( startGetMemories(uid) )
    }

  return (
    <div>

      <Fab
            mainButtonStyles={styleButton}
            // actionButtonStyles={actionButtonStyles}
            style={styleButtonMain}
            icon={<i className="fas fa-plus"></i>}
            // event={event}
            alwaysShowTitle={true}
            // onClick={handleClick}
      >
        <Action 
            text="Carta" 
            onClick={ handleModalLetter }
            style={styleButton}
        >
              <i className="fas fa-envelope fa-lg"></i>

        </Action>

        <Action 
            text="Fotos" 
            onClick={ handleModalPhotos }
            style={styleButton}
        >
                <i className="fas fa-image fa-lg"></i>
        </Action>

        <Action 
            text="Invitado" 
            onClick={ handleGuest }
            style={styleButton}
        >
                <i className="fas fa-user-plus fa-lg"></i>
        </Action>

        <Action 
            text="Buscar" 
            onClick={ handleSearch }
            style={styleButton}
        >
                 <i className="fas fa-search fa-lg"></i>
        </Action>

        <Action 
            text="Ver todo" 
            onClick={ handleShowAll }
            style={styleButton}
        >
                 <i className="fas fa-list-ul fa-lg"></i>
        </Action>

       
       
      </Fab>

    </div>
  );
};
