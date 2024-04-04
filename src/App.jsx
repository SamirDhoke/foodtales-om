import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function SearchFilter(props) {
  return (
    <div className='search-filter'>
      <input 
        className='search-filter-input'
        placeholder='search...'
      />
    </div>
  )
}


function Item(props) {
  return (
    <li className='item-filter-list-item'>
      <div className='item-filter-list-item-container'>
        <div className='item-image'>
          <img src='https://picsum.photos/100/50'/>
        </div>
        <div className='item-description'>
          <h2>Masala Dosa</h2>
          <p>Price: Rs. 55</p>
        </div>
        <div className='item-counter'>
          <button>+</button>
          <span>1</span>
          <button>-</button>
        </div>
        <button>
          Add
        </button>
      </div>
    </li>
  )
}

function ItemList() {
  return (
    <ul className='item-filter-list'>
      <Item />
    </ul>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='root'>
      <header>
        <h1>Take Order</h1>       
      </header>
      <section className='item-search'>
        <SearchFilter/>    
        
      </section>
      <section className='order-summary'>
        <div>
          
        </div>
      </section>
    </main>
    
  )
}

export default App
