import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from './components/Home/Home'
import Play from './components/Play'
import AboutMe from './components/AboutMe'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div
      className="mt-5 p-5 mb-5 pb-5 user-select-none"
    >
      <Navbar />
      <main>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/play' element={<Play/>} />
          <Route exact path='/about-me' element={<AboutMe/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App