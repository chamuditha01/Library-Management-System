import React from 'react';
import './dt.css';
import { BsJustify, BsFacebook, BsInstagram, BsSun } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoIosLogOut } from "react-icons/io";
import { MdDarkMode } from 'react-icons/md';

interface HeaderProps {
  OpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
    


  const bars = Array.from({ length: 10 }, (_, i) => (
    <div key={i} className="bar"></div>
  ));

  return (
    <header className={`header11 ${'light-mode'}`} style={{backgroundColor:'ActiveCaption'}}>
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <div className="icon" />
        
      </div>
      
      <div className="header-right" >
      <MdDarkMode className="icon" size={27} style={{marginRight:'15px'}}/>
        <a href="/">  
            <IoIosLogOut className="icon" size={25} />
        </a>
      </div>
    </header>
  );
};

export default Header;
