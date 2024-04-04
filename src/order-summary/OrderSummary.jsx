import { useState } from 'react'
import './OrderSummary.css';

const OrderedItemListHeader = (props) => {
  return (
    <div className='ordered-item-list-item-header'>
      <span className='ordered-item-name-header'>
        Name
      </span>
      <span className='ordered-item-price-header'>
        Price
      </span>
      <span className='ordered-item-count-header'>
        Qty
      </span>
      <span className='ordered-item-total-header'>
        Total
      </span>
    </div>
  )
}

export const OrderedItemList = (props) => {
  return (
    <>
    <OrderedItemListHeader/>
    <ul className='ordered-item-list'>
      <OrderedItemListItem/>
    </ul>
    </>
  )
}

export const OrderedItemListItem = (props) => {
  return (
    <li className='ordered-item-list-item'>
      <span className='ordered-item-name'>
        Cheese dosa
      </span>
      <span className='ordered-item-price'>
        Rs. 55
      </span>
      <span className='ordered-item-count'>
        x2
      </span>
      <span className='ordered-item-total'>
        Rs. 110
      </span>
    </li>  
  )
}

function OrderSummary(props) {
  return (
    <section className='order-summary-container'>
      {/* <h3>Order Summary</h3> */}
      <div className='order-total'>
        <h2>Total : Rs. 657</h2>
      </div>
      <div className='order-summary'>
        <div className='order-summary-heading'>
          <h4>Order Summary</h4>
          <button>modify</button>
        </div>        
        <OrderedItemList/>
      </div>
      <div className='order-submit'>
        <button>Submit</button>
      </div>
    </section>
  )
}

export default OrderSummary;