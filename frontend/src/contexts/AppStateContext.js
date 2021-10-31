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

    // value of total is string, convert it to number before saving into the state:
    const [total, setTotal] = useState(0);

    // the default skip: 
    const [offset, setOffset] = useState(0);
    const [loader, setLoader] = useState(true);

    // error messages
    const [errorMsg, setErrorMsg] = useState('');

    let DEBUG = false;

    let limit = 6;


    useEffect(() => {
        fetchPets({
            limit,
            offset,
            successCallback: res => {
                setPets(res.data);
                setLoader(false);
                getAllPets({
                    successCallback: res => {
                        setTotal(Number(res.data));
                    }
                })
            },
            errorCallback: err => {
                handleError(err, setErrorMsg);
            }
        });
    },[offset]);

    
    useEffect(() => {
        getUsers({
            token,
            successCallback: res => setUsers(res.data),
            errorCallback: err => {
                handleError(err, setErrorMsg);
            }
        });
    },[token]);


    if (DEBUG) console.log('token from AuthContext in AppStateContext', token);
    if (DEBUG) console.log('users arr - AppStateContext', users);
    if (DEBUG) console.log('pets arr - AppStateContext', pets);

    // named input when we have many arguments
    // cannot mess up the order (in object {})
    function registerUser({email, username, phone, pw, successCallback, successTimeout, errorCallback}) {
        
        let options = {
            method: 'post',
            url: 'http://localhost:3003/register',
            // mode: 'cors',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
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
            url: 'http://localhost:3003/login',
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
            url: 'http://localhost:3003/username',
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
        // TODO: other location data enable when mapbox is implemented
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
            url: 'http://localhost:3003/reportpet',
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
            url: `http://localhost:3003/pets/${limit}/${offset}`,
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
    
    function getAllPets({successCallback, errorCallback}) {
        let options = {
            method: 'get',
            url: 'http://localhost:3003/pets/total',
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

    function getUsers({token, successCallback, errorCallback}) {
        let options = {
            method: 'get',
            url: 'http://localhost:3003/users',
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

    // function searchFields({key, value, successCallback, successTimeout, errorCallback}) {

    //     let options = {
    //         method: 'get',
    //         url: `http://localhost:3003/search?${key}=${value}`,
    //         // url: `http://localhost:3003/search?${key}=${value}&`,
    //         // url: 'http://localhost:3003/search?',
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };
    //     axios(options)
    //     .then(
    //         // res => {if (res && successCallback) successCallback(res, successTimeout())}
    //         res => console.log('searchFields res', res)
    //     )
    //     .catch(
    //         err => {if (err && errorCallback) errorCallback(err)}
    //     );
    // }

    return (
        <AppStateContext.Provider value={{registerUser, loginUser, getUsername, username, getUsers, users, reportPet, fetchPets, getAllPets, pets, setPets, total, setTotal, offset, setOffset, limit, loader}}>
            { props.children }
        </AppStateContext.Provider>
    )
}