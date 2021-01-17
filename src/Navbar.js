import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IoFastFoodSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import "./Navbar.css";
import { IconContext } from 'react-icons';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            {/* 
            INCLUDE THE MIDDLE LOGO HERE (USING A ICON FOR NOW)
            <img className="header__logo"
                src="https://pbs.twimg.com/media/EUU6kHiUMAAcOZs.png"
                alt=""/> */}
            <Link to='#' className='menu-bars'>
              <IoFastFoodSharp style={{fontSize: '60px'}}/>
            </Link>
            <div to='#' className='menu-bars'>
              {/* <FaIcons.FaConnectdevelop/> */}
              <IoFastFoodSharp style={{fill: ' #502435'}}/>
            </div>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <div className='itemTitle'>
                        {item.title}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
  
  export default Navbar;