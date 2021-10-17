import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {


  return (
    <footer className='footer-container'>
          
        <div className='footer-links-container'>
            <NavLink to='auth/guest' className='footer-link'>Invitados</NavLink>
            <NavLink to='auth/register' className='footer-link'>Registarse</NavLink>
            <NavLink to='auth/login' className='footer-link'>Log In</NavLink>
        </div>
        
        <div className='footer-website-rights-wrapper'>
            <div className='footer-website-rights-div'>
                <small className='footer-website-rights'>Desarrollo Web: Fernando Gimenez</small>
            </div>
            <div>
                <small className='footer-website-rights'> - © Copyright {new Date().getFullYear()} -  </small>
            </div>              
        </div>

    </footer>
  );
};