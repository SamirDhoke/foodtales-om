import { useState, useContext } from 'react'
import './OrderSummary.css';

import StateContext from '../StateContext.jsx';
import StateChangeContext from '../StateChangeContext.jsx';

import {ACTIONS} from '../stateReducer.js';

const OrderedItemListHeader = (props) => {

  return (
    <div className='ordered-item-list-item-header'>
      <span className='ordered-item-name-header'>Name</span>
      <span className='ordered-item-price-header'>Price</span>
      <span className='ordered-item-count-header'>Qty</span>
      <span className='ordered-item-total-header'>Total</span>
    </div>
  )
}

export const OrderedItemList = ({items=[]}) => {
  return (
    <>
    <OrderedItemListHeader/>
    <ul className='ordered-item-list'>
      {
        items.map(item => (
            <OrderedItemListItem key={item.id} {...item}/>
          )
        )
      }
    </ul>
    </>
  )
}

export const OrderedItemListItem = (props) => {

  const {
    name=null,
    price=null,
    qty=null
  } = props;

  const itemTotal = price * qty;

  return (
    <li className='ordered-item-list-item'>
      {name ? <span className='ordered-item-name'>{name}</span> : null}
      {price ? <span className='ordered-item-price'>Rs. {price}</span> : null}
      {qty ? <span className='ordered-item-count'>x{qty}</span> : null}
      {itemTotal ? <span className='ordered-item-total'>Rs. {itemTotal}</span> : null}
    </li>  
  )
}

function OrderSummary(props) {

  const state = useContext(StateContext);
  const dispatch = useContext(StateChangeContext);

  const itemsTotal = state.menu.reduce((total, item) => {
    return (total + item.qty * item.price)
  }, 0)

  const orderedItems = state.menu.filter(item => item.isSelected);

  const handleOrderSubmit = () => {
    dispatch({
      type: ACTIONS.ADD_ORDER,
      payload: {
        items: orderedItems,
        total: itemsTotal
      }
    })
  }

  const handleOrderUpdate = () => {
    dispatch({
      type: ACTIONS.UPDATE_ORDER,
      payload: {
        items: orderedItems,
        total: itemsTotal,
        orderId: state.order.id
      }
    })
  }

  const handleOrderPaid = () => {
    dispatch({
      type: ACTIONS.UPDATE_ORDER_PAY,
      payload: {
        items: orderedItems,
        total: itemsTotal,
        orderId: state.order.id
      }
    })
  }

  return (
    <section className='order-summary-container'>
      {/* <h3>Order Summary</h3> */}
      <div className='order-total'>
        <h2>Total : Rs. {itemsTotal}</h2>
      </div>
      <div className='order-summary'>
        <div className='order-summary-heading'>
          {
            state.order.id ? (
              <h4>Order Summary for order #{state.order.id}</h4>
            ) : (
              <h4>Order Summary</h4>
            )        
          }
        </div>        
        <OrderedItemList items={orderedItems}/>
      </div>
      <div className='order-submit'>
        {
          state.order.id ? (
            <>
              <button onClick={handleOrderUpdate}>Submit Edits</button>
              <button onClick={handleOrderPaid}>Paid</button>
            </>            
          ) : (
            <button onClick={handleOrderSubmit}>Submit</button>
          )        
        }
      </div>
    </section>
  )
}

export default OrderSummary;