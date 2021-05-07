import React from "react";
import { useDispatch } from "react-redux";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { uiOpenModal } from "../../actions/ui";


export const ButtonAddFab = () => {

  const dispatch = useDispatch()
    
     const styleButton = {
        backgroundColor: '#fc0071',
        zIndex: '99'
      }

      const styleButtonMain = {
        bottom: 24, 
        right: 24, 
      }

    const handleClick = () => {
        console.log('Click')
    }

    const handleModalNote = () => {
      dispatch( uiOpenModal())
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
            text="Note" 
            onClick={ handleModalNote }
            style={styleButton}
        >
               <i className="fas fa-clipboard fa-lg"></i>
        </Action>

        <Action 
            text="Image" 
            onClick={handleClick}
            style={styleButton}
        >
                <i className="fas fa-image fa-lg"></i>
        </Action>

        <Action 
            text="Video" 
            onClick={handleClick}
            style={styleButton}
        >
                <i className="fas fa-video fa-lg"></i>
        </Action>


        {/* <SomeCustomComponent 
            text="Foobar!" 
            onClick={handleClick}
        >
                <i className="fa fa-foo-bar-fa-foo" />
        </SomeCustomComponent> */}

      </Fab>

    </div>
  );
};