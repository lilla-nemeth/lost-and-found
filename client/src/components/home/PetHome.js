import React, { useContext } from 'react';
import { createBrowserHistory } from 'history';
import { AppStateContext } from '../../contexts/AppStateContext';
import Loader from '../generic/Loader';
import PetPage from './PetPage';
import PetListWithSearch from './PetListWithSearch';

let history = createBrowserHistory();

const PetHome = () => {
	const { loader } = useContext(AppStateContext);

	history.replace('/');

	if (loader) {
		return <Loader />;
	}

	return (
		<main className='petMain'>
			<section>
				<PetListWithSearch />
				<PetPage />
			</section>
		</main>
	);
};

export default PetHome;
