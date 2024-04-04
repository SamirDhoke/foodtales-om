import { useState } from 'react'
import Header from './components/Header.jsx';
import { Heading, OpenOrderBtn } from './components/Header.jsx';

import ItemSearch from './item-search/ItemSearch.jsx';
import OrderSummary from './order-summary/OrderSummary.jsx';

import './App.css'

function App() {

  const [showOpenOrders, setShowOpenOrders] = useState(false);
  const toggleOpenOrdersWindow = () => setShowOpenOrders(!showOpenOrders);

  return (
    <div className='root'>
      <Header>
        <Heading text="Take Order"/>
        <OpenOrderBtn handleClick={toggleOpenOrdersWindow}/>
      </Header>      
      <main>
        <ItemSearch/> 
        <OrderSummary/>
      </main>
  </div>  
  )
}

export default App
