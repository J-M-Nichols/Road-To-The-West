import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="mt-5 p-5 mb-5 pb-5">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
