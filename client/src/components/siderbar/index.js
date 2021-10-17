import React from "react";
import { NavLink } from 'react-router-dom'

import { MdClose } from 'react-icons/md'
import Logo from '../home/images/blanco.png'


const Sidebar = ( { handleOpenClose } ) => {
    return (
        <>
        <div className='sidebar-container animate__animated animate__fadeInDown'>

            <div className='sidebar-div-icon'>
                <MdClose 
                    className='sidebar-icon-close'
                    onClick = { handleOpenClose }
                />
            </div>

            <div className='sidebar-wrapper-links'>
                <img
                    src= { Logo }
                    alt='logo'
                    className='sidebar-logo'
                />
                
                <div className='sidebar-link'>
                    <NavLink
                        to='/auth/guest'
                        onClick= { handleOpenClose }
                        className='sidebar-navlink'
                    >
                        Invitado
                    </NavLink>
                    
                </div>
                <div className='sidebar-link'>
                    <NavLink
                        to='/auth/register'
                        onClick= { handleOpenClose }
                        className='sidebar-navlink'
                    >
                        Registrarse
                    </NavLink>
                </div>
                <div className='sidebar-link'>
                   <NavLink
                        to='/auth/login'
                        onClick= { handleOpenClose }
                        className='sidebar-navlink-log-in'
                    >
                        Log in
                    </NavLink>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default Sidebar