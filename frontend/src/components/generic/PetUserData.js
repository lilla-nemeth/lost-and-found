import React from 'react';
import { isInputEmpty } from '../HelperFunctions.js';

const PetUserData = (props) => {
    const { user } = props;

    let DEBUG = false;

        return (
            <>
                <td className='tableCell' style={{paddingTop: '50px'}}>
                </td>
                    <tr className='petOptionalInfo'>
                        {isInputEmpty('uploader', (user.username), 'tableCell')}
                    </tr>
                    <tr className='petOptionalInfo'>
                        {isInputEmpty('email', (user.email), 'tableCell')}
                    </tr>
                    <tr className='petOptionalInfo'>
                        {isInputEmpty('phone', (user.phone), 'tableCell')}
                    </tr>
            </>
        )
}


export default PetUserData;