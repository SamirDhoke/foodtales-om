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

  const [openOrdersVisible, setOpenOrdersVisible] = useState(false);
  const [state, setState] = useState({
    menu: [],
    orders: []
  });

  const toggleOpenOrdersWindow = () => setOpenOrdersVisible(!openOrdersVisible);

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
            {
              openOrdersVisible ? (
                <aside className='open-orders-sidebar'>
                  <h3>Open Orders</h3>
                  <ul className='open-order-list'>
                    {
                      state.orders.map(order => (
                        <li className='open-order-list-item' key={order.id}>
                          <OrderDetail {...order}/>
                        </li>      
                      ))
                    }                    
                  </ul>
                </aside>
              ) : (
                null
              )
            }            
        </div>
      </StateChangeContext.Provider>  
    </StateContext.Provider>
  )
}

function OrderDetail(props) {

  const {
    items=[],
    total=0,
    id=1,
    creation_time=null,
    isPaid=false
  } = props;

  let formatted_date = new Date(creation_time);

  const format_options = {   
    year: "numeric", 
    month: "short",  
    day: "numeric", 
    hour: "2-digit", 
    minute: "2-digit"  
  };  

  formatted_date = formatted_date.toLocaleTimeString("en-us", format_options);

  return (
    <div className='order-detail'>
      <p className='order-id'>Order ID: {id}</p>
      <p className='order-time'>Order Time: {formatted_date}</p>
      <p>Order items : </p>
      <ul className='order-item-list'>
        {
          items.map(item => (
            <li className='order-item'>
              <span className='order-item-name'>
                {item.name}
              </span>              
              <span className='order-item-count'>
                x{item.qty}
              </span>              
            </li>  
          ))
        }        
      </ul>
      <button className='action-btn'>
        Edit
      </button>
    </div>
  )
}

export default App
