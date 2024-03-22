import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PetPawLogo } from '../../assets/icons/dogpaw.svg';
import { ReactComponent as NavBackArrow } from '../../assets/icons/navbackarrow.svg';

const Logo = () => {
	return (
		<>
			<div>
				<Link className='logo' to='/'>
					<div className='logoBox'>
						<PetPawLogo />
					</div>
				</Link>
			</div>
			<div>
				<Link className='navBackLink' to='/'>
					<div className='navBackText'>
						<NavBackArrow className='navBackArrow' />
						Back to the List
					</div>
				</Link>
			</div>
		</>
	);
};

export default Logo;
