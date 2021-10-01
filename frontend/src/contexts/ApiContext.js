import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const ApiContext = createContext();

export default function ApiContextProvider(props) {

    const { token, setToken } = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [fileData, setFileData] = useState('');
    
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
            }
        )
        .catch(
            err => {if (            
                err && 
                err.response && 
                err.response.data && 
                err.response.data.msg && 
                errorCallback
                ) errorCallback(err.response.data.msg, errorTimeout())}
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
            err => {if (
            err && 
            err.response && 
            err.response.data && 
            err.response.data.msg && 
            errorCallback
            ) errorCallback(err.response.data.msg, errorTimeout())}
        );
    }

    // {successCallback, successTimeout, errorCallback, errorTimeout}
    function reportPet({
        // TODO: other location data enable when mapbox is implemented
        petstatus,
        petlocation,
        species, 
        size, 
        breed, 
        sex, 
        color, 
        age, 
        uniquefeature, 
        postdescription,
        successCallback,
        successTimeout,
        errorCallback,
        errorTimeout
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
                petstatus,
                petlocation,
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
           res => {if (successCallback) successCallback(res.data.msg, successTimeout())}
        )
        .catch(
            err => {if (errorCallback) errorCallback(err.response.data.msg, errorTimeout())}
        );
    }

    // TODO: change the url later:
    
    function storeSingleImage() {
        // const imgData = new FormData();

        // imgData.append('image', fileData)

        // let options = {
        //     method: 'post',
        //     url: 'http://localhost:3003/single',
        //     mode: 'cors',
        //     headers: {
        //         // 'Content-Type': 'multipart/form-data',
        //         'x-auth-token': token
        //     },
        //     data: {
        //         imgData
        //     }
        // };
        // axios(options)
        // .then(res => console.log('File sent successfully'))
        // .catch(err => console.log(err.message));
    }

    return (
        <ApiContext.Provider value={{registerUser, loginUser, getUsername, user, reportPet, token, storeSingleImage, setFileData}}>
            { props.children }
        </ApiContext.Provider>
    )
}