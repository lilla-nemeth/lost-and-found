import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {

    const [token, setToken] = useState(null);

    let DEBUG = true;

    useEffect(() => {
        // we don't get our token....why?
       let getToken = localStorage.getItem(token);
       if (getToken) {
           setToken(getToken);
       }
    });
    
    if (DEBUG) console.log(token);

    // useEffect(() => {
    //     // TOKEN = UNDEFINED
    //     let tokenFromLocalStorage = localStorage.getItem(token);
    //     if (DEBUG) console.log('AUTHCONTEXT-USEFFECT-TOKEN', token);

    //     if (tokenFromLocalStorage) {
    //         setToken(tokenFromLocalStorage);
    //         // if (DEBUG) console.log('!1', token);
    //     }

    //     // if (DEBUG) console.log('!2', token);

    // });
    
    function handleLogOut() {
        localStorage.removeItem('token');
        setToken(null);
    }

    // if (!token) {
    //     <AuthContext.Provider value={setToken}>
    //         { props.children }
    //     </AuthContext.Provider>
    // }
    return (
        // <AuthContext.Provider value={token, setToken, handleLogOut}>
        <AuthContext.Provider value={token, setToken, handleLogOut}>
            { props.children }
        </AuthContext.Provider>
    );
}