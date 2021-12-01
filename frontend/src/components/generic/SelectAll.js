import React, { useState } from 'react';


const SelectAll = (props) => {
    const { deleteUserAllPets, allChecked, setAllChecked, petCardChecked, setPetCardChecked, disable } = props;

    let DEBUG = false;

        return (
            <div className='selectBox'>
                <div className='deleteAllButtonBox'>
                    <button 
                        className={disable ? 'deleteAllButtonInactive' : 'deleteAllButton'}
                        disable={disable}
                        onClick={() => deleteUserAllPets()}
                    >
                        Delete All Pets
                    </button>
                </div>
                <div>
                    <label className='checkboxContainer'>
                      <input
                        type='checkbox'
                        checked={allChecked}
                        onChange={() => {setAllChecked(!allChecked); setPetCardChecked(petCardChecked)}}
                      />
                      <span className='checkmark'></span>
                    </label>
                </div>
            </div>
        );
}

export default SelectAll;