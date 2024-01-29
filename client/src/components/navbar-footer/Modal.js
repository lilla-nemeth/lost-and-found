import React, { useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { Link } from 'react-router-dom';

const Modal = (props) => {
    const { className } = props;
    const [modal, setModal] = useState(false);

    let DEBUG = false;

    if (modal) {
        document.body.classList.add('modalActive');
      } else {
        document.body.classList.remove('modalActive');
    }

    return (
        <>
            <li className='navList' >
                <Link 
                    className={className} 
                    id='reportPetLink'
                    to='/' 
                    onClick={() => setModal(!modal)}>
                    Report Pet
                </Link>
            </li>

            {modal && (
                <div className='modalStyle'>
                    <div 
                        className='modalOverlay' 
                        onClick={() => setModal(!modal)}
                    >
                        <div className='modalContent'>
                            To report pet, please sign in.
                            <button 
                                className='modalClose' 
                                onClick={() => setModal(!modal)}>
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;