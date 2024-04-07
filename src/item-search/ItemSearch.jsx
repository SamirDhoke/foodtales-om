import { useContext, useState, useEffect } from 'react';

import StateContext from '../StateContext.jsx';
import StateChangeContext from '../StateChangeContext.jsx';

import {ACTIONS} from '../stateReducer.js';

import './ItemSearch.css';

export function SearchFilter(props) {
  
  const {
    text='',
    handleTextChange=() => {}
  } = props;

  return (
    <div className='search-filter'>
      <input 
        className='search-filter-input'
        placeholder='search...'
        value={text}
        onChange={handleTextChange}
      />
    </div>
  )
}

function Counter(props) {
  
  const {
    handlePositive,
    handleNegative,
    value
  } = props;

  return (
    <div className='item-counter'>
      <button onClick={handlePositive}>+</button>
      <span className='count'>{value}</span>
      <button onClick={handleNegative}>-</button>
    </div>
  )
}

export function Item(props) {

  const updateState = useContext(StateChangeContext);

  const {
    name,
    price,
    qty,
    isSelected,
    id
  } = props;

  const handleAddItemToOrder = () => {
    updateState({ type: ACTIONS.ADD_ITEM, payload: id });
  }

  const handleRemoveItemFromOrder = () => {
    updateState({ type: ACTIONS.REMOVE_ITEM, payload: id });
  }

  return (
    <li className='item-filter-list-item'>
      <div className='item-image'>
        <img src='https://picsum.photos/100/50'/>
      </div>
      <div className='item-description'>
        <h2>{name}</h2>
        <p>Price: Rs. {price}</p>
      </div>
      <div className='item-action'>

        {
          isSelected ? (
            <Counter
              handlePositive={handleAddItemToOrder}
              handleNegative={handleRemoveItemFromOrder}
              value={qty}
            />          
          ) : (
            <button onClick={handleAddItemToOrder}>
              Add
            </button>
          )
        }      
    </div>      
    </li>
  )
}

export function ItemList({items=[]}) {

  return (
    <ul className='item-filter-list'> 
      {
        items.map(item => (
          <Item {...item} key={item.id}/>      
        ))      
      }
    </ul>
  )
}

function ItemSearch(props) {

  const state = useContext(StateContext);
  
  const [filter, setFilter] = useState({
    text: '',
    items: []

  });

//   useEffect(() => {
// 
//     let filteredItems = [...state.menu];
// 
//     if (filter.text) {
//       filteredItems = state.menu.filter(item => item.name.toLowerCase().includes(filter.text.toLowerCase()));  
//     }
//     // console.log('Menu', state);
//     setFilter({...filter, items: filteredItems})
//   
//   }, [state.menu])

  useEffect(() => {

    // every time filter text changes, change the filter items
    const filteredItems = state.menu.filter(item => item.name.toLowerCase().includes(filter.text.toLowerCase()));
    setFilter({ ...filter, items: filteredItems })

  }, [filter.text, state.menu])

  const handleFilterTextChange = ({target}) => setFilter({...filter, text: target.value});

  // console.log('filter', filter);

  return (
    <section className='item-search'>
      <SearchFilter
        text={filter.text}
        handleTextChange={handleFilterTextChange}
      />    
      <ItemList items={filter.items}/>
    </section>
  )
}

export default ItemSearch;