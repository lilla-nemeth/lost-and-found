import React, { useState } from 'react';
import DragnDropZone from './DragnDropZone';
import DropZoneTest from './DropZoneTest';

const styles = {
    main: {
        fontFamily: '"Poppins", sans-serif',
        background: '#B0F0EB',
        overflow: 'hidden',
        height: '100vh',
    },
    speciesCategory: {
        paddingBottom: '15px',
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
    // Not all of them'll be required to fill in (form)

    let DEBUG = true;

    // const { reportPet } = useContext(ApiContext);

    return (  
        <main style={styles.main}>
            <section className='container'>
            <div className='formBox'>
                    <h2 className='formHeadline'>Report Pet</h2>
                    <div className='message'>
                      <p className='errorMessage'>{errorMsg}</p>
                      <p className='successMessage'>{successMsg}</p>
                    </div>
                    <form method='POST' 
                        //   onSubmit={handleSubmit}
                    >
                           <DragnDropZone />
                           {/* <DropZoneTest /> */}
                        <h2 style={styles.speciesCategory}>Species</h2>
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
                                <input type='radio' id='other' name='species' />
                                <label for='other'>Other</label>
                                <div class="radioCheck"><div class="radioCheckInside"></div></div>
                            </li>
                        </ul>

                        {/* <div className='usernameBox'>
                            <label className='formLabel' for='email'>
                                <EmailIcon />
                            </label>
                            <input 
                                className='formInput' 
                                autocomplete='email' 
                                type='email' 
                                name='email' 
                                placeholder='email' 
                                required 
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div> */}

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

