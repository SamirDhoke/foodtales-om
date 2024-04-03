import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='root'>
      <header>
        <h1>Take Order</h1>       
      </header>
      <section className='item-search'>
        
      </section>
      <section className='order-summary'>

      </section>
    </main>
    
  )
}

export default App
