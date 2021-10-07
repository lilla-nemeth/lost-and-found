import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ApiContext } from '../../contexts/ApiContext';
import createHistory from 'history/createBrowserHistory';
import Loader from '../generic/Loader';
import PetReportOptionalData from './PetReportOptionalData';
import { ReactComponent as ArrowDown} from '../../assets/icons/togglearrow.svg'

// generic components:
import RadioButton from '../generic/RadioButton';
import TextInput from '../generic/TextInput';
import TextArea from '../generic/TextArea';

import ImageUpload from './ImageUpload';
import DragnDropZone from './DragnDropZone';
import LocationSearch from './LocationSearch';
import MapboxMap from './MapboxMap';
// import DropZoneTest from './DropZoneTest';


// statusOptions -> reunited option comes later with post editing:

const PetReport = () => {
    const [petId, setPetId] = useState(null);

    const [status, setStatus] = useState('');
    const [files, setFiles] = useState([]);
    const [preview, setPreview] = useState(null);
    const [location, setLocation] = useState('');
    const [species, setSpecies] = useState('');
    const [description, setDescription] = useState('');

    // Show/hide additional data:
    const [optionalInputs, setOptionalInputs] = useState({
        display: 'hideInputs',
    });

    // Optional Data:
    const [petsize, setPetSize] = useState('');
    const [breed, setBreed] = useState('');
    const [sex, setSex] = useState('');
    const [colors, setColors] = useState([]);
    const [age, setAge] = useState('');
    const [uniquefeature, setUniquefeature] = useState('');

    // success/error messages
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    // const [isRequired, setIsRequired] = useState(false);

    const { token } = useContext(AuthContext);
    const { reportPet, storeImage, storeImages } = useContext(ApiContext);

    let DEBUG = true;

    function handleSubmit(event) {
        event.preventDefault();

        if (DEBUG) console.log('files from PetReport', files);
        //if the user uploaded an image, we save the img first, then send the report pet query
        

        // TODO: FIX: response status don't update to empty values
        // TODO: FIX: reportPet API request works, but now with storeSingleImage


        if (files.length > 0) {
            storeImage(files, (res) => console.log(res));
        }

        reportPet({
            token,
            petstatus: status,
            petlocation: location,
            species,
            petsize,
            breed,
            sex,
            color: colors,
            age,
            uniquefeature,
            postdescription: description,
            successCallback: res => {
                setSuccessMsg(res)
                setPetId(res.rows[0].id)
                setPetSize('')
                setStatus('')
                setSpecies('')
                setBreed('')
                setSex('')
                setColors('')
                setAge('')
                setUniquefeature('')
                setErrorMsg('')
                setLocation('')
                setDescription('')
                setPreview('')

                // place here the storeImage function from below
            },
            successTimeout: () => (setTimeout(() => {
                setSuccessMsg('');
            }, 5000)),
            errorCallback: err => setErrorMsg(err),
            errorTimeout: () => (setTimeout(() => {
                setErrorMsg('');
            }, 5000))
        });


        // Put this function into the successCallback of reportPet function:
        storeImage({
            petId,
            token,
            files,
            successCallback: res => {
                console.log(res)
            },
            successTimeout: () => (setTimeout(() => {
                setSuccessMsg('');
            }, 5000)),
            errorCallback: err => setErrorMsg(err),
            errorTimeout: () => (setTimeout(() => {
                setErrorMsg('');
            }, 5000))
        });
    }

    createHistory().replace('/reportpet');


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

    {/* remove the map refreshing whenever input event is active */}
    {/* <MapboxMap /> */}
    
    {/* if I'll use Mapbox API and convert the input into a search bar */}
    {/* combine these parameters into 1 searchbar OR 
    separate them to several input fields: municipality, zip, district, street */}

 
    const errorSuccessMessage = (
        <div className='message'>
            <p className='errorMessage'>{errorMsg}</p>
            <p className='successMessage'>{successMsg}</p>
        </div>
    )
    
    
            
    

        return (  
            <main className='formMain'>
                <section className='formSection'>
                <div className='formBox'>
                        <h2 className='formHeadline'>Report Pet</h2>
                        <form 
                            method='POST' 
                            onSubmit={handleSubmit}
                            // enctype='multipart/form-data' 
                        >
                            <div className='filterBox'>
                                <h2 className='categoryHeadline'>Status</h2>
                                <ul className='radioList'>
                                    <RadioButton 
                                        id={'lost'} 
                                        name={'status'} 
                                        value={'lost'} 
                                        checked={status === 'lost'} 
                                        onChange={event => setStatus(event.target.value)} 
                                        labelFor={'lost'} 
                                        labelName={'Lost'}
                                    />
                                    <RadioButton 
                                        id={'found'} 
                                        name={'status'} 
                                        value={'found'} 
                                        checked={status === 'found'} 
                                        onChange={event => setStatus(event.target.value)} 
                                        labelFor={'found'} 
                                        labelName={'Found'}  
                                    />
                                </ul>
                            </div>
                               {/* <DragnDropZone files={files} setFiles={setFiles}/> */}
                               <ImageUpload files={files} setFiles={setFiles} preview={preview} setPreview={setPreview} />
                            <div className='filterBox'> 
                                <h2 className='categoryHeadline'>Species</h2>
                                <ul className='radioList'>
                                    <RadioButton 
                                        id={'dog'} 
                                        name={'species'} 
                                        value={'dog'} 
                                        checked={species === 'dog'} 
                                        onChange={event => setSpecies(event.target.value)} 
                                        labelFor={'dog'} 
                                        labelName={'Dog'} 
                                    />
                                    <RadioButton 
                                        id={'cat'} 
                                        name={'species'} 
                                        value={'cat'} 
                                        checked={species === 'cat'} 
                                        onChange={event => setSpecies(event.target.value)} 
                                        labelFor={'cat'} 
                                        labelName={'Cat'} 
                                    />
                                    <TextInput 
                                        id={'otherSpecies'}
                                        name={'species'}
                                        value={species === 'dog' || species === 'cat' ? '' : species}
                                        placeholder={'Other'}
                                        onChange={event => setSpecies(event.target.value)}
                                    />
                                </ul>
                            </div>                   
                            <div className='filterBox'> 
                                <h2 className='categoryHeadline'>Location</h2>
                                <TextInput 
                                    id={'location'}
                                    name={'location'}
                                    value={location}
                                    placeholder={'Location'}
                                    onChange={event => setLocation(event.target.value)}
                                />
                            </div>
                            <TextArea 
                                headlineName={'Description'}
                                id={'description'} 
                                name={description} 
                                value={description} 
                                placeholder={'Description'} 
                                rows={'6'}
                                cols={'10'}
                                onChange={event => setDescription(event.target.value)} 
                            />
                            { optionalInputs.display === 'hideInputs' ? errorSuccessMessage : '' }
                            <div className='optionalButton' onClick={() => showOptionalInputs()}>
                                    Optional Data
                                <div className='arrowDown'>
                                    <ArrowDown style={{height: '16px'}}/>
                                </div>
                            </div>
                            <PetReportOptionalData 
                                petsize={petsize} 
                                setPetSize={setPetSize} 
                                breed={breed} 
                                setBreed={setBreed} 
                                sex={sex} 
                                setSex={setSex} 
                                colors={colors} 
                                setColors={setColors} 
                                age={age} 
                                setAge={setAge} 
                                uniquefeature={uniquefeature} 
                                setUniquefeature={setUniquefeature} 
                                optionalInputs={optionalInputs} 
                                style={{zIndex: 1}}
                            />
                            { optionalInputs.display === 'showInputs' ? errorSuccessMessage : '' }
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

