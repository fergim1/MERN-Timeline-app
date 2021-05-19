import React  from 'react'
import {SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute, Icon, Close} from './SideBarElement'

export const Sidebar = ( {handleClicked, authenticated, handleLogout}) => {

  const logout = () =>{
    handleLogout()
    handleClicked();
  }

    return (
        <>
        <SidebarWrapper>
          <Icon>
            <Close onClick= { handleClicked }/>  
          </Icon>          
          <SidebarMenu>
            <SidebarLink to='/about' activeStyle>
              About
            </SidebarLink>
            <SidebarLink to='/services' activeStyle>
              Services
            </SidebarLink>
            <SidebarLink to='/contact-us' activeStyle>
              Contact Us
            </SidebarLink>
            {
              !authenticated &&
                      <SidebarLink to='/auth/register' onClick= { handleClicked } activeStyle>
                        Sign Up
                      </SidebarLink>
            }

            {/* Second Nav */}
           {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </SidebarMenu>
          {
            authenticated
            ? <SideBtnWrap><SidebarRoute to='/' onClick={ logout } >Logout</SidebarRoute></SideBtnWrap>
            : <SideBtnWrap><SidebarRoute to='/auth/login' onClick= { handleClicked } >Login</SidebarRoute></SideBtnWrap> 
          }
          
          
        </SidebarWrapper>
      </>
    )
}
