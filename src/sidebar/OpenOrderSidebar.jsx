import { useContext } from 'react';

import StateContext from '../StateContext.jsx';
import StateChangeContext from '../StateChangeContext.jsx';

import {ACTIONS} from '../stateReducer.js';

function Sidebar(props) {

  const { orders } = props;
  
  const dispatch = useContext(StateChangeContext);

  const handleClose = () => dispatch({ type: ACTIONS.CLOSE_SIDEBAR });

  return (
    <div className='sidebar-wrapper' onClick={handleClose}>                              
      {/* stopProagation to make sure open orders sidebar does not close when clicked inside */}
      <aside className='open-orders-sidebar' onClick={(e) => e.stopPropagation()}>
        <h3>Open Orders</h3>
        <ul className='open-order-list'>
          {
            orders.map(order => (
              <li className='open-order-list-item' key={order.id}>
                <OrderDetail {...order}/>
              </li>      
            ))
          }                    
        </ul>
      </aside>
    </div>
  )
}

function OrderDetail(props) {

  const {
    items=[],
    total=0,
    id=1,
    creation_time=null,
    isPaid=false,
    handleEdit
  } = props;


  const dispatch = useContext(StateChangeContext)

  let formatted_date = new Date(creation_time);

  const format_options = {   
    year: "numeric", 
    month: "short",  
    day: "numeric", 
    hour: "2-digit", 
    minute: "2-digit"  
  };  

  formatted_date = formatted_date.toLocaleTimeString("en-us", format_options);

  const handleEditOrder = () => dispatch({ type: ACTIONS.EDIT_ORDER, payload: {
    orderId: id,
    items: items
  } });

  return (
    <div className='order-detail'>
      <p className='order-id'>Order ID: {id}</p>
      <p className='order-time'>Order Time: {formatted_date}</p>
      <p>Order items : </p>
      <ul className='order-item-list'>
        {
          items.map(item => <OrderedItem item={item} key={item.id}/> )
        }        
      </ul>
      <button className='action-btn' onClick={handleEditOrder}>
        Edit
      </button>
    </div>
  )
}

const OrderedItem = ({item}) => {
  const {
    name,
    qty
  } = item;

  return (
    <li className='order-item'>
      <span className='order-item-name'>
        {name}
      </span>              
      <span className='order-item-count'>
        x{qty}
      </span>              
    </li>
  )
}


export default Sidebar;