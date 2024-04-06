import { useContext } from 'react';
// import StateContext from '../StateContext.jsx';
import StateChangeContext from '../StateChangeContext.jsx';
import {ACTIONS} from '../stateReducer.js';

import './Header.css';



export const OpenOrderBtn = (props) => {

  const dispatch = useContext(StateChangeContext);

  const handleOpenSidebar = () => dispatch({type: ACTIONS.SHOW_SIDEBAR});

  return (
      <button className='open-order-btn ' onClick={handleOpenSidebar}>
        show open orders
      </button>
    
  )
}

export const Heading = ({text}) => <h2 className='heading'>{text}</h2>

function Header(props) {
  const { children } = props;

  return (
    <header>
      {children}
    </header>
  )
}

export default Header;