import React from "react";
import { useDispatch } from "react-redux";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { uiOpenModalAddLetter, uiOpenModalAddPhotos } from "../../actions/ui";


export const ButtonAddFab = () => {

  const dispatch = useDispatch()
    
     const styleButton = {
        backgroundColor: '#fc0071',
      }

      const styleButtonMain = {
        bottom: 24, 
        right: 24, 
      }

    // const handleVideo = () => {
    //   console.log('click')      
    // }

    const handleModalLetter = () => {
      dispatch( uiOpenModalAddLetter())
    }

    const handleModalPhotos = () => {
      dispatch ( uiOpenModalAddPhotos() )
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

        {/* <Action 
            text="Video" 
            onClick={ handleVideo }
            style={styleButton}
        >
                <i className="fas fa-video fa-lg"></i>
        </Action> */}

      </Fab>

    </div>
  );
};
