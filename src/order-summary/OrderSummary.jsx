import { useState } from 'react'


export const OrderedItemList = (props) => {
  return (
    <ul className='ordered-item-list'>
      <OrderedItemListItem/>
    </ul>
  )
}

export const OrderedItemListItem = (props) => {
  return (
    <li className='ordered-item-list-item'>
      <span className='ordered-item-name'>
        Cheese dosa
      </span>
      <span className='ordered-item-count'>
        x2
      </span>
      <span className='ordered-item-total'>
        Rs. 121
      </span>
    </li>  
  )
}

function OrderSummary(props) {
  return (
    <section className='order-summary-container'>
      <h3>Order Summary</h3>
      <div className='order-total'>
        <h2>Total : Rs. 657</h2>
      </div>
      <div className='order-summary'>
        <OrderedItemList/>
      </div>
    </section>
  )
}

export default OrderSummary;