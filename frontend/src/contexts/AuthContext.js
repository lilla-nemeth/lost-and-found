import React, { createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    // token, setToken
    // user, setUser
    // errorMsg, setErrorMsg


    // useEffect
    // logout

    return (
        // remember to add value to AuthContext.Provider! (contents what I want to give to the children as props)
        <AuthContext.Provider>
            { props.children }
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;