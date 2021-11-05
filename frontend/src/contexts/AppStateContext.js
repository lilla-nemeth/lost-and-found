import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { handleError } from '../components/HelperFunctions.js';

export const AppStateContext = createContext();

export default function AppStateContextProvider(props) {
    const { token } = useContext(AuthContext);

    const [pets, setPets] = useState([]);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [total, setTotal] = useState(0);
    const [offset, setOffset] = useState(0);
    const [loader, setLoader] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    // const [allPets, setAllPets] = useState([]);

    let DEBUG = false;

    let limit = 6;

    useEffect(() => {
        fetchPets({
            limit,
            offset,
            successCallback: res => {
                setPets(res.data);
                setLoader(false);
                getNumberOfPets({
                    successCallback: res => {
                        setTotal(Number(res.data));
                    }
                })
            },
            errorCallback: err => {
                handleError(err, setErrorMsg);
            }
        });
    },[limit, offset]);

    useEffect(() => {
       if (token) {
            getUsername({
                token,
                errorCallback: err => {
                    handleError(err, setErrorMsg);
                }
            });
            getUsers({
                token,
                successCallback: res => setUsers(res.data),
                errorCallback: err => {
                    handleError(err, setErrorMsg);
                }
            });
       }
    },[token]);

    // useEffect(() => {
    //     getAllPets({get
    //         successCallback: res => {
    //             setAllPets(res.data)
    //         },
    //         errorCallback: err => {
    //             handleError(err, setErrorMsg);
    //         }
    //     });
    // },[]);


    if (DEBUG) console.log('token - AppStateContext', token);
    if (DEBUG) console.log('users arr - AppStateContext', users);
    if (DEBUG) console.log('pets arr - AppStateContext', pets);
    // if (DEBUG) console.log('allPets arr - AppStateContext', allPets);

    function registerUser({email, username, phone, pw, successCallback, successTimeout, errorCallback}) {
        
        let options = {
            method: 'post',
            url: '/register',
            data: {
                email,
                username,
                phone,
                pw,
            },
        };
        axios(options)
        .then(
            res => {if (successCallback) successCallback(res.data.msg, successTimeout())}
        )
        .catch(
            err => {if (err && errorCallback) errorCallback(err)}
        )
    }

    function loginUser({setToken, email, pw, errorCallback}) {

        let options = {
            method: 'post',
            url: '/login',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email,
                pw
            }
        };
        axios(options)
        .then(
            res => {        
                let tokenRes = res.data;

                localStorage.setItem('token', tokenRes);
                setToken(tokenRes);
            }
        )
        .catch(
            err => {if (err && errorCallback) errorCallback(err)}
        )
    }

    function getUsername({token, errorCallback}) {

        let options = {
            method: 'get',
            url: '/username',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        };
        axios(options)
        .then(
            res => setUsername(res.data)
        )
        .catch(
            err => {if (err && errorCallback) errorCallback(err)}
        );
    }


    function reportPet({
        token,
        img,
        petstatus,
        petlocation,
        species, 
        petsize, 
        breed, 
        sex, 
        color, 
        age, 
        uniquefeature, 
        postdescription,
        successCallback,
        successTimeout,
        errorCallback
    }) {
        const data = new FormData();

        data.append('file', img);
        data.append('petstatus', petstatus);
        data.append('petlocation', petlocation);
        data.append('species', species);
        data.append('petsize', petsize);
        data.append('breed', breed);
        data.append('sex', sex);
        data.append('color', color);
        data.append('age', age);
        data.append('uniquefeature', uniquefeature);
        data.append('postdescription', postdescription);

        let options = {
            method: 'post',
            url: '/reportpet',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            data: data
        };
        axios(options)
        .then(
            res => {
               if (successCallback) successCallback(res.data.msg, successTimeout())
        }
        )
        .catch(
            err => {if (err && errorCallback) errorCallback(err)}
        );
    }

    function fetchPets({limit, offset, successCallback, errorCallback}) {
        let options = {
            method: 'get',
            url: `/pets/${limit}/${offset}`,
            mode: 'cors',        
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios(options)
        .then(res => {
            if (successCallback) successCallback(res)
        })
        .catch(
            err => {if (err && errorCallback) errorCallback(err)}
        )
    }
    
    function getNumberOfPets({successCallback, errorCallback}) {
        let options = {
            method: 'get',
            url: '/pets/total',
            mode: 'cors',        
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios(options)
        .then(
            res => {if (successCallback) successCallback(res)}
        )
        .catch(
            err => {if (err && errorCallback) errorCallback(err)}
        );
    }
 
    function getAllPets({successCallback, errorCallback}) {

        let options = {
            method: 'get',
            url: '/allpets',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios(options)
        .then(
            res => {if (res && successCallback) successCallback(res)}
        )
        .catch(
            err => {if (err && errorCallback) errorCallback(err)}
        );
    }


    function getUsers({token, successCallback, errorCallback}) {
        let options = {
            method: 'get',
            url: '/users',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        };
        axios(options)
        .then(
            res => {
                if (successCallback) successCallback(res)
            }
        )
        .catch(
            err => {if (err && errorCallback) errorCallback(err)}
        );
    }

    function deleteOnePet({id, token, successCallback, errorCallback}) {
        let options = {
            method: 'delete',
            url: `/deletepet/${id}`,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        };
        axios(options)
        .then(
            res => {
                if (successCallback) successCallback(res)
            }
        )
        .catch(
            err => {if (err && errorCallback) errorCallback(err)}
        );
    }

    return (
        <AppStateContext.Provider value={{registerUser, loginUser, getUsername, username, users, reportPet, fetchPets, getNumberOfPets, getAllPets, pets, setPets, total, setTotal, offset, setOffset, limit, loader, deleteOnePet}}>
            { props.children }
        </AppStateContext.Provider>
    )
}