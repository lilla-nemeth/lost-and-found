import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


const Sidebar = (props) => {
    const [active, setActive] = useState(true);

    let DEBUG = false;

        return (
            <div className='sidebar'>
                <div className='sidebarContainer'>
                    <ul className='sidebarList'>
                        <li className='sidebarListElement'>
                            <NavLink 
                                to='/dashboard' 
                                activeClassName='sidebarActiveLink'
                                className='sidebarInactiveLink'
                                onClick={() => setActive(!active)}
                            >
                                Delete Pet
                            </NavLink>
		                	<div className='sidebarLinkUnderline'></div>
		                </li>
                        <li className='sidebarListElement'>
                            <NavLink 
                                to='/reportpet' 
                                activeClassName='sidebarActiveLink'
                                className='sidebarInactiveLink'
                                onClick={() => setActive(!active)}
                            >
                                Report Another Pet
                            </NavLink>
		                	<div className='sidebarLinkUnderline'></div>
		                </li>
	                </ul>
                </div>
            </div>
        );
}

export default Sidebar;