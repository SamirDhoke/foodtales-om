import { useState, useEffect } from 'react'
import Header from './components/Header.jsx';
import { Heading, OpenOrderBtn } from './components/Header.jsx';

import ItemSearch from './item-search/ItemSearch.jsx';
import OrderSummary from './order-summary/OrderSummary.jsx';

import './App.css'

import StateContext from './StateContext.jsx';
import dataset from './dataset.js';

function App() {

  const [showOpenOrders, setShowOpenOrders] = useState(false);
  const [state, setState] = useState({
    menuItems: [],
    orderedItems: [],
    orderModification: false
  });

  const toggleOpenOrdersWindow = () => setShowOpenOrders(!showOpenOrders);

  useEffect(() => {

    setState({...state, menuItems: dataset});

  }, [])

  console.log('state', state);

  return (
    <StateContext.Provider value={state}>
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
    </StateContext.Provider>
  )
}

export default App
