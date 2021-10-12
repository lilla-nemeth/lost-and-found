import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppStateContext } from '../../contexts/AppStateContext';
import createHistory from 'history/createBrowserHistory';
import Loader from '../generic/Loader';
import { v4 as uuidv4 } from 'uuid';
import { petDate } from '../HelperFunctions.js';

const PetList = () => {

    // PetSortingButtons lost and found buttons:
    // if Lost is checked, then show the since info: pets > pet.since
    // if Found is checked, then show the until info: pets > pet.until

    // const [pets, setPets] = useState([]);

    // // we get string and we need to convert it to number before saving into the state:
    // const [total, setTotal] = useState(0);
    // // the default skip: 
    // const [offset, setOffset] = useState(0);

    // const [loader, setLoader] = useState(true);

    // // success/error messages
    // const [successMsg, setSuccessMsg] = useState('');
    // const [errorMsg, setErrorMsg] = useState('');

    const { pets, numberIncreases, setOffset, limit, loader } = useContext(AppStateContext);

    let DEBUG = true;

    // let limit = 6;

    // useEffect(() => {
    //     fetchPets({
    //         limit,
    //         offset,
    //         successCallback: res => {
    //             // setPets(res.data);
    //             setLoader(false);
    //             getAllPets({
    //                 successCallback: res => {
    //                     setSuccessMsg(res.data.msg);
    //                     setTotal(Number(res.data));
    //                 }
    //             })
    //         },
    //         errorCallback: err => setSuccessMsg(err.data.msg)
    //     })
    // },[offset]);

    // console.log('getAllPets - setTotal',total)


    // let numberOfPages = total / limit;  

    // function numberIncreases() {
    //     let numberArr = []

    //     for (let i = 0; i < numberOfPages; i++) {
    //         numberArr.push(i);
    //     }
    //     return numberArr;
    // }

    // lost -> since (in progress cases)
    // found -> since (in progress cases)
    // reunited -> until (ready to close cases)


    createHistory().replace('/lostandfound');

    if (loader) {
        return (
            <Loader />
        );
    }

    if (DEBUG) console.log('pets arr from PetList', pets);

    return (  
        <div className='petContainer'>
            <h1 className='lostAndFoundHeadline'>Lost and Found Pets</h1>
            {pets.map(pet => {
                return (
                    <div className='petCard' key={pet.id}>
                        <div className='petCardInner'>
                            <div className='petPictureContainer'>
                                <img className='petPicture' src={`data:image/jpg;base64,${pet.img}`} />
                            </div>
                            <div className='petTextBox'>
                                <div className='petStatus'>
                                    {pet.petstatus}
                                </div>
                                <div className='petSpecies'>
                                    {pet.species}
                                </div>
                                <div className='petMainInfo'>
                                    #{pet.id}
                                </div>
                                <div className='petMainInfo'>
                                    {petDate(pet.petstatus, pet.since, pet.until)}
                                </div>
                                <div className='petMainInfo'>
                                    {pet.petlocation}
                                </div>
                                <Link to={`/petprofile/${pet.id}`}><button className='formButton'>View Pet</button></Link>
                            </div>
                        </div>
                    </div>
                )
            })} 

            <div className='pagination'>{numberIncreases().map(page => {
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
        </div>
    );
}
 
export default PetList;
