import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const ApiContext = createContext();

export default function ApiContextProvider(props) {

    const { token, setToken } = useContext(AuthContext);
    // TODO: put hooks back to components!!!!!!!!
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
            res => {
                console.log(res)
               if (successCallback) successCallback(res.data.msg, successTimeout())
        }
        )
        .catch(
            err => {if (errorCallback) errorCallback(
                err &&
                err.response &&
                err.response.data &&
                err.response.data.msg, 
                errorTimeout())
            }
        );
    }

    // TODO: change the url later:
    

    // callback inputs...
    function storeSingleImage(fileArr, callback, errorCallback) {

        const formData = new FormData();
        if (DEBUG) console.log('file data', fileArr)

        formData.append('image', fileArr);

        if (DEBUG) console.log("form data from axios", formData)
        let options = {
            method: 'post',
            url: 'http://localhost:3003/single',
            mode: 'cors',
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': token
            },
            data: formData
            
        };
        axios(options)
        .then(res => console.log('res', res))
        .catch(err => console.log('err', err.message));

        // This version also works:
        // axios.post('http://localhost:3003/single', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //       'x-auth-token': token
        //     }
        // })
    }

    function storeMultipleImages(fileArr, callback, errorCallback) {
        var DEBUG = true
        const formData = new FormData();
        if (DEBUG) console.log('file data', fileArr)

        // fileArr.forEach((file) => {
        //     formData.append("image", file);
        // })
        for(let i = 0; i < fileArr.length; i++) {
            formData.append(`image${i}`, fileArr[i]);
        }
        if (DEBUG) console.log("form data from axios", formData)
        let options = {
            method: 'post',
            url: 'http://localhost:3003/multiple',
            mode: 'cors',
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': token
            },
            data: formData
            
        };
        axios(options)
        .then(res => {
            console.log('res', res)
            if(callback) {
                callback(res)
            }
        })
        .catch(err => console.log('err', err.message));
    }

    return (
        <ApiContext.Provider value={{registerUser, loginUser, getUsername, user, reportPet, token, storeSingleImage, storeMultipleImages}}>
            { props.children }
        </ApiContext.Provider>
    )
}