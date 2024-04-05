import { useState, useEffect } from 'react'
import Header from './components/Header.jsx';
import { Heading, OpenOrderBtn } from './components/Header.jsx';

import ItemSearch from './item-search/ItemSearch.jsx';
import OrderSummary from './order-summary/OrderSummary.jsx';

import './App.css'

import StateContext from './StateContext.jsx';
import StateChangeContext from './StateChangeContext.jsx';
import dataset from './dataset.js';

import stateReducer from './stateReducer.js';

function App() {

  const [showOpenOrders, setShowOpenOrders] = useState(false);
  const [state, setState] = useState({
    menu: [],
    orders: []
  });

  const toggleOpenOrdersWindow = () => setShowOpenOrders(!showOpenOrders);

  useEffect(() => {

    // augament the menu by adding two fields in each item
    const augamentedDataset = dataset.map(item => ({
      ...item,
      qty: 0,
      isSelected: false
    }))


    setState({...state, menu: augamentedDataset});

  }, [])

  const updateState = (action) => {
    const newState = stateReducer(state, action);

    console.log('reducer output', newState);

    setState(newState);
  }

  console.log('state', state);

  return (
    <StateContext.Provider value={state}>
      <StateChangeContext.Provider value={updateState}>      
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
      </StateChangeContext.Provider>  
    </StateContext.Provider>
  )
}

export default App
