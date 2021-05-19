import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Title
} from './NavbarElements';
import { Sidebar } from './sidebar/Sidebar';

const Navbar = () => {

    const { authenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [clicked, setClicked] = useState(false)

    const handleClicked = () => {
        setClicked(!clicked)
    }

    const handleLogout = () =>{
      dispatch( startLogout() )
    }

  return (
    <>
      <Nav>
        <NavLink to='/'>
            <Title>Timeline</Title>
          {/* <img src={'./logo.svg'} alt='logo' /> */}
        </NavLink>
        {
            !clicked 
            && 
            <Bars onClick= { handleClicked }/>
        }

        <NavMenu>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/services' activeStyle>
            Services
          </NavLink>
          <NavLink to='/contact-us' activeStyle>
            Contact Us
          </NavLink>
          <NavLink to='/auth/register' activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
        {
          authenticated
          ?  <NavBtn> <NavBtnLink to='/'onClick={ handleLogout }> Logout </NavBtnLink> </NavBtn>
          :  <NavBtn> <NavBtnLink to='/auth/login'>Login</NavBtnLink> </NavBtn>
        }
      </Nav>
        {
            clicked 
            && 
            <Sidebar 
                handleClicked={ handleClicked } 
                authenticated={ authenticated } 
                handleLogout={ handleLogout } 
            />
        }
    </>
  );
};

export default Navbar;