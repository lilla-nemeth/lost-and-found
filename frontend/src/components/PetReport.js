import React, { useState } from 'react';
import DragnDropZone from './DragnDropZone';
import { ReactComponent as ArrowDown} from '../assets/icons/togglearrow.svg'
// import DropZoneTest from './DropZoneTest';


const styles = {
    main: {
        fontFamily: '"Poppins", sans-serif',
        background: '#B0F0EB',
        overflow: 'hidden',
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    categoryHeadline: {
        padding: '45px 0px 15px',
    }
} 

// const regionOptions = {
//     01: 'Lapland',
//     02: 'North Ostrobothnia',
//     03: 'Kainuu',
//     04: 'North Karelia',
//     05: 'Northern Savonia',
//     06: 'Southern Savonia',
//     07: 'South Karelia',
//     08: 'Central Finland',
//     // ... maybe this offer way too many options :/ - 
//     // only municipalities of North Ostrobothnia?
// }

// statusOptions -> reunited option comes later with post editing:
const statusOptions = ['lost', 'found']
const speciesOptions = ['dog', 'cat', 'other']
const sizeOptions = ['small', 'medium', 'large'];
const sexOptions = ['male', 'female', 'unknown'];
const colorOptions = ['black', 'brown', 'grey', 'white'];
const ageOptions = ['juvenile', 'adolescent', 'adult', 'senior', 'unknown'];


const PetReport = () => {
    const [status, setStatus] = useState(statusOptions);
    const [region, setRegion] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [zip, setZip] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [species, setSpecies] = useState(speciesOptions);
    const [size, setSize] = useState(sizeOptions);
    const [breed, setBreed] = useState('');
    const [sex, setSex] = useState(sexOptions);
    const [color, setColor] = useState(colorOptions);
    const [age, setAge] = useState(ageOptions);
    const [uniquefeature, setUniquefeature] = useState('');
    const [description, setDescription] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [optionalInputs, setOptionalInputs] = useState({
        display: 'hideInputs',
    });

    let DEBUG = true;

    // const { reportPet } = useContext(ApiContext);

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

    return (  
        <main style={styles.main}>
            <section style={styles.section}>
            <div className='formBox'>
                    <h2 className='formHeadline'>Report Pet</h2>
                    <div className='message'>
                      <p className='errorMessage'>{errorMsg}</p>
                      <p className='successMessage'>{successMsg}</p>
                    </div>
                    <form method='POST' 
                        //   onSubmit={handleSubmit}
                    >
                        <div className='filterBox'>
                            <h2 style={styles.categoryHeadline}>Status</h2>
                            <ul className='radioList'>
                                <li>
                                    <input type='radio' id='lost' name='species' />
                                    <label for='lost'>Lost</label>
                                    <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                </li>
                                <li>
                                    <input type='radio' id='found' name='species' />
                                    <label for='found'>Found</label>
                                    <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                </li>
                            </ul>
                        </div>
                           <DragnDropZone />
                           {/* <DropZoneTest /> */}
                        <div className='filterBox'> 
                            <h2 style={styles.categoryHeadline}>Species</h2>
                            <ul className='radioList'>
                                <li>
                                    <input type='radio' id='dog' name='species' />
                                    <label for='dog'>Dog</label>
                                    <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                </li>
                                <li>
                                    <input type='radio' id='cat' name='species' />
                                    <label for='cat'>Cat</label>
                                    <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                </li>
                                <li>
                                    <input type='radio' id='otherSpecies' name='species' />
                                    <label for='otherSpecies'>Other</label>
                                    <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                </li>
                            </ul>
                        </div>  
                        {/* change later the 'Region' headline to 'Location' 
                        if I'll use Mapbox API and convert the input into a search bar */}
                        {/* combine these parameters into 1 searchbar OR 
                        separate them to several input fields: municipality, zip, district, street */}
                        <div className='filterBox'> 
                            <h2 style={styles.categoryHeadline}>Region</h2>
                            <div className='inputBox'>
                                <input 
                                    className='formInput' 
                                    id='region'
                                    autocomplete='region' 
                                    type='text' 
                                    name='region' 
                                    placeholder='region' 
                                    required 
                                    onChange={event => setRegion(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className='filterBox'> 
                            <h2 style={styles.categoryHeadline}>Description</h2>
                            <div className='inputBox'>
                                <textarea
                                    style={{resize: 'none'}}
                                    className='formInput' 
                                    id='description'
                                    autocomplete='region' 
                                    type='text' 
                                    name='region' 
                                    placeholder='Description' 
                                    rows='6'
                                    cols='10'
                                    required 
                                    onChange={event => setDescription(event.target.value)}
                                >
                                </textarea>
                            </div>
                        </div>

                        <button className='optionalButton' onClick={() => showOptionalInputs()}>
                            <div>
                                Optional Data
                            </div>
                            <div className='arrowDown'>
                                <ArrowDown />
                            </div>
                        </button>
                        <div className={optionalInputs.display}>
                            <div className='filterBox'> 
                                <h2 style={styles.categoryHeadline}>Breed</h2>
                                <div className='inputBox'>
                                    <input 
                                        className='formInput' 
                                        id='breed'
                                        autocomplete='breed' 
                                        type='text' 
                                        name='breed' 
                                        placeholder='breed'
                                        onChange={event => setBreed(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='filterBox'> 
                                <h2 style={styles.categoryHeadline}>Size</h2>
                                <ul className='radioList'>
                                    <li>
                                        <input type='radio' id='small' name='size' />
                                        <label for='small'>Small</label>
                                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                    </li>
                                    <li>
                                        <input type='radio' id='medium' name='size' />
                                        <label for='medium'>Medium</label>
                                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                    </li>
                                    <li>
                                        <input type='radio' id='large' name='size' />
                                        <label for='large'>Large</label>
                                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                    </li>
                                </ul>
                            </div> 
                            <div className='filterBox'> 
                                <h2 style={styles.categoryHeadline}>Sex</h2>
                                <ul className='radioList'>
                                    <li>
                                        <input type='radio' id='male' name='sex'/>
                                        <label for='male'>Male</label>
                                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                    </li>
                                    <li>
                                        <input type='radio' id='female' name='sex' />
                                        <label for='female'>Female</label>
                                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                    </li>
                                    <li>
                                        <input type='radio' id='unknown' name='sex' />
                                        <label for='unknown'>Unknown</label>
                                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                    </li>
                                </ul>
                            </div> 
                            <div className='filterBox'>
                                <h2 style={styles.categoryHeadline}>Color</h2>
                                <ul className='radioList'>
                                    <li>
                                        <input type='checkbox' id='black' name='color' />
                                        <label for='black' className='checkboxContainer'>
                                            Black
                                        </label>
                                        <div class="checkboxCheck"><div class="checkboxCheckInside"></div></div>
                                    </li>
                                    <li>
                                        <input type='checkbox' id='brown' name='color' />
                                        <label for='brown' className='checkboxContainer'>
                                            Brown
                                        </label>
                                        <div class="checkboxCheck">
                                            <div class="checkboxCheckInside">
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <input type='checkbox' id='cream' name='color' />
                                        <label for='cream' className='checkboxContainer'>
                                            Cream
                                        </label>
                                        <div class="checkboxCheck">
                                            <div class="checkboxCheckInside">
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <input type='checkbox' id='grey' name='color' />
                                        <label for='grey' className='checkboxContainer'>
                                            Grey
                                        </label>
                                        <div class="checkboxCheck">
                                            <div class="checkboxCheckInside">
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <input type='checkbox' id='red' name='color' />
                                        <label for='red' className='checkboxContainer'>
                                            Red
                                        </label>
                                        <div class="checkboxCheck">
                                            <div class="checkboxCheckInside">
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <input type='checkbox' id='white' name='color' />
                                        <label for='white' className='checkboxContainer'>
                                            White
                                        </label>
                                        <div class="checkboxCheck">
                                            <div class="checkboxCheckInside">
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <input type='checkbox' id='otherColor' name='color' />
                                        <label for='otherColor' className='checkboxContainer'>
                                            Other
                                        </label>
                                        <div class="checkboxCheck">
                                            <div class="checkboxCheckInside">
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className='filterBox'>
                                <h2 style={styles.categoryHeadline}>Age</h2>
                                <ul className='radioList'>
                                    <li>
                                        <input type='radio' id='juvenile' name='age' />
                                        <label for='juvenile'>Juvenile</label>
                                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                    </li>
                                    <li>
                                        <input type='radio' id='adolescent' name='age' />
                                        <label for='adolescent'>Adolescent</label>
                                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                    </li>
                                    <li>
                                        <input type='radio' id='adult' name='age' />
                                        <label for='adult'>Adult</label>
                                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                    </li>
                                    <li>
                                        <input type='radio' id='senior' name='age' />
                                        <label for='senior'>Senior</label>
                                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                    </li>
                                    <li>
                                        <input type='radio' id='unknownAge' name='age' />
                                        <label for='unknownAge'>Unknown</label>
                                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                                    </li>
                                </ul>
                            </div>
                            <div className='filterBox'> 
                                <h2 style={styles.categoryHeadline}>Unique feature</h2>
                                <div className='inputBox'>
                                    <input 
                                        className='formInput' 
                                        id='uniqueFeature'
                                        autocomplete='unique feature' 
                                        type='text' 
                                        name='uniqueFeature' 
                                        placeholder='unique feature'
                                        onChange={event => setUniquefeature(event.target.value)}
                                    />
                                </div>
                            </div>

                        {/* color */}
                        {/* uniquefeature */}
                        </div>
                        <div>
                            <button className='formButton'>Report</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
 
export default PetReport;

