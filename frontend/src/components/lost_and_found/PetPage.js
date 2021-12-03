import React, { useContext } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import { v4 as uuidv4 } from 'uuid';
import { numberIncreases } from '../HelperFunctions.js';

const PetPage = () => {
    const { total, limit, setOffset } = useContext(AppStateContext);

    let DEBUG = false;

    return (  
        <div className='pagination'>{numberIncreases(total, limit).map(page => {
            return (
                <div 
                    key={uuidv4()}
                    onClick={() => setOffset(page * limit)} 
                    className='paginationNumbers'
                >
                    {page + 1}
                </div>
            )
        })}
        </div> 
    );
}
 
export default PetPage;
