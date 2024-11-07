import React from "react";
import { useState } from "react";
import Header from "../../Components/Molecules/Header";
import Sidebar from "../../Components/Molecules/Sidebar";
import ProfileHome from "../../Components/Molecules/ProfileHome";

const Profile = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle);
    };
  return (
      <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
     
      <ProfileHome/>
    </div>
  );
};

export default Profile;