import { useState } from 'react'
import './App.css'
import Home from './components/home/Home.jsx'
import Footer from './components/footer/Footer.jsx'
import Header from './components/header/Header.jsx'

 export default function App() {
  const [count, setCount] = useState(0)
  return (
    <main>
    <Header />
    <Home />
    <Footer />
    </main>
  
  )
}