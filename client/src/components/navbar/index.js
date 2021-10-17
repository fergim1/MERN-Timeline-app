import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { startLogout } from '../../actions/auth';
import { NavLink } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../siderbar';
import Logo from '../home/images/blanco.png'

const Navbar = ( ) => {

    const { authenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
   
    const handleOpenClose = () => {
       setOpen(!open)
    }


    const handleLogout = () =>{
      dispatch( startLogout() )
    }

  return (
    <>
    { 
      open
        &&
        <Sidebar handleOpenClose = { handleOpenClose }/>
    }
      <nav>
            <img
               src= { Logo }
              alt='logo'
              className='navbar-logo'
            />
          
          {
            (!authenticated )
            ?
              (
                <div className='navbar-links'>
                  < FaBars 
                      className='navbar-icon-menu'
                      onClick= { handleOpenClose }
                  />
                    <NavLink
                          to='/auth/guest'
                          onClick= { handleOpenClose }
                          className='navbar-navlink'
                      >
                          Invitado
                  </NavLink>
                  <NavLink
                          to='/auth/register'
                          onClick= { handleOpenClose }
                          className='navbar-navlink'
                      >
                          Registrarse
                  </NavLink>
                  <NavLink
                          to='/auth/login'
                          onClick= { handleOpenClose }
                          className='navbar-navlink-log-in'
                      >
                          Log in
                  </NavLink>
                </div>
                
              )
            :
              (
                <div> 
                  <NavLink to='/' className='navbar-button' onClick={ handleLogout }>        
                        Salir        
                  </NavLink> 
                </div>
              )
          }

      </nav>

    </>
  );
};

export default Navbar;