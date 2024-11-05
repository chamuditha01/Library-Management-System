import React, { useState } from 'react';
import './home.css';
import Header from '../../Components/Molecules/Header';
import Sidebar from '../../Components/Molecules/Sidebar';
import Home from '../../Components/Molecules/Home';

const Dashboard: React.FC = () => {  // Updated here
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Home/>
    </div>
  );
}

export default Dashboard; // Updated here
