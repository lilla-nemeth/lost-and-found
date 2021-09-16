import React, { createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const ApiContext = createContext();

export default function ApiContextProvider(props) {
    
    let DEBUG = true;

    const { token, setToken, handleLogOut } = useContext(AuthContext);
    
    if (DEBUG) console.log('!TOKEN', token, '!SETTOKEN', setToken, "logout", handleLogOut);


    // named input when we have many arguments
    // cannot mess up the order (in object {})
    function registerUser({email, username, phone, pw, success, successTimeout, error, errorTimeout}) {
        
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
            res => {if (success) success(res.data.msg, successTimeout())}
        )
        .catch(
            err => {if (error) error(err.response.data.msg, errorTimeout())}
        )
    }

    // FIX IT!!!!!!!!!!!:
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
            },
        };
        
        // if (DEBUG) console.log(token);
        // res.data - token?
        axios(options)
        .then(
            // res => {if (success) success(res.data.msg, successTimeout())}
            res => {        

                // setItem - token works!
                let tokenRes = res.data;

                localStorage.setItem('token', tokenRes);
                setToken(tokenRes);

                if (DEBUG) console.log('APICONTEXT TOKEN RESPONSE', tokenRes);
                // if (DEBUG) console.log(tokenRes);
            }
        )
        .catch(
            // err => {if (errorCallback) errorCallback(err.response.data.msg, errorTimeout())}
            // err => {console.log(error('APICONTEXT-ERROR RESPONSE', err.response.data.msg, errorTimeout()))}
            err => console.log(err)
        )
    }

    // function reportPet() {
        // addpet post 
    // }

    return (
        <ApiContext.Provider value={{registerUser, loginUser}}>
            { props.children }
        </ApiContext.Provider>
    )
}