import './Header.css';

export const OpenOrderBtn = ({handleClick}) => {
  return (
    
      <button className='open-order-btn ' onClick={handleClick}>
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