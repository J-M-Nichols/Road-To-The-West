import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from './components/Home/Home'
import Play from './components/Play'
import AboutMe from './components/AboutMe'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div
      className="mt-5 p-5 mb-5 pb-5"
    >
      <Navbar />
      <main>
        <Routes>
          <Route exact path='/Road-To-The-West/' element={<Home/>} />
          <Route exact path='/Road-To-The-West/play' element={<Play/>} />
          <Route exact path='/Road-To-The-West/about-me' element={<AboutMe/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App