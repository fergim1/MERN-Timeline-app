import { NavLink as Link } from 'react-router-dom';
import { FaTimes} from 'react-icons/fa';
import styled from 'styled-components';


export const SidebarWrapper = styled.div`
  position: fixed;
  z-index: 99;
  width:100vw;
  height: 100vh;
  background: #1b007b;
  display: grid;
  align-items: center;
  top: -20px;
  left:0px;
  transition: 0.5 ease-in-out;

`;

export const Close = styled(FaTimes)`
  color: #fff;
`;

export const Icon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    font-size: 1.8rem;
    cursor: pointer;
    outline: none; 
    transform: translate(-100%, 75%);
  }
`;


export const SidebarMenu = styled.div`
  display: grid;
  margin-top: 20px;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4,80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(4,80px);
  }
`;


export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2 ease-in-out;
  color: #fff;
  cursor: pointer;
  
  &:hover{
      color: #FC0071;
      transition: 0.2 ease-in-out;
  }
`;


export const SideBtnWrap = styled.nav`
  display: flex;
  justify-content: center;
`;

export const SidebarRoute = styled(Link)`
  border-radius: 50px;
  background: #FC0071;
  white-space: nowrap;
  padding: 12px 60px;
  color: white;
  font-size: 1.5rem;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-bottom: 40px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #1b007b;
    color: #FC0071;
  }
`;