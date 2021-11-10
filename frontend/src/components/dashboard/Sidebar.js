import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Sidebar = (props) => {
    const [active, setActive] = useState(true);

    let DEBUG = false;

        return (
            <div className='sidebar'>
               <div className='navbar-container'>
                <ul className='sidebarList'>

		                <li className={active ? 'nav-link active-link' : 'nav-link'}>
                            <Link to='/dashboard' onClick={() => setActive(!active)}>Delete Pet</Link>
		                	<div className='underline'></div>
		                </li>
		                <li className={!active ? 'nav-link active-link' : 'nav-link'}>
                            <Link to='/reportpet' onClick={() => setActive(!active)}>Report Another Pet</Link>
		                	<div className='underline'></div>
		                </li>
	                </ul>
             
                </div>
            </div>
        );
}

export default Sidebar;