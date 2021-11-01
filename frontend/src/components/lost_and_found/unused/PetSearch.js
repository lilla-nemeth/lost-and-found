import React, { useState, useContext } from 'react';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { isFieldRequired, changeCheckboxValue } from '../../HelperFunctions.js';
import { ReactComponent as ArrowDown} from '../../../assets/icons/togglearrow.svg';
import { AppStateContext } from '../../../contexts/AppStateContext';
import { handleError } from '../../HelperFunctions.js';

// generic components:
import TextInput from '../../generic/TextInput';
import RadioButton from '../../generic/RadioButton';
import Checkbox from '../../generic/Checkbox';
import TextArea from '../../generic/TextArea';

const PetSearch = (props) => {
    const { pets } = useContext(AppStateContext);

    const { search, setSearch, searchValues, setSearchValues, values } = props;

    // const [status, setStatus] = useState('');
    // const [species, setSpecies] = useState('');

    // const [search, setSearch] = useState('');
    
    const [optionalInputs, setOptionalInputs] = useState({
        display: 'hideInputs',
    });
    
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    

    
    

    // PetAdvancedSearch (optional):
    // const [description, setDescription] = useState('');
    // const [size, setSize] = useState('');
    // const [breed, setBreed] = useState('');
    // const [sex, setSex] = useState('');
    // const [colors, setColors] = useState([]);
    // const [age, setAge] = useState('');
    // const [uniquefeature, setUniquefeature] = useState('');

    let DEBUG = false;

    // let disabled = !status || !search || !species;
    let disabled = !search || !searchValues;

    let required = true;





    function showOptionalInputs() {
        if (optionalInputs.display === 'hideInputs') {
            setOptionalInputs({
                display: 'showInputs'
            }) 
        } else {
            setOptionalInputs({
                display: 'hideInputs'
            })
        }
    }

    const errorSuccessMessage = (
        <div className='message'>
            <p className='errorMessage'>{errorMsg}</p>
            <p className='successMessage'>{successMsg}</p>
        </div>
    );

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (  
        <main className='formMain'>
            <section className='formSection'>
            <div className='formBox'>
                    <h2 className='formHeadline'>Search Pet</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='filterBox'>
                            <h2 className='categoryHeadline'>Status {isFieldRequired(required)}</h2>
                            <ul className='radioList'>

                            {/* {values && values.map(value => <label>  
                                <input  
                                    type='checkbox' 
                                    checked={searchValues.includes(value)}
                                    onChange={event => {
                                            const checked = searchValues.includes(value);
                                            setSearchValues(prev => 
                                                checked
                                                ? 
                                                prev.filter(searchV => searchV !== value)
                                                :
                                                [...prev, value]
                                            );
                                        }
                                    }
                                />
                                {value}  </label>)
                            } */}

                                <Checkbox
                                    id={'lost'} 
                                    name={'status'} 
                                    value={'lost'} 
                                    checked={searchValues.includes('lost')} 
                                    onChange={() => changeCheckboxValue(searchValues, setSearchValues, 'lost')}
                                    labelFor={'lost'} 
                                    labelName={'Lost'}
                                />
                                <Checkbox
                                    id={'found'} 
                                    name={'status'} 
                                    value={'found'} 
                                    checked={searchValues.includes('found')} 
                                    onChange={() => changeCheckboxValue(searchValues, setSearchValues, 'found')}
                                    labelFor={'found'} 
                                    labelName={'Found'}
                                />
                                <Checkbox
                                    id={'reunited'} 
                                    name={'status'} 
                                    value={'reunited'} 
                                    checked={searchValues.includes('reunited')} 
                                    onChange={() => changeCheckboxValue(searchValues, setSearchValues, 'reunited')}
                                    labelFor={'reunited'} 
                                    labelName={'Reunited'}
                                />
                            </ul>
                        </div>
                        <div className='filterBox'> 
                            <h2 className='categoryHeadline'>Species {isFieldRequired(required)}</h2>
                            <ul className='radioList'>
                                <RadioButton 
                                    id={'dog'} 
                                    name={'species'} 
                                    value={'dog'} 
                                    checked={searchValues === 'dog'} 
                                    onChange={event => setSearchValues(event.target.value)} 
                                    labelFor={'dog'} 
                                    labelName={'Dog'} 
                                />
                                <RadioButton 
                                    id={'cat'} 
                                    name={'species'} 
                                    value={'cat'} 
                                    checked={searchValues === 'cat'} 
                                    onChange={event => setSearchValues(event.target.value)} 
                                    labelFor={'cat'} 
                                    labelName={'Cat'} 
                                />
                                <RadioButton 
                                    id={'other'} 
                                    name={'species'} 
                                    value={'other'} 
                                    checked={searchValues === 'other'} 
                                    onChange={event => setSearchValues(event.target.value)} 
                                    labelFor={'other'} 
                                    labelName={'Other'} 
                                />
                            </ul>
                        </div>


                        <div className='filterBox'>
                            <h2 className='categoryHeadline'>Search {isFieldRequired(required)}</h2>
                            <div className='searchBox'>
                                <TextInput 
                                    id={'Search'}
                                    name={'Search'}
                                    type={'search'}
                                    value={search}
                                    placeholder={'Location or another keyword'}
                                    onChange={event => setSearch(event.target.value)}
                                />
                                 <button className='searchButton'>
                                     <SearchIcon/>
                                 </button>
                            </div>
                        </div>            

                        {/* { optionalInputs.display === 'hideInputs' ? errorSuccessMessage : '' }
                            <div className='optionalButton' onClick={() => showOptionalInputs()}>
                                    Advanced Search
                                <div className='arrowDown'>
                                    <ArrowDown style={{height: '16px'}}/>
                                </div>
                            </div> */}
                        {/* { optionalInputs.display === 'showInputs' ? errorSuccessMessage : '' }   */}

                        <div>
                            <button
                                // className={disabled ? 'formButtonInactive' : 'formButton'}
                                // disabled={disabled}
                            >
                                Search
                            </button>
                        </div>      
                    </form>
                </div>
            </section>
        </main>
    ); 
}
 
export default PetSearch;
