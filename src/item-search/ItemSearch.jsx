
export function SearchFilter(props) {
  return (
    <div className='search-filter'>
      <input 
        className='search-filter-input'
        placeholder='search...'
      />
    </div>
  )
}

export function Item(props) {
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

export function ItemList() {
  return (
    <ul className='item-filter-list'>
      <Item />
    </ul>
  )
}

function ItemSearch(props) {
  return (
    <section className='item-search'>
      <SearchFilter/>    
      <ItemList/>
    </section>
  )
}

export default ItemSearch