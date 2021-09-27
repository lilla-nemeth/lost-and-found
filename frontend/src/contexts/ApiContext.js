import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const ApiContext = createContext();

export default function ApiContextProvider(props) {

    const { token, setToken } = useContext(AuthContext);
    const [user, setUser] = useState('');
    
    let DEBUG = true;

    // if (DEBUG) console.log('!TOKEN', token, '!SETTOKEN', setToken, "logout", handleLogOut);
    
    
    // named input when we have many arguments
    // cannot mess up the order (in object {})
    function registerUser({email, username, phone, pw, successCallback, successTimeout, errorCallback, errorTimeout}) {
        
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
            err => {if (errorCallback) errorCallback(err.response.data.msg, errorTimeout())}
        )
    }


    function loginUser({email, pw, errorCallback, errorTimeout}) {

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
        
        // if (DEBUG) console.log(token);
        axios(options)
        .then(
            res => {        
                let tokenRes = res.data;

                localStorage.setItem('token', tokenRes);
                setToken(tokenRes);

                // if (DEBUG) console.log('APICONTEXT TOKEN RESPONSE', tokenRes);
            }
        )
        .catch(
            err => {if (errorCallback) errorCallback(err.response.data.msg, errorTimeout())}
            // err => {console.log(error('APICONTEXT-ERROR RESPONSE', err.response.data.msg, errorTimeout()))}
            // err => console.log(err)
        )
    }

    function getUsername({errorCallback, errorTimeout}) {

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
            res => setUser(res.data)
        )
        .catch(
            err => {if (errorCallback) errorCallback(err.response.data.msg, errorTimeout())}
        );
    }

    // {successCallback, successTimeout, errorCallback, errorTimeout}
    function reportPet({
        addstatus, 
        region, 
        municipality, 
        zip, 
        district, 
        street, 
        species, 
        size, 
        breed, 
        sex, 
        color, 
        age, 
        uniquefeature, 
        postdescription,
        // errorCallback, 
        // errorTimeout
    }) {
        let options = {
            method: 'post',
            url: 'http://localhost:3003/reportpet',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            data: {
                addstatus,
                region,
                municipality,
                zip,
                district,
                street,
                species,
                size,
                breed,
                sex,
                color,
                age,
                uniquefeature,
                postdescription
            }
        };
        axios(options)
        .then(
            res => console.log(res.rows)
        )
        .catch(
            // err => {if (errorCallback) errorCallback(err.response.data.msg, errorTimeout())}
            err => console.log(err.response.data.msg)
        );
    }

    return (
        <ApiContext.Provider value={{registerUser, loginUser, getUsername, user, reportPet}}>
            { props.children }
        </ApiContext.Provider>
    )
}