import React, { useContext } from 'react';
import createHistory from 'history/createBrowserHistory';
import { AppStateContext } from '../../contexts/AppStateContext';
import Loader from '../generic/Loader';
import PetPage from './PetPage';
import PetList from './PetList';
import PetListWithFilters from './unused/PetListWithFilters';
import PetListWithSearch from './unused/PetListWithSearch';

const PetHome = () => {
    const { loader } = useContext(AppStateContext);

    createHistory().replace('/lostandfound');

    if (loader) {
        return (
            <Loader />
        );
    }

    return (  
        <main className='petMain'>
            <section>
                <PetList />
                <PetPage />
            </section>
        </main>
    );
}
 
export default PetHome;
