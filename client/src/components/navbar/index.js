import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { startLogout } from '../../actions/auth';
import { NavLink } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa';
import './navbar.css'

const Navbar = () => {

    const { authenticated, type, name, guestName } = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const handleLogout = () =>{
      dispatch( startLogout() )
    }

  return (
    <>
      <nav>
           {
             (type === 'user') 
             ?  <div> <h3> {name} </h3> </div>
             :  <h3> Invitado: {guestName} </h3>
           } 
        <div>
          {
            !authenticated 
            &&
              <NavLink to='/auth/register' activeStyle >
                 Registrarse
              </NavLink>
          }
        </div>
        {
          (authenticated)
          &&           
            <div> <NavLink to='/' className='button' onClick={ handleLogout }>        
                          <FaSignInAlt className='iconLogout'/> 
                          Salir        
                      </NavLink> 
            </div>
          }
      </nav>

    </>
  );
};

export default Navbar;