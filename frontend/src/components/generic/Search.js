import React from 'react';
import TextInput from './TextInput';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

const Search = (props) => {
    const { search, setSearch } = props;

    let DEBUG = true;

    return (  
        <div className='formMain'>
            <div className='formSection'>
                <div className='formBox'>
                <h2 className='formHeadline'>Search Pet</h2>
                    <div className='filterBox'>
                        <h2 className='categoryHeadline'>Search</h2>
                        <div className='searchBox'>
                            <TextInput 
                                id={'search'}
                                name={'search'}
                                type={'search'}
                                value={search}
                                placeholder={'search'}
                                onChange={event => setSearch(event.target.value)}
                            />
                             <button className='searchButton'>
                                 <SearchIcon/>
                             </button>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    );
}
 
export default Search;
