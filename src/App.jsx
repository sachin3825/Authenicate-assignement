import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/Home";
import Sidebar from "./components/Sidebar";
import ListDetails from "./components/ListDetails";
import "./App.css";
import { RxHamburgerMenu } from "react-icons/rx";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Toggling sidebar");
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <button
        className='p-2 text-gray-600 rounded-md sm:hidden'
        onClick={toggleSidebar}
      >
        <RxHamburgerMenu size={25} />
      </button>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className='ml-0 sm:ml-64'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/lists/:listName' element={<ListDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
